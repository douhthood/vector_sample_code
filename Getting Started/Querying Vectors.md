# Querying Vectors

Get the nearest neighbors to a vector

```SQL
SELECT *
FROM flex1
ORDER BY vector_distance(embedding, VECTOR('[3,1,2]'), EUCLIDEAN)
FETCH FIRST 3 ROWS ONLY;
```

Get the nearest neighbors to a row

```SQL
SELECT *
FROM flex1
WHERE id != 1 ORDER BY embedding <-> (SELECT embedding FROM flex1 WHERE id = 1)
FETCH FIRST 3 ROWS ONLY;
```

See [Vector Distance Functions](Vector%20Distance%20Functions.md) for more options.
