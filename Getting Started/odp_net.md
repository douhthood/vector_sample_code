# C# support via the Oracle ODP.NET Managed driver

Vectors can be created via the public REST endpoints for the **OpenAI.com** and **Cohere.com** companies.

Vectors can be bound and defined for SQL statements via the latest versions of [ODP.NET]([https://python-oracledb.readthedocs.io/en/latest/user_guide/installation.html#installation-requirements](https://www.nuget.org/packages/Oracle.ManagedDataAccess)) from Nuget.

Sample code:
- [Readme](../python-oracledb/README.md)
- [Create the schema](../python-oracledb/create_schema.py) - create the tables and data needed for Similarity Search
- [Vectorize data with OpenAI ](../python-oracledb/vectorize_table_openai.py) - Vectorize table data in one transaction
- [Vectorize data with Cohere](../python-oracledb/vectorize_table_Cohere.py) - Vectorize table data in one transaction
- [Vectorize data with Sentence Transformers](../python-oracledb/similarity_search_SentenceTransformers.py) - Vectorize table data in one transaction
- [Similarity Search with OpenAI](../python-oracledb/similarity_search_OpenAI.py) - Vectorize the query vector to get the TopK results
- [Similarity Search with Cohere](../python-oracledb/similarity_search_Cohere.py) - Vectorize the query vector to get the TopK results
- [Similarity Search with Sentence Transformers](../python-oracledb/similarity_search_SentenceTransformers.py) - Vectorize the query vector to get the TopK results
