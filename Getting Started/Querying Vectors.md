# Querying Vectors

Get the nearest neighbors to a vector

```SQL
SELECT *
FROM flex1
ORDER BY vector_distance(embedding, VECTOR('[3,1,2]'), EUCLIDEAN)
FETCH FIRST 3 ROWS ONLY;
```

See [Vector Distance Functions]() for more options.
