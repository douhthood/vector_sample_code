# HNSW Indexes

[Hierarchial Navigable Small World](https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/create-vector-index.html#GUID-B396C369-54BB-4098-A0DD-7C54B3A0D66F) (HNSW) are fast, memory based, proximity graph, vector indexes.

HNSW vector indexes are faster than IVFFlat vector indexes, but they have two downsides:
- The entire HNSW vector index must fit with RAM
- They tend take longer to create than IVFFlat indexes

You must allocate sufficent memory for the [VECTOR_MEMORY_SIZE](../Installation/README.md#VECTOR_MEMORY_SIZE) parameter to be able to use the HNSW vector indexes.

## Some examples of creating HNSW vector indexes

```SQL
CREATE VECTOR INDEX flex3_embedding_hnsw ON flex3 (embedding)
ORGANIZATION INMEMORY NEIGHBOR GRAPH
WITH TARGET ACCURACY 90
DISTANCE COSINE
PARALLEL 4;
```

Comments on the flex3_embedding_hnsw vector index:
- The VECTOR keyword is used to create vector indexes
  - Vector indexes are fundamentally different from existing indexes 
- The organization is INMEMORY NEIGHBOR GRAPH for HNSW vector indexes
  - The origanizations clause defines the type of graph  
- The WITH TARGET ACCURACY clause is used
  - This clauses defines the default accuracy for this vector index
  - 90 means that about 9/10 times, this will give the same resultset as if a exact query were used
- The distance function (COSINE) is defined
  - The vector embedding model defines the distance function used to train the neural network
  - Use the **same** vector distance function in the vector index to get the best results
- The vector index is created in parallel
  - Given sufficient available CPU cores, increasing the PARALLEL clause will tend to decrease the vector index creation time
