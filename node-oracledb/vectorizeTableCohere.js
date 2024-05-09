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
 *   vectorizeTableCohere.js
 *
 * DESCRIPTION
 *   Add or update the vectors for all data values in a table using embedding
 *   models in Cohere
 *   http://www.cohere.com
 *
 *****************************************************************************/

const oracledb = require('oracledb');
const cohere = require('cohere-ai');

// Check and connect through proxy, if set
if (process.env.GLOBAL_AGENT_HTTP_PROXY) {
  const { bootstrap } = require('global-agent');
  bootstrap();
}

async function vectorize() {
  let connection;
  const dbConfig = {
    user          : process.env.NODE_ORACLEDB_USER,
    password      : process.env.NODE_ORACLEDB_PASSWORD,
    connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING
  };
  // oracledb.initOracleClient();

  // Get your Cohere API Key from the environment
  const apiKey = process.env.CO_API_KEY;
  if (!apiKey) {
    console.log('\nYou need to set your Cohere API KEY\n');
    console.log('https://cohere.com/pricing');
    console.log('export CO_API_KEY=whatever_your_api_key_value_is\n');
    process.exit();
  }

  /** Select/Set your Embedding model here */
  const embeddingModel =  'embed-english-light-v3.0';
  // const embeddingModel = 'embed-english-v3.0';
  // const embeddingModel = 'embed-multilingual-light-v3.0';
  // const embeddingModel = 'embed-multilingual-v3.0';

  console.log('Using embedding model ' + embeddingModel);

  const co = new cohere.CohereClient({ token: apiKey });

  try {

    // Get a standalone Oracle Database connection
    connection = await oracledb.getConnection(dbConfig);

    //Check if we are connected to Oracle Database 23.4 that supports vectors
    if (connection.oracleServerVersion < 2304000000) {
      console.log('This example requires Oracle Database 23.4 or later');
      process.exit();
    }
    console.log('Connected to Oracle Database');

    console.log('Vectorizing the following data:');

    // Loop over the rows and vectorize the VARCHAR2 data
    const sql = 'SELECT id, info FROM my_data ORDER BY 1';
    const result = await connection.execute(sql);

    const binds = [];

    const tic = performance.now();
    for (const row of result.rows) {
      // Convert to format that Cohere wants
      const data = [row[1]];
      console.log(row);

      // Create the vector embedding [a JSON object]
      const response = await co.embed({
        texts: data,
        model: embeddingModel,
        inputType: 'search_query',
      });

      // Extract the vector from the JSON object and convert to Typed Array
      const float32VecArray = new Float32Array(response.embeddings[0]);

      // Record the array and key
      binds.push([float32VecArray, row[0]]);
    }

    // Do an update to add or replace the vector values
    await connection.executeMany('UPDATE my_data SET v = :1 WHERE id = :2', binds,
      { autoCommit: true });
    const toc = performance.now();

    console.log(`Vectors took ${((toc - tic) / 1000).toFixed(4)} seconds`);
    console.log(`Added ${binds.length} vectors to the table`);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection)
      await connection.close();
  }
}

vectorize();
