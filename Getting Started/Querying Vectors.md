# Querying Vectors

Create a table with some vectors

```SQL
CREATE TABLE flex3 (
  id NUMBER,
  embedding VECTOR
);
```
  
Insert some vectors

```SQL
INSERT INTO flex3 VALUES (1, '[1,2,3]');
INSERT INTO flex3 VALUES (2, '[4,5,6]');
INSERT INTO flex3 VALUES (3, '[7,8,9]');
INSERT INTO flex3 VALUES (4, '[7.1,5,6.3]');
INSERT INTO flex3 VALUES (5, '[9,7,8]');
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

Get rows within a certain distance

```SQL
SELECT * 
FROM flex3
WHERE embedding <-> '[3,1,2]' < 5;
```

Use the equivalent syntax to get rows within a certain distance

```SQL
SELECT * 
FROM flex3
WHERE VECTOR_DISTANCE(embedding, VECTOR('[3,1,2]'), EUCLIDEAN) < 5;
```


See [Vector Distance Functions](Vector%20Distance%20Functions.md) for more options.

See [Equivalent distance funcions](Equivalent%20Distance%20Functions.md) for more options.
