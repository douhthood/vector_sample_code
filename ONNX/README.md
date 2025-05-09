# ONNX Support in Oracle AI Vector Search

You can create vectors in Oracle Database 23ai via the [vector_embedding](https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/vector_embedding.html#GUID-5ED78260-6D21-4B6B-86E0-A1E70EFA11CA) SQL function.

The vector_embedding SQL function has two input parameters:
- The vector **embedding model**
- The **expression or column name** as the data to embed

The **output** of the vector_embedding SQL function is the **vector**.

<br>

Setup for using the vector_embedding SQL function
- [Download a pre-built Augmented ONNX embedding model](../ONNX/Download%20prebuilt%20Augmented%20ONNX%20file.md)
- [Load the embedding model into Oracle Database 23ai](../ONNX/Load%20the%20ONNX%20model.md)
- [Create a vector via the vector_embedding SQL function](../ONNX/Create%20vector%20via%20vector_embedding.md)

Rather than using either of the two pre-built Augmented ONNX embedding models, you can instead choose a vector embedding model from HuggingFace.  

The following embedding models are know to work:
- 'sentence-transformers/all-mpnet-base-v2'
- 'sentence-transformers/all-MiniLM-L6-v2'
- 'sentence-transformers/multi-qa-MiniLM-L6-cos-v1'
- 'sentence-transformers/distiluse-base-multilingual-cased-v2'
- 'sentence-transformers/all-MiniLM-L12-v2'
- 'BAAI/bge-small-en-v1.5'
- 'BAAI/bge-base-en-v1.5'
- 'taylorAI/bge-micro-v2'
- 'intfloat/e5-small-v2'
- 'intfloat/e5-base-v2'
- 'thenlper/gte-base'
- 'thenlper/gte-small'
- 'TaylorAI/gte-tiny'
- 'sentence-transformers/paraphrase-multilingual-mpnet-base-v2'
- 'intfloat/multilingual-e5-base'
- 'intfloat/multilingual-e5-small'
- 'sentence-transformers/stsb-xlm-r-multilingual'
- 'Snowflake/snowflake-arctic-embed-xs'
- 'Snowflake/snowflake-arctic-embed-s'
- 'Snowflake/snowflake-arctic-embed-m'
- 'mixedbread-ai/mxbai-embed-large-v1'
- 'openai/clip-vit-large-patch14'
- 'google/vit-base-patch16-224'
- 'microsoft/resnet-18'
- 'microsoft/resnet-50'
- 'WinKawaks/vit-tiny-patch16-224'
- 'Falconsai/nsfw_image_detection'
- 'WinKawaks/vit-small-patch16-224'
- 'nateraw/vit-age-classifier'
- 'rizvandwiki/gender-classification'
- 'AdamCodd/vit-base-nsfw-detector'
- 'trpakov/vit-face-expression'
- 'BAAI/bge-reranker-base'
