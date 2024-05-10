# Vector Support Outside Oracle Database 23ai

You can create vectors via vector embedding models outside Oracle Database 23ai.

You can use commercial vendors such as OpenAI or Cohere which use public REST APIs.
You can also use open source embedding models from Hugging Face and the ONNX Runtime.

<img src="images/OpenAI_Cohere.png" width="384" alt="OpenAI and Cohere"/>

## Sample code using OpenAI

**Python** sample code:
- [Vectorize Data](../python-oracledb/vectorize_table_openai.py) and [Similarity Search](../python-oracledb/similarity_search_OpenAI.py)

**Node.js** sample code:
- [Vectorize Data](../node-oracledb/vectorizeTableOpenAI.js) and [Similarity Search](../node-oracledb/similaritySearchOpenAI.js)

**ODP.NET** sample code:
- [Vectorize Data](../odp.net/OpenAI_VectorizeTable.cs) and [Similarity Search](../odp.net/OpenAI_SimilaritySearch.cs)

**JDBC** sample code:
- [Vectorize Data](../jdbc/ai-vector-search-oracle-jdbc-examples-main/ojdbc-vector-examples-openai/README.md) and [Similarity Search](../jdbc/ai-vector-search-oracle-jdbc-examples-main/ojdbc-vector-examples-openai/src/main/java/oracle/jdbc/vector/examples/openai/OpenAiSimilaritySearch.java)

<br>

## Sample code using Cohere
**Python** sample code:
- [Vectorize Data](../python-oracledb/vectorize_table_Cohere.py) and [Similarity Search](../python-oracledb/similarity_search_Cohere.py)

**Node.js** sample code:
- [Vectorize Data](../node-oracledb/vectorizeTableCohere.js) and [Similarity Search](../node-oracledb/similaritySearchCohere.js)

**ODP.NET** sample code:
- [Vectorize Data](../odp.net/Cohere_VectorizeTable.cs) and [Similarity Search](../odp.net/Cohere_SimilaritySearch.cs)

**JDBC** sample code:
- [Vectorize Data](../jdbc/ai-vector-search-oracle-jdbc-examples-main/ojdbc-vector-examples-cohere) and [Similarity Search](../jdbc/ai-vector-search-oracle-jdbc-examples-main/ojdbc-vector-examples-cohere/src/main/java/oracle/jdbc/vector/examples/cohere/CohereSimilaritySearch.java)


<br>
You can also use open source embedding models from Hugging Face and the ONNX Runtime.  The open source embeding models tend to be function calls to local libraries.

<img src="images/HF_ONNX.png" width="384" alt="Hugging Face and ONNX Runtime"/>

<br>

## Sample code using Hugging Face Sentence Transformers

**Python** sample code:
- [Vectorize data](../python-oracledb/vectorize_table_SentenceTransformers.py) and [similarity search]()
 
<br>

## Sample code using Hugging Face Transformers.js

**Node.js** sample code:
- [Vectorize data](../node-oracledb/vectorizeTableHFTransformers.js) and [similarity search](../node-oracledb/similaritySearchHFTransformers.js)
