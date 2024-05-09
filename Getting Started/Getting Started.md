# Oracle AI Vector Search

## Getting Started
All **Oracle Database 23ai** databases can use AI Vector Search.

Create a table with a vector  
```SQL
CREATE TABLE flex1 (embedding VECTOR);
```

Insert some vectors

```SQL
INSERT INTO flex1 VALUES ('[1,2,3]'),
                         ('[4,5,6]'),
                         ('[7,8,9]'),
                         ('[7.1,5,6.3]'),
                         ('[9,7,8]');
```

Get the nearest neighbors by Euclidean distance (Euclidean = L2 distance)

```SQL
SELECT *
FROM flex1
ORDER BY vector_distance(embedding, vector('[3,1,2]'), EUCLIDEAN)
FETCH FIRST 3 ROWS ONLY;
```

Get the nearest neighbors by Cosine Similarity distance

```SQL
SELECT *
FROM flex1
ORDER BY vector_distance(embedding, vector('[3,1,2]'), COSINE)
FETCH FIRST 3 ROWS ONLY;
```

Get the nearest neighbors by Dot Product distance

```SQL
SELECT *
FROM flex1
ORDER BY vector_distance(embedding, vector('[3,1,2]'), DOT)
FETCH FIRST 3 ROWS ONLY;
```

Get the nearest neighbors by Manhattan distance

```SQL
SELECT *
FROM flex1
ORDER BY vector_distance(embedding, vector('[3,1,2]'), MANHATTAN)
FETCH FIRST 3 ROWS ONLY;
```

Get the nearest neighbors by Hamming distance

```SQL
SELECT *
FROM flex1
ORDER BY vector_distance(embedding, vector('[3,1,2]'), HAMMING)
FETCH FIRST 3 ROWS ONLY;
```

Get the nearest neighbors by L2 distance (L2 = Euclidean distance)

```SQL
SELECT *
FROM flex1
ORDER BY embedding <-> '[3,1,2]'
FETCH FIRST 3 ROWS ONLY;
```
