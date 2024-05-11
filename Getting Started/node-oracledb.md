# Node.js support via the node-oracledb SQL driver

Vectors can be created via the public REST endpoints for the **OpenAI.com** and **Cohere.com** companies.
Vectors can also be created via function calls to Transformer.js **local libraries** from **Hugging Face**.

Vectors can be bound and defined for SQL statements via the latest versions of [node-oracledb](https://node-oracledb.readthedocs.io/en/latest/user_guide/installation.html#quickstart) from npm.

Sample code:
- [Readme](../node-oracledb/README.md)
- [Create the schema](../node-oracledb/createSchema.js)
- [Vectorize data with OpenAI ](../node-oracledb/vectorizeTableOpenAI.js)
- [Vectorize data with Cohere](../node-oracledb/vectorizeTableCohere.js)
- [Vectorize data with Sentence Transformers](../node-oracledb/vectorizeTableHFTransformers.js)
- [Similarity Search with OpenAI](../node-oracledb/similaritySearchOpenAI.js)
- [Similarity Search with Cohere](../node-oracledb/similaritySearchCohere.js)
- [Similarity Search with Sentence Transformers](../node-oracledb/similaritySearchHFTransformers.js)
