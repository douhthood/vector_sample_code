# Querying Vectors

Create a table with some vectors

```SQL
CREATE TABLE flex3 (
  id NUMBER,
  embedding VECTOR);
```
  
Insert some vectors

```SQL
INSERT INTO flex1 VALUES (1, '[1,2,3]'),
                         (2, '[4,5,6]'),
                         (3, '[7,8,9]'),
                         (4, '[7.1,5,6.3]'),
                         (5, '[9,7,8]');
```

Get the nearest neighbors to a vector

```SQL
SELECT *
FROM flex3
ORDER BY vector_distance(embedding, VECTOR('[3,1,2]'), EUCLIDEAN)
FETCH FIRST 3 ROWS ONLY;
```

Get the nearest neighbors to a row

```SQL
SELECT *
FROM flex3
WHERE id != 1 ORDER BY embedding <-> (SELECT embedding FROM flex3 WHERE id = 1)
FETCH FIRST 3 ROWS ONLY;
```

See [Vector Distance Functions](Vector%20Distance%20Functions.md) for more options.
