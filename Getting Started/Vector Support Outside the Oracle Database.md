# Vector Support Outside Oracle Database 23ai

You can create vectors via vector embedding models outside Oracle Database 23ai.

You can use commercial vendors such as OpenAI or Cohere which use public REST APIs.

<img src="images/OpenAI_Cohere.png" width="384" alt="OpenAI and Cohere"/>

## Sample code using OpenAI

**Python** sample code using **OpenAI**:
- [Vectorize Data](../python-oracledb/vectorize_table_openai.py) and [Similarity Search](../python-oracledb/similarity_search_OpenAI.py)

**Node.js** sample code using **OpenAI**:
- [Vectorize Data](../node-oracledb/vectorizeTableOpenAI.js) and [Similarity Search](../node-oracledb/similaritySearchOpenAI.js)

**ODP.NET** sample code using **OpenAI**:
- [Vectorize Data](../odp.net/OpenAI_VectorizeTable.cs) and [Similarity Search](../odp.net/OpenAI_SimilaritySearch.cs)

**JDBC** sample code using **OpenAI**:
- [Vectorize Data](../jdbc/ai-vector-search-oracle-jdbc-examples-main/ojdbc-vector-examples-openai/README.md) and [Similarity Search](../jdbc/ai-vector-search-oracle-jdbc-examples-main/ojdbc-vector-examples-openai/src/main/java/oracle/jdbc/vector/examples/openai/OpenAiSimilaritySearch.java)

<br>

## Sample code using Cohere
**Python** sample code using **OpenAI**:
- [Vectorize Data](../python-oracledb/vectorize_table_openai.py) and [Similarity Search](../python-oracledb/similarity_search_OpenAI.py)

**Node.js** sample code using **OpenAI**:
- [Vectorize Data](../node-oracledb/vectorizeTableOpenAI.js) and [Similarity Search](../node-oracledb/similaritySearchOpenAI.js)

**ODP.NET** sample code using **OpenAI**:
- [Vectorize Data](../odp.net/OpenAI_VectorizeTable.cs) and [Similarity Search](../odp.net/OpenAI_SimilaritySearch.cs)

**JDBC** sample code using **OpenAI**:
- [Vectorize Data](../jdbc/ai-vector-search-oracle-jdbc-examples-main/ojdbc-vector-examples-openai/README.md) and [Similarity Search](../jdbc/ai-vector-search-oracle-jdbc-examples-main/ojdbc-vector-examples-openai/src/main/java/oracle/jdbc/vector/examples/openai/OpenAiSimilaritySearch.java)


<br>
You can also use open source embedding models from Hugging Face and the ONNX Runtime.  The open source embeding models tend to be function calls to local libraries.

<img src="images/HF_ONNX.png" width="384" alt="Hugging Face and ONNX Runtime"/>

 
