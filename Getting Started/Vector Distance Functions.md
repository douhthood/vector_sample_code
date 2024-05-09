# Vector Distance Functions

Oracle AI Vector Search supports many different vector distance functions:
- [Euclidean](https://docs.oracle.com/en/database/oracle/oracle-database/23/vecse/euclidean-and-squared-euclidean-distances.html)
- [Euclidean Squared](https://docs.oracle.com/en/database/oracle/oracle-database/23/vecse/euclidean-and-squared-euclidean-distances.html)
- [Cosine Similarity](https://docs.oracle.com/en/database/oracle/oracle-database/23/vecse/cosine-similarity.html)
- [Dot Product](https://docs.oracle.com/en/database/oracle/oracle-database/23/vecse/dot-product-similarity.html)
- [Manhattan Distance](https://docs.oracle.com/en/database/oracle/oracle-database/23/vecse/manhattan-distance.html)
- [Hamming Distance](https://docs.oracle.com/en/database/oracle/oracle-database/23/vecse/hamming-similarity.html)

Here are some examples of using vector distance functions.

Create a table with a vector  
```SQL
CREATE TABLE flex2 (embedding VECTOR);
```

Insert some vectors

```SQL
INSERT INTO flex2 VALUES ('[1,2,3]'),
                         ('[4,5,6]'),
                         ('[7,8,9]'),
                         ('[7.1,5,6.3]'),
                         ('[9,7,8]');
```

Get the nearest neighbors by Euclidean distance (Euclidean = L2 distance)

```SQL
SELECT *
FROM flex2
ORDER BY vector_distance(embedding, vector('[3,1,2]'), EUCLIDEAN)
FETCH FIRST 3 ROWS ONLY;
```

Get the nearest neighbors by Cosine Similarity distance

```SQL
SELECT *
FROM flex2
ORDER BY vector_distance(embedding, vector('[3,1,2]'), COSINE)
FETCH FIRST 3 ROWS ONLY;
```

Get the nearest neighbors by Dot Product distance

```SQL
SELECT *
FROM flex2
ORDER BY vector_distance(embedding, vector('[3,1,2]'), DOT)
FETCH FIRST 3 ROWS ONLY;
```

Get the nearest neighbors by Manhattan distance

```SQL
SELECT *
FROM flex2
ORDER BY vector_distance(embedding, vector('[3,1,2]'), MANHATTAN)
FETCH FIRST 3 ROWS ONLY;
```

Get the nearest neighbors by Hamming distance

```SQL
SELECT *
FROM flex2
ORDER BY vector_distance(embedding, vector('[3,1,2]'), HAMMING)
FETCH FIRST 3 ROWS ONLY;
```

Get the nearest neighbors by L2 distance (L2 = Euclidean distance)

```SQL
SELECT *
FROM flex2
ORDER BY embedding <-> '[3,1,2]'
FETCH FIRST 3 ROWS ONLY;
```

Get the nearest neighbors by Cosine Similarity

```SQL
SELECT *
FROM flex2
ORDER BY embedding <=> '[3,1,2]'
FETCH FIRST 3 ROWS ONLY;
```

Get the nearest neighbors by Negative Dot Product

```SQL
SELECT *
FROM flex2
ORDER BY embedding <\#> '[3,1,2]'
FETCH FIRST 3 ROWS ONLY;
```
