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
 *   similaritySearchHFTransformers.js
 *
 * DESCRIPTION
 *   Basic Similarity Search using Hugging Face with the
 *   supported embedding models
 *   https://huggingface.co/docs/transformers.js/index
 *
 *****************************************************************************/

const oracledb = require('oracledb');
const readline = require('readline');
const fs = require('fs');

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

const setProxy = (url) => {
  const { bootstrap } = require('global-agent');
  const { setGlobalDispatcher, ProxyAgent } = require('undici');
  bootstrap();
  const dispatcher = new ProxyAgent({ uri: new URL(url).toString() });
  setGlobalDispatcher(dispatcher);
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

  /** Select/Set your Embedding model here */
  // const embeddingModel = 'Xenova/all-mpnet-base-v2';
  // const embeddingModel = 'Xenova/paraphrase-MiniLM-L6-v2';
  // const embeddingModel = 'Xenova/paraphrase-MiniLM-L3-v2';
  // const embeddingModel = 'Xenova/nli-mpnet-base-v2';
  // const embeddingModel = 'Xenova/multi-qa-MiniLM-L6-cos-v1';
  // const embeddingModel = 'Xenova/multi-qa-mpnet-base-dot-v1';
  // const embeddingModel = 'Xenova/multi-qa-mpnet-base-cos-v1';
  // const embeddingModel = 'Xenova/multilingual-e5-small';
  // const embeddingModel = 'Xenova/multilingual-e5-base';
  // const embeddingModel = 'Xenova/multilingual-e5-large';
  // const embeddingModel = 'Xenova/e5-small-v2';
  // const embeddingModel = 'Xenova/e5-base-v2';
  // const embeddingModel = 'Xenova/e5-large-v2';
  // const embeddingModel = 'Xenova/UAE-Large-V1';
  // const embeddingModel = 'Xenova/bge-m3';
  // const embeddingModel = 'Xenova/nomic-embed-text-v1';
  // const embeddingModel = 'Xenova/gte-base';
  // const embeddingModel = 'Xenova/gte-large';
  // const embeddingModel = 'Xenova/sentence_bert';
  // const embeddingModel = 'Xenova/sentence-camembert-large';
  // const embeddingModel = 'Xenova/french-camembert-postag-model';

  const embeddingModel = 'Xenova/all-MiniLM-L6-v2';
  // const embeddingModel = 'Xenova/all-MiniLM-L12-v2';
  // const embeddingModel = 'Xenova/bge-large-en-v1.5';
  // const embeddingModel = 'Xenova/bge-small-en-v1.5';
  // const embeddingModel = 'Xenova/bge-base-en-v1.5';
  // const embeddingModel = 'Xenova/jina-embeddings-v2-base-en';
  // const embeddingModel = 'Xenova/jina-embeddings-v2-small-en';

  // Re-ranking models
  const reRankModel = 'Xenova/bge-reranker-base';

  console.log('Using embedding model ' + embeddingModel);

  // Call the import function for the transformers module
  const { AutoModelForSequenceClassification, AutoTokenizer, pipeline, env } = await import('@xenova/transformers');

  const PROXYURL = process.env.GLOBAL_AGENT_HTTP_PROXY;
  // Check and connect through proxy, if required.
  // As 'Xenova/transformers' uses native fetch for downloading the models
  // from the remote URL, The global dispatcher must be updated if we are
  // connecting through a firewall or a corporate proxy to download the models.
  // Once and if the model is cached locally, there is no need to connect to
  // the remote URL again.

  let modelCacheDir;
  let isProxyAgentSet = false;
  if (process.platform === 'win32')
    modelCacheDir = `${env.cacheDir}\\${embeddingModel.replace('/', '\\')}`;
  else
    modelCacheDir = `${env.cacheDir}/${embeddingModel}`;

  // Embedding model caching with Proxy
  if (PROXYURL && !fs.existsSync(modelCacheDir)) {
    setProxy(PROXYURL);
    isProxyAgentSet = true;
  }

  let tokenizer, model;
  if (reRank) {
    if (!isProxyAgentSet) {
      let reRankModelCacheDir;
      if (process.platform === 'win32') {
        reRankModelCacheDir = `${env.cacheDir}\\${reRankModel.replace('/', '\\')}`;     
      } else {
        reRankModelCacheDir = `${env.cacheDir}/${reRankModel}`;
      }
  
      // Rerank model caching with Proxy
      if (PROXYURL && !fs.existsSync(reRankModelCacheDir)) {
        setProxy(PROXYURL);
        isProxyAgentSet = true;
      }
    }
    tokenizer = await AutoTokenizer.from_pretrained(reRankModel);
    model = await AutoModelForSequenceClassification.from_pretrained(reRankModel, { quantized: false });
    console.log('Using reranker ' + reRankModel);
  } else {
    // Not using reranking
    console.log('Not using reranking');
  }

  console.log('TopK = ' + topK);

  const extractor = await pipeline('feature-extraction', embeddingModel);

  try {
    //oracledb.initOracleClient(); // For node-oracledb Thick mode

    // Get a standalone Oracle Database connection
    connection = await oracledb.getConnection(dbConfig);

    //Check if we are connected to Oracle Database 23.4 that supports vectors
    if (connection.oracleServerVersion < 2304000000) {
      console.log('This example requires Oracle Database 23.4 or later');
      process.exit();
    }
    console.log('Connected to Oracle Database');

    const sql = `select info from my_data
                  order by vector_distance(v, :1, COSINE)
                  fetch approx first :2 rows only`;

    while (true) {
      // Get the text input to vectorize
      console.log("\nEnter a phrase. Type 'quit' or 'exit' to exit : ");
      const text = await readLineAsync();

      if (text === 'quit' || text === 'exit')
        break;

      if (text === '')
        continue;

      let tic, toc;
      // Create the vector embedding [a Tensor object] with the data
      // attribute containing the vector data as a Float32 Typed Array
      const sentence = [text];

      tic = performance.now();
      const response = await extractor(sentence, { pooling: 'mean', normalize: true });
      toc = performance.now();
      console.log(`\nVectorize query took ${((toc - tic) / 1000).toFixed(3)} seconds`);

      const docs = [];
      const texts = [];

      tic = performance.now();
      // Do the Similarity Search
      const rows = (await connection.execute(sql, [response.data, topK])).rows;
      toc = performance.now();

      for (const row of rows) {
        // Remember the SQL data resultset
        docs.push(row[0]);
        texts.push(text);
      }
      console.log(`Similarity Search took ${((toc - tic) / 1000).toFixed(3)} seconds`);

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
        const inputs = tokenizer(texts, { text_pair: docs, padding: true, truncation: true });
        const modelOutput = await model(inputs);
        const scores = modelOutput.logits.data;

        toc = performance.now();

        console.log(`Rerank took ${((toc - tic) / 1000).toFixed(3)} seconds`);

        let idx;
        const unranked = [];
        for (idx = 0; idx < topK; idx ++) {
          unranked.push([scores[idx], docs[idx]]);
        }

        // Sort the unranked list based on the scores in descending order
        const reranked = unranked.sort((a, b) => a[0] - b[0]).reverse();
        console.log('\nReranked results');
        console.log('=================');

        for (idx = 0; idx < topK; idx ++) {
          console.log(reranked[idx][1]);
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
