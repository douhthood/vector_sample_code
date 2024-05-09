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
 *   vectorizeTableHFTransformers.js
 *
 * DESCRIPTION
 *   Add or update the vectors for all data values in a table using Hugging
 *   Face Transformers
 *   https://huggingface.co/docs/transformers.js/index
 *   Requires Node.js 18 and above
 *
 *****************************************************************************/

const oracledb = require('oracledb');
const fs = require('fs');

// Hugging Face is supported only from Node.js 18 and above
const MAJOR_NODEJS_VERSION = parseInt(process.version.slice(1).split('.')[0], 10);
if (MAJOR_NODEJS_VERSION < 18) {
  console.log('Hugging Face transformers require Node.js version 18 or higher. Please upgrade your Node.js version.');
  process.exit();
}

async function vectorize() {
  let connection;
  const dbConfig = {
    user          : process.env.NODE_ORACLEDB_USER,
    password      : process.env.NODE_ORACLEDB_PASSWORD,
    connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING
  };

  // oracledb.initOracleClient(); // enable Thick mode

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
  // const embeddingModel = 'Xenova/bge-m3';
  // const embeddingModel = 'Xenova/nomic-embed-text-v1';
  // const embeddingModel = 'Xenova/jina-embeddings-v2-base-en';
  // const embeddingModel = 'Xenova/jina-embeddings-v2-small-en';
  // const embeddingModel = 'Xenova/text-embedding-ada-002';

  console.log('Using embedding model ' + embeddingModel);

  // Call the import function for the transformers module
  const { pipeline, env } = await import('@xenova/transformers');

  const PROXYURL = process.env.GLOBAL_AGENT_HTTP_PROXY;
  // Check and connect through proxy, if required.
  // As 'Xenova/transformers' uses native fetch for downloading the models
  // from the remote URL, The global dispatcher must be updated if we are
  // connecting through a firewall or a corporate proxy to download the models.
  // Once and if the model is cached locally, there is no need to connect to
  // the remote URL again.

  let modelCacheDir;
  if (process.platform === 'win32')
    modelCacheDir = `${env.cacheDir}\\${embeddingModel.replace('/', '\\')}`;
  else
    modelCacheDir = `${env.cacheDir}/${embeddingModel}`;

  if (PROXYURL && !fs.existsSync(modelCacheDir)) {
    const { bootstrap } = require('global-agent');
    const { setGlobalDispatcher, ProxyAgent } = require('undici');
    bootstrap();
    const dispatcher = new ProxyAgent({ uri: new URL(PROXYURL).toString() });
    setGlobalDispatcher(dispatcher);
  }

  const extractor = await pipeline('feature-extraction', embeddingModel);

  try {
    // Get a standalone Oracle Database connection
    connection = await oracledb.getConnection(dbConfig);

    // Check if we are connected to Oracle Database 23.4 that supports vectors
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
      // Prepare inputs
      const sentences = [row[1]];
      console.log(row);
      const response = await extractor(sentences, { pooling: 'mean', normalize: true });
      // Extract the vector from the JSON object, which is a Float32 Typed Array
      // Record the array and key
      binds.push([response.data, row[0]]);
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
