# Choose the embedding model from Hugging Face

Hugging Face has a large number of open source vector embedding models.  Vector embedding models built using the [Sentence Transformers](https://sbert.net/) library can be converted into the [ONNX](https://onnx.ai/) format via the Oracle OML4Py Python library. 

A vector database is only as good as the vector embedding models that it uses:
- You want a good balance between the quality of the vector embedding model and the performance of the embedding model
- A random number generator may be simple and fast, but it will have zero quality as an embedding model
- An embeding model which has perfect quality, but takes minutes to create a vector is not practical
 
    
The following (English only) vector embedding models are known to work with the [vector_embedding](https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/vector_embedding.html#GUID-5ED78260-6D21-4B6B-86E0-A1E70EFA11CA) SQL function.

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

<br>

The following (multi-lingual) vector embedding models are known to work with the vector_embedding SQL function.

<img src="../Getting%20Started/images/ONNX_Multilingual_embedding.png" width="768" alt="English only embedding model"/>

Comments on the Multi-lingual only vector embedding models:
- The [distiluse-base-multilingual-cased-v2](https://huggingface.co/sentence-transformers/distiluse-base-multilingual-cased-v2) embedding models is the most downloaded
  - It has the worst quality (194th/220)
- The [intfloat/multilingual-e5-base](https://huggingface.co/intfloat/multilingual-e5-base) embedding model has the best quality

There tends to be a relationship between the (number of dimensions + the number of parameters) and the quality of the vectors.  ie bigger vectors tend to have better quality as there is more metadata available to represent the meaning of the text.
The inverse is also usually true.  ie the smaller the vectors the lower the quality + the faster the vectors.

In the perfect world, you have the best quality vectors + the fastest performance.

## Conclusion
There is not such thing as the best vector embedding model. 
You should choose your embedding model based on several criteria:
- Whether you need a multi-linugal embedding model
- The quality of the embedding model given your data and use cases
- The performance of the embedding model

<br>

Another way of saying this is the following:
- If you need to support any non-English language, eg (Japanese, Spanish, Thai, Mandarin, Turkish), then it does not matter how good or fast the English only embedding model is
- If the embedding model does not give good results, then it does not matter how fast that it is
- If you can get the same quality from two different embedding models, then choose the one which is faster
