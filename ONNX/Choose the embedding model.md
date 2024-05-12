# Choose the embedding model from Hugging Face

Hugging Face has a large number of open source vector embedding models.  Vector embedding models built using the [Sentence Transformers](https://sbert.net/) library can be converted into the [ONNX](https://onnx.ai/) format via the Oracle OML4Py Python library. 

A vector database is only as good as the vector embedding models that it uses:
- You want a good balance between the quality of the vector embedding model and the performance of the embedding model
- A random number generator may be simple and fast, but it will have zero quality as an embedding model
- An embeding model which has perfect quality, but takes minutes to create a vector is not practical
 
    
The following (English only) vector embedding models are known to work with the vector_embedding SQL function.

<img src="../Getting%20Started/images/ONNX_English_only_embedding.png" width="768" alt="English only embedding model"/>

Comments on the English only vector embedding models:
- The [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) is by far the most downloaded embedding model
  - It is not the best quality embedding model (99th/220 on the [MTEB Leader board](https://huggingface.co/spaces/mteb/leaderboard) with a score of 56.26/100)
  - It has OK performance
  - It is often used as an example in blogs and YouTube videos, so people tend to also use it 
- The [all-mpnet-base-v2](https://huggingface.co/sentence-transformers/all-mpnet-base-v2) is the second most downloaded embedding model
  - It is slower than all-MiniLM-L6-v2
  - The quality is slightly better than all-MiniLM-L6-v2
- The [BAAI/bge-base-en-v1.5](https://huggingface.co/BAAI/bge-base-en-v1.5) has the best quality in the table and 3rd most downloaded embedding model  

The following (multi-lingual) vector embedding models are known to work with the vector_embedding SQL function.

<img src="../Getting%20Started/images/ONNX_Multilingual_embedding.png" width="768" alt="English only embedding model"/>



