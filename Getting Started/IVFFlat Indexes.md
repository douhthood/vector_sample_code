# IVFFlat Indexes

Oracle AI Vector Search supports IVFFlat vector indexes to enable huge vector indexes.  Unlike HNSW vector indexes which are limited in size by available RAM, IVFFlat vector indexes are limited in size by the available disk space.

Oracle AI Vector Search calls **IVFFlat** vector indexes **Neighbor Partition** indexes.
The Neighbor Partition Index is a table-based index whose partitions represent the clusters of vectors which are like each other.  

<img src="images/IVFFlat.png" width="768" alt="IVFFlat"/>

With this type of index, entries in the index are divided into partitions which correspond to centroids (or average) vectors which are representative of the data.  Searches of the index are performed by first determining the nearest centroids to a search vector and then by searching the partitions which correspond to each centroid.

As IVFFlat indexes use the Oracle Database buffer cache, there may be physical IOs during IVFFlat vector searches.  These physical (and logical) IOs tend to be slower than the using the in-memory HNSW vector indexes.

Your IVFFlat vector indexes will benefit by storing metadata in the vector pool.  Size the VECTOR_MEMORY_SIZE parameter to be able to use both HNSW and IVFFlat vector indexes.

## Some examples of creating IVFFlat vector indexes

```SQL
CREATE VECTOR INDEX flex3_embedding_ivfflat ON flex3 (embedding)
ORGANIZATION NEIGHBOR PARTITIONS 
WITH TARGET ACCURACY 90
DISTANCE COSINE
PARALLEL 4;
```

```SQL
DROP INDEX flex3_embedding_ivfflat;
```

```SQL
CREATE VECTOR INDEX ivfflat2 ON flex3 (embedding)
ORGANIZATION NEIGHBOR PARTITIONS 
WITH TARGET ACCURACY 80
DISTANCE DOT
PARALLEL 8; 
```

```SQL
DROP INDEX ivfflat2;
```

```SQL
CREATE VECTOR INDEX ivfflat3 ON flex3 (embedding)
ORGANIZATION NEIGHBOR PARTITIONS 
WITH TARGET ACCURACY 95
DISTANCE EUCLIDEAN
PARALLEL 16; 
```

```SQL
DROP INDEX ivfflat3;
```

```SQL
CREATE VECTOR INDEX ivfflat4 ON flex3 (embedding)
ORGANIZATION NEIGHBOR PARTITIONS 
WITH TARGET ACCURACY 90
DISTANCE MANHATTAN
PARALLEL 32; 
```

```SQL
DROP INDEX ivfflat4;
```

Comments on creating IVFFlat vector indexes:
- The VECTOR keyword is used to create vector indexes
  - Vector indexes are fundamentally different from existing indexes
- The organization is NEIGHBOR PARTITIONS for IVFFlat vector indexes
  - The organizations clause defines the type of index
- The WITH TARGET ACCURACY clause is used
  - This clauses defines the default accuracy for this vector index
  - eg 80 means that about 8/10 times, this will give the same resultset as if a exact query were used
- The distance function (eg COSINE) is defined
  - The vector embedding model defines the distance function used to train the neural network
  - Use the same vector distance function in the vector index to get the best results
- The vector index can be created in parallel
  - Given sufficient available CPU cores, increasing the PARALLEL clause will tend to decrease the vector index creation time
