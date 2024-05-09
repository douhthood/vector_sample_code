/* Copyright (c) 2024, Oracle and/or its affiliates. */

/******************************************************************************
 *
 * This software is dual-licensed to you under the Universal Permissive License
 * (UPL) 1.0 as shown at https://oss.oracle.com/licenses/upl and Apache License
 * 2.0 as shown at http://www.apache.org/licenses/LICENSE-2.0. You may choose
 * either license.
 *
 * If you elect to accept the software under the Apache License, Version 2.0,
 * the following applies:
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * NAME
 *   similaritySearchCohere.js
 *
 * DESCRIPTION
 *   Basic Similarity Search using the Cohere embedding models
 *   http://www.cohere.com
 *
 *****************************************************************************/

const oracledb = require('oracledb');
const cohere = require('cohere-ai');
const readline = require('readline');

// Check and connect through proxy, if set
if (process.env.GLOBAL_AGENT_HTTP_PROXY) {
  const { bootstrap } = require('global-agent');
  bootstrap();
}

const readLineAsync = () => {
  const rl = readline.createInterface({
    input: process.stdin
  });

  return new Promise((resolve) => {
    rl.prompt();
    rl.on('line', (line) => {
      rl.close();
      resolve(line);
    });
  });
};

async function runSimilaritySearch() {
  let connection;
  const dbConfig = {
    user          : process.env.NODE_ORACLEDB_USER,
    password      : process.env.NODE_ORACLEDB_PASSWORD,
    connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING
  };

  const topK = 5;
  let reRank = false;

  // Get your Cohere API Key from the environment
  const apiKey = process.env.CO_API_KEY;
  if (!apiKey) {
    console.log('\nYou need to set your Cohere API KEY\n');
    console.log('https://cohere.com/pricing');
    console.log('export CO_API_KEY=whatever_your_api_key_value_is\n');
    process.exit();
  }

  /** Select/Set your Embedding model here */
  const embeddingModel = 'embed-english-light-v3.0';
  // const embeddingModel = 'embed-english-v3.0';
  // const embeddingModel = 'embed-multilingual-light-v3.0';
  // const embeddingModel = 'embed-multilingual-v3.0';

  /** Cohere re-ranking models */
  // const rerankModel = 'rerank-english-v2.0';
  const rerankModel = 'rerank-multilingual-v2.0';

  console.log('Using embedding model ' + embeddingModel);

  if (reRank)
    console.log('Using reranker ' + rerankModel);
  else
    console.log('Not using reranking');

  console.log('TopK = ' + topK);

  const co = new cohere.CohereClient({ token: apiKey });

  try {
    // oracledb.initOracleClient(); // Run in Thick mode

    // Get a standalone Oracle Database connection
    connection = await oracledb.getConnection(dbConfig);

    //Check if we are connected to Oracle Database 23.4 that supports vectors
    if (connection.oracleServerVersion < 2304000000) {
      console.log('This example requires Oracle Database 23.4 or later');
      process.exit();
    }
    console.log('Connected to Oracle Database');

    // The embed-english-light-v3.0 model works best with the DOT product
    // distance function
    const sql = `select info from my_data
                  order by vector_distance(v, :1, EUCLIDEAN)
                  fetch first :2 rows only`;

    while (true) {
      // Get the text input to vectorize
      console.log("\nEnter a phrase. Type 'quit' or 'exit' to exit : ");
      const text = await readLineAsync();

      if (text === 'quit' || text === 'exit')
        break;

      if (text === '')
        continue;

      let tic, toc;
      // Create the vector embedding [a JSON object]
      const sentence = [text];

      tic = performance.now();
      const response = await co.embed({
        texts: sentence,
        model: embeddingModel,
        inputType: 'search_query',
      });
      toc = performance.now();
      console.log(`\nVectorize query took ${((toc - tic) / 1000).toFixed(3)} seconds`);

      // Extract the vector from the JSON object
      const float64VecArray = new Float64Array(response.embeddings[0]);

      const docs = [];

      // Do the Similarity Search
      tic = performance.now();
      const rows = (await connection.execute(sql, [float64VecArray, topK])).rows;
      toc = performance.now();

      for (const row of rows) {
        docs.push(row[0]);
      }
      console.log(`\nSimilarity Search took ${((toc - tic) / 1000).toFixed(3)} seconds`);

      if (!reRank) {
        // Just rely on the vector distance for the resultset order
        console.log('\nWithout ReRanking');
        console.log('=================');

        for (const hit of docs) {
          console.log(hit);
        }
      } else {
        tic = performance.now();

        // Rerank for better results
        const { results } = await co.rerank({ query: text, documents: docs, topN: topK, model: rerankModel });

        toc = performance.now();

        console.log(`Rerank took ${((toc - tic) / 1000).toFixed(3)} seconds`);
        console.log('\nReranked results');
        console.log('=================');

        for (const hit of results) {
          console.log(docs[hit.index]);
        }
      }
    } // End of while loop
  } catch (err) {
    console.error(err);
  } finally {
    if (connection)
      await connection.close();
  }
}

runSimilaritySearch();
