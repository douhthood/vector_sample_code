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
 *   vectorizeTableOpenAI.js
 *
 * DESCRIPTION
 *   Add or update the vectors for all data values in a table using OpenAI
 *   embedding models
 *   https://platform.openai.com/api-keys
 *
 *****************************************************************************/

const oracledb = require('oracledb');
const openai = require('openai');

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
  //oracledb.initOracleClient(); //enable Thick mode

  const openaiObj = new openai.OpenAI();

  // Get your OpenAI API Key from the environment
  openaiObj.apiKey = process.env.OPENAI_API_KEY;
  if (!openaiObj.apiKey) {
    console.log('\nYou need to set your OpenAI API KEY\n');
    console.log('https://openai.com/pricing');
    console.log('export OPENAI_API_KEY=whatever_your_api_key_value_is\n');
    process.exit();
  }


  /** Select/Set your Embedding model here */
  // const embeddingModel = 'text-embedding-ada-002';
  const embeddingModel = 'text-embedding-3-small';
  // const embeddingModel = 'text-embedding-3-large';

  console.log('Using embedding model ' + embeddingModel);

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
    const sql = 'select id, info from my_data order by 1';
    const result = await connection.execute(sql);

    const binds = [];

    const tic = performance.now();
    for (const row of result.rows) {
      // Convert to format that Cohere wants
      const data = [row[1]];
      console.log(row);

      // Create the vector embedding [a JSON object]
      const response = await openaiObj.embeddings.create({
        input: data,
        model: embeddingModel,
        encoding_format: 'float',
      });

      // Extract the vector from the JSON object and convert to Typed Array
      const float32VecArray = new Float32Array(response["data"][0]["embedding"]);

      // Record the array and key
      binds.push([float32VecArray, row[0]]);
    }

    // Do an update to add or replace the vector values
    await connection.executeMany('update my_data set v = :1 where id = :2', binds,
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
