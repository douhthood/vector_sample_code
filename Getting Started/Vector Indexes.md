# Vector Indexes

By default, Oracle AI Vector Search does a full table scan to enable exact semantics for vector search.
While exact semantics give perfect recall, they can be too slow when there are millions of vectors to search.

All vector databases uses some form of Approximate Nearest Neighbor (ANN) algorithm for vector indexes.
ANN algoirthms are an accuracy vs performance tradeoff.  This means that you give up some accuracy for increased speed.

Oracle AI Vector Search makes it simple to define the accuracy vs performance tradeoff via the [WITH TARGET ACCURACY](With%20Target%20Accuracy.md) clause in the vector index and/or the vector distance SQL query.

Oracle AI Vector Search supports two types of vector indexes:
- [HNSW](HNSW%20Indexes.md)
- [IVFFlat](IVFFlat%20Indexes.md)

## Vector speed vs size trade off
images/hnsw_ivfflat_pro_cons.png
