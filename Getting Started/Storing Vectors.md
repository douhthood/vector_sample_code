## Storing Vectors

Create a new table with a vector column

```SQL
CREATE TABLE tab1 (
  id NUMBER,
  embedding VECTOR);
```

Insert some vectors into tab1

```SQL
INSERT INTO tab1 VALUES
  (1, '[1,2,3]'),
  (2, '[4,5,6]'),
  (3, '[7,8,9]'),
  (4, '[7.1,5,6.3]'),
  (5, '[9,7,8]');
```

Create a new table without a vector column 
```SQL
CREATE TABLE tab2 (
  id NUMBER
);
```

Add a vector column to the existing table
```SQL
ALTER TABLE tab2 ADD v VECTOR;
```

Insert some vectors into tab2

```SQL
INSERT INTO tab2 VALUES
  (1, '[1.1,2.2,3.3]'),
  (2, '[4.0,5.1,6.2]'),
  (3, '[7,8,9]'),
  (4, '[7.1,5,6.3]'),
  (5, '[9,7,8]');
```

Use SQL MERGE for some vectors

```SQL
MERGE INTO tab1
USING (SELECT * FROM tab2) t2
ON (tab1.id = t2.id)
WHEN MATCHED THEN UPDATE SET tab1.embedding = t2.v
WHEN NOT MATCHED THEN INSERT VALUES (t2.id, t2.v);
```

Update some vectors in tab2

```SQL
UPDATE tab2 
  SET V = '[1.1, 2, 3.1415]'
WHERE ID < 3;
```
