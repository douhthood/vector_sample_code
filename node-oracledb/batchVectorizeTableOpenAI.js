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
 *   batchVectorizeTableOpenAI.js
 *
 * DESCRIPTION
 *   Add or update the vectors for all data values in a table using embedding
 *   models in OpenAI using batch vectorization
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
  const tableName = 'batch'; // Add the table to be vectorized
  const dbConfig = {
    user          : process.env.NODE_ORACLEDB_USER,
    password      : process.env.NODE_ORACLEDB_PASSWORD,
    connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING
  };
  // oracledb.initOracleClient(); //enable Thick mode

  // totalRows is the maximum rows to process
  // Make it 10000 for testing
  // If totalRows is <= 0, then process all rows in the table
  let totalRows = 10000;

  // startId is the PK value to start vectorizing
  // If startId <= 0 then use the min ID in the table
  const startId = 0;

  // endId is the PK value to stop vectorizing
  // If endId <= 0 then use the max ID in the table
  const endId = 0;

  if (startId > endId) {
    console.log('endId must be >= startId');
    process.exit();
  }

  if (startId > 0 && endId > 0)
    totalRows = endId - startId;

  // fetchSize is the resultset size to vectorize
  // You do this in a loop until totalRows are processed
  // Make fetchSize in the range [1000, 5000]
  // You want fetchSize > embedSize >= commitSize
  let fetchSize = 1000;

  // if (fetchSize < 1000)
  //   console.log('Use a fetchSize of at least 1000 for efficiency');
  //   process.exit();

  // if (fetchSize > 5000)
  //   console.log('fetchSize greater than 5000 wastes memory without performance gains');
  //   process.exit();

  if (totalRows > 0 && totalRows % fetchSize != 0)
    if (totalRows < fetchSize) {
      fetchSize = totalRows;
      embedSize = fetchSize;
      commitSize = fetchSize;
    } else {
      console.log('Make the fetchSize a factor of the totalRows');
      console.log('fetchSize = ' + fetchSize + ', totalRows = ' + totalRows);
      process.exit();
    }

  // embedSize is how many sentences to vectorize in one call
  //   This may be a REST call or a local library call
  //   Make embedSize <= fetchSize
  //   Make embedSize in the range [10, 1000]
  //   Make embedSize a factor of fetchSize
  let embedSize = 200;

  // if (embedSize < 10):
  //   console.log('Use an embedSize of at least 10 for efficiency');
  //   process.exit();

  if (embedSize > fetchSize) {
    console.log('Make the embedSize <= fetchSize');
    console.log('embedSize = ' + embedSize + ', fetchSize = ' + fetchSize);
    process.exit();
  }

  // if (embedSize > 1000)
  //   console.log('embedSize greater than 1000 wastes memory without performance gains');
  //   process.exit();

  // commitSize is the number of updates per transaction
  //   Make commitSize <= embedSize
  //   Make commitSize in the range [10, 1000]
  //   Make commitSize a factor of embedSize
  let commitSize = 200;

  if (commitSize < 1) {
    console.log('Use a commitSize >=1 for efficiency');
    process.exit();
  }


  if (commitSize > embedSize) {
    console.log('Make commitSize <= embedSize');
    process.exit();
  }


  if (commitSize > 1000) {
    console.log('commitSize greater than 1000 tends to slow things down');
    process.exit();
  }


  // commitSize is the number of updates per transaction
  // Make commitSize in the range [10, 1000]
  // A reasonable default is
  //   fetchSize  = 1000
  //   embedSize  =  200
  //   commitSize =  200
  if ((fetchSize % embedSize) != 0)
    if (fetchSize <= 1000) {
      embedSize = fetchSize;
      commitSize = fetchSize;
    } else {
      console.log('Make embedSize as a factor of fetchSize');
      console.log('embedSize = ' + embedSize + ', fetchSize = ' + fetchSize);
      console.log('totalRows = ' + totalRows + ', commitSize = ' + commitSize);
      process.exit();
    }

  if ((embedSize % commitSize) != 0) {
    console.log('Make commitSize as a factor of embedSize');
    process.exit();
  }

  /** Select/Set your Embedding model here */
  // const embeddingModel = 'text-embedding-ada-002';
  // const embeddingModel = 'text-embedding-3-small';
  const embeddingModel = 'text-embedding-3-large';

  console.log('Using embedding model ' + embeddingModel);

  const openaiObj = new openai.OpenAI();

  // Get your OpenAI API Key from the environment
  openaiObj.apiKey = process.env.OPENAI_API_KEY;
  if (!openaiObj.apiKey) {
    console.log('\nYou need to set your OpenAI API KEY\n');
    console.log('https://openai.com/pricing');
    console.log('export OPENAI_API_KEY=whatever_your_api_key_value_is\n');
    process.exit();
  }

  try {

    // Get a standalone Oracle Database connection
    connection = await oracledb.getConnection(dbConfig);

    //Check if we are connected to Oracle Database 23.4 that supports vectors
    if (connection.oracleServerVersion < 2304000000) {
      console.log('This example requires Oracle Database 23.4 or later');
      process.exit();
    }
    console.log('Connected to Oracle Database');

    // Get the table metadata for batching
    const metaDataResult = await connection.execute(`
      SELECT min(id) min_id, max(id) max_id, count(id) count_id
      FROM batch`);
    for ([ minId, maxId, countOfId ] of metaDataResult.rows)
      console.log('  Count of IDs = ' + countOfId);

    if (startId > 0)
      minId = startId;

    if (endId > 0)
      maxId = endId;

    const maxMinDelta = maxId - minId;

    let embedIterations, numCommits;

    // Handle the cascading edge conditions
    if (maxMinDelta < fetchSize) {
      fetchSize = maxId - minId;
      embedSize = fetchSize;
      commitSize = fetchSize;
      embedIterations = 1;
      numCommits = 1 ;
    }

    if (maxMinDelta < countOfId)
      countOfId = maxMinDelta;

    if (totalRows > 0 && fetchSize > totalRows)
      fetchSize = totalRows;

    if (embedSize > fetchSize)
      embedSize = fetchSize;

    if (commitSize > embedSize)
      commitSize = embedSize;

    console.log('  minId = ' + minId);
    console.log('  maxId = ' + maxId);
    console.log('  count_id = ' + countOfId);
    console.log('  fetchSize = ' + fetchSize);
    console.log('  embedSize = ' + embedSize);
    console.log('  commitSize = ' + commitSize);

    if (countOfId <= 0) {
      console.log('No data in table');
      process.exit();
    }

    if (totalRows > 0)
      countOfId = totalRows;

    if (maxMinDelta < totalRows)
      countOfId = maxMinDelta;

    console.log('\nProcessing a max of ' + countOfId + ' rows\n');

    embedIterations = Math.round(fetchSize / embedSize);
    numCommits      = Math.round(fetchSize / commitSize);

    //Set the stage for the batch vectorization
    let curMinId = minId;
    let curMaxId = minId + fetchSize;
    let count = 0;

    console.log('Batch Vectorizing the following data:');

    // Loop over the rows and vectorize the column data in your table
    // Get a set of rows to vectorize using your table/columns
    // If there are multiple columns of interest, concatenate them and then vectorize
    // This allows you to control the range of rows via the :fetchsize bind variable
    // If you specify different ranges (minId, maxId),
    // then you can run this program in parallel to maximize throughput
    const fetchQuery = `SELECT id, info
                    FROM ${tableName}
                    WHERE id >= :lowid
                    AND id <= :highid
                    ORDER BY 1
                    FETCH FIRST :fetchsize ROWS ONLY`;

    // Get a batch of data, vectorize it, update a batch and commit
    // Logically this is three nested loops
    //   For all rows [fetchSize]
    //     For each batch of vectors [embedSize]
    //       For each batch commit [commitSize]
    // This allows you to optimze the fetchSize, embedSize and commitSize

    const tic = performance.now();

    while (count < countOfId) {
      // Want to do array updates for Oracle
      const binds = [];
      const data = [];
      const ids = [];
      let rowsReturned = 0;

      // Do not process too many rows
      if (curMaxId > maxId) {
        curMaxId = maxId;
        console.log('New curMaxid = ' + curMaxId);
        console.log('curMinId = ' + curMinId);
      }

      if (fetchSize > (curMaxId - curMinId)) {
        fetchSize = curMaxId - curMinId;
        console.log('New fetchSize = ' + fetchSize);

        embedSize = fetchSize;
        commitSize = fetchSize;
        embedIterations = 1;
        numCommits = 1;
        console.log('New commitSize = ' + commitSize);
      }

      // Run the query to get the batch of rows to vectorize
      const result = await connection.execute(fetchQuery,
        { lowid: curMinId, highid: curMaxId, fetchsize: fetchSize });
      rowsReturned = result.rows.length;
      console.log('Got ' + rowsReturned + ' rows');

      // Process the set of rows and store in lists
      // This does not use that much memory and makes the embedding code simpler
      for (const row of result.rows) {
        // Convert to the input format for the embedding model
        data.push('query: ' + row[1]);
        ids.push(row[0]);
      }

      let id = 0;
      let lowerIdx = 0;

      // Vectorize the row data
      for (let x = 0; x < embedIterations; x++) {
        const upperIdx = lowerIdx + embedSize;

        // lowerIdx:upperIdx is of size embedSize
        const response = await openaiObj.embeddings.create({
          input: data.slice(lowerIdx, upperIdx),
          model: embeddingModel,
          encoding_format: 'float',
        });

        // Format and remember the set of vectors
        for (let y = 0; y < embedSize; y++) {
          // Convert to a format for the SQL updates
          // Extract the vector from the JSON object and convert to Typed Array
          const float32VecArray = new Float32Array(response["data"][y]["embedding"]);

          // Remember the array of vectors and the corresponding PK
          binds.push([float32VecArray, ids[id]]);
          id++;
        }
        lowerIdx = upperIdx;

      }

// Uncomment the block below to update the vectors to the table & commit
/*
      let offset1 = 0;

      // Do all of the updates and commits
      for (let c = 0; c < numCommits; c++) {
        let offset2 = commitSize * (c + 1);
        if (offset2 === 0)
          offset2 = 1;

        // subList is of size commitSize
        const subList = binds.slice(offset1, offset2);
        offset1 += commitSize;

        // Commit the batch of updates
        await connection.executeMany(`
          UPDATE ${tableName}
          SET v = :1
          WHERE id = :2`,
          subList,
          { autoCommit: true }
        );
        console.log('Committed ' + commitSize + ' updates');
      }
*/

      count += rowsReturned;
      curMinId = curMaxId;
      curMaxId = curMaxId + rowsReturned;

    }

    // Commit any leftovers
    await connection.commit();

    // Get the end timer
    const toc = performance.now();

    // Determine the throughput and latency
    const duration = (toc - tic) / 1000; // in seconds
    let tps, latency;
    if (duration <= 0)
      tps = 0;
    else
      tps = count / duration;

    if (tps === 0)
      latency = 0;
    else
      latency = 1 / tps;

    if (duration > 0 && latency > 0) {
      console.log(`Processed ${count} vectors in ${duration.toFixed(3)} seconds`);
      console.log(`For ${tps.toFixed(1)} vectors per second, or ${latency.toFixed(6)} seconds per vector`);
    } else {
      console.log('The duration and latency are undefined');
    }

  } catch (err) {
    console.error(err);
  } finally {
    if (connection)
      await connection.close();
  }
}

vectorize();
