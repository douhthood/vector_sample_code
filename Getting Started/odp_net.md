# C# support via the Oracle ODP.NET Managed driver

Vectors can be created via the public REST endpoints for the **OpenAI.com** and **Cohere.com** companies.

Vectors can be bound and defined for SQL statements via the latest versions of [ODP.NET]([https://python-oracledb.readthedocs.io/en/latest/user_guide/installation.html#installation-requirements](https://www.nuget.org/packages/Oracle.ManagedDataAccess)) from Nuget.

Sample code:
- [Readme](../python-oracledb/README.md)
- [Vectorize data with OpenAI ](../odp.net/OpenAI_VectorizeTable.cs) - Vectorize table data in one transaction
- [Vectorize data with Cohere](../odp.net/Cohere_VectorizeTable.cs) - Vectorize table data in one transaction
- [Similarity Search with OpenAI](../odp.net/OpenAI_SimilaritySearch.cs) - Vectorize the query vector to get the TopK results
- [Similarity Search with Cohere](../odp.net/Cohere_SimilaritySearch.cs) - Vectorize the query vector to get the TopK results
