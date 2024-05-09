# HNSW Indexes

[Hierarchial Navigable Small World](https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/create-vector-index.html#GUID-B396C369-54BB-4098-A0DD-7C54B3A0D66F) (HNSW) are fast, memory based, proximity graph, vector indexes.

HNSW vector indexes are faster than IVFFlat vector indexes, but they have two downsides:
- The entire HNSW vector index must fit with RAM
- They tend take longer to create than IVFFlat indexes

There are three forms of syntax for creating HNSW vector indexes:
- Basic - uses defaults
- Define the WITH TARGET ACCURACY clauses
- Use the Options clause

I recommend using the WITH TARGET ACCURACY clause as it is simple and will tend to give the best performance.

