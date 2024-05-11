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

Delete some vectors in tab2

```SQL
DELETE FROM tab2 
WHERE ID > 2;
```

Commit the changes

```SQL
COMMIT;
```

Create a table with vectors from an existing table

```SQL
CREATE TABLE tab3 AS SELECT * FROM tab2;
```

Populate a table from a query

```SQL
TRUNCATE TABLE tab3;
INSERT INTO tab3 SELECT * FROM tab2;
```

Store multiple vectors per table

```SQL
CREATE TABLE IF NOT EXISTS t3
       ( id           NUMBER NOT NULL,
         name         VARCHAR2(32),
         v1           VECTOR,
         v2           VECTOR,
         v3           VECTOR,
                      PRIMARY KEY (id)
       );  

INSERT INTO t3 VALUES
       (1,
        'One',
        '[2.3, 4.5, 0.1]',
        '[1.3]',
        '[4.981, -6.3]'
       );

SELECT * FROM t3;
```
