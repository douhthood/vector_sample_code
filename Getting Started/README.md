# Oracle AI Vector Search

## Getting Started
All **Oracle Database 23ai** databases can use AI Vector Search.

Create a table with a vector  
```SQL
CREATE TABLE items (embedding VECTOR);
```

Insert some vectors

```SQL
INSERT INTO items VALUES ('[1,2,3]'),
                         ('[4,5,6]');
```

Get the nearest neighbors by L2 distance

```SQL
SELECT *
FROM items
ORDER BY embedding <-> '[3,1,2]'
FETCH FIRST 3 ROWS ONLY;
```

Get the nearest neighbors by Euclidean distance (L2 = Euclidean)

```SQL
SELECT *
FROM items
ORDER BY vector_distance(embedding, vector('[3,1,2]'), EUCLIDEAN)
FETCH FIRST 3 ROWS ONLY;
```

Get the nearest neighbors by Cosine Similarity distance

```SQL
SELECT *
FROM items
ORDER BY vector_distance(embedding, vector('[3,1,2]'), COSINE)
FETCH FIRST 3 ROWS ONLY;
```

Get the nearest neighbors by Dot Product distance

```SQL
SELECT *
FROM items
ORDER BY vector_distance(embedding, vector('[3,1,2]'), DOT)
FETCH FIRST 3 ROWS ONLY;
```

Get the nearest neighbors by Manhattan distance

```SQL
SELECT *
FROM items
ORDER BY vector_distance(embedding, vector('[3,1,2]'), MANHATTAN)
FETCH FIRST 3 ROWS ONLY;
```

Get the nearest neighbors by Hamming distance

```SQL
SELECT *
FROM items
ORDER BY vector_distance(embedding, vector('[3,1,2]'), HAMMING)
FETCH FIRST 3 ROWS ONLY;
```

## Storing
Storing stuff

## Querying
Querying stuff

## Indexing
Indexing stuff

## Filtering
Filtering stuff

## Vector Types
Vector stuff

## Performance Optimization
Loading stuff
Indexing stuff
Querying stuff
Exact Search
Approximate esearch
Monitoring
Scaling
Languages

## Reference
### Vector Type
### Vector Functions
### 

## Trouble Shooting


