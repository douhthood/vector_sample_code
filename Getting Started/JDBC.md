# Java support via the Oracle JDBC thin SQL driver

Vectors can be created via the public REST endpoints for the **OpenAI.com** and **Cohere.com** companies.
Vectors can also be created via function calls to the ONNX Runtime.

Vectors can be bound and defined for SQL statements via the latest versions of JDBC.

Sample code:
- [Readme](../jdbc/ai-vector-search-oracle-jdbc-examples-main/README.md) 
- [Vectorize data with OpenAI ](../jdbc/ai-vector-search-oracle-jdbc-examples-main/ojdbc-vector-examples-openai/src/main/java/oracle/jdbc/vector/examples/openai/OpenAiSimilaritySearch.java) - Vectorize table data in one transaction
- [Vectorize data with Cohere](../jdbc/ai-vector-search-oracle-jdbc-examples-main/ojdbc-vector-examples-cohere/src/main/java/oracle/jdbc/vector/examples/cohere/CohereSimilaritySearch.java)  - Vectorize table data in one transaction
- [Vectorize data with the ONNX Runtime](../jdbc/ai-vector-search-oracle-jdbc-examples-main/ojdbc-vector-examples-onnx/src/main/java/oracle/jdbc/vector/examples/onnx/OnnxSimilaritySearch.java)  - Vectorize table data in one transaction
- [Similarity Search with OpenAI](../jdbc/ai-vector-search-oracle-jdbc-examples-main/ojdbc-vector-examples-openai/src/main/java/oracle/jdbc/vector/examples/openai/OpenAiSimilaritySearch.java) - Vectorize the query vector to get the TopK results
- [Similarity Search with Cohere](../jdbc/ai-vector-search-oracle-jdbc-examples-main/ojdbc-vector-examples-cohere/src/main/java/oracle/jdbc/vector/examples/cohere/CohereSimilaritySearch.java) - Vectorize the query vector to get the TopK results
- [Similarity Search with ONNX Runtime](../jdbc/ai-vector-search-oracle-jdbc-examples-main/ojdbc-vector-examples-onnx/src/main/java/oracle/jdbc/vector/examples/onnx/OnnxSimilaritySearch.java) - Vectorize the query vector to get the TopK results
  

