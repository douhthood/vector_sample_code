# Node.js support via the node-oracledb SQL driver

Vectors can be created via the public REST endpoints for the **OpenAI.com** and **Cohere.com** companies.
Vectors can also be created via function calls to Transformer.js **local libraries** from **Hugging Face**.

Vectors can be bound and defined for SQL statements via the latest versions of [node-oracledb](https://node-oracledb.readthedocs.io/en/latest/user_guide/installation.html#quickstart) from npm.

Sample code:
- [Readme](../node-oracledb/README.md) 
- [Create the schema](../node-oracledb/createSchema.js) - create the tables and data needed for Similarity Search
- [Vectorize data with OpenAI ](../node-oracledb/vectorizeTableOpenAI.js) - Vectorize table data in one transaction
- [Vectorize data with Cohere](../node-oracledb/vectorizeTableCohere.js)  - Vectorize table data in one transaction
- [Vectorize data with Sentence Transformers](../node-oracledb/vectorizeTableHFTransformers.js)  - Vectorize table data in one transaction
- [Similarity Search with OpenAI](../node-oracledb/similaritySearchOpenAI.js) - Vectorize the query vector to get the TopK results
- [Similarity Search with Cohere](../node-oracledb/similaritySearchCohere.js) - Vectorize the query vector to get the TopK results
- [Similarity Search with Sentence Transformers](../node-oracledb/similaritySearchHFTransformers.js) - Vectorize the query vector to get the TopK results
- [Batch vectorize data with OpenAI ](../node-oracledb/batchVectorizeTableOpenAI.js) - Vector the table data in batches
- [Batch vectorize data with Cohere](../node-oracledb/batchVectorizeTableCohere.js) - Vector the table data in batches
- [Batch vectorize data with Sentence Transformers](../node-oracledb/batchVectorizeHFTransformers.js) - Vector the table data in batches
