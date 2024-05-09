## Storing Vectors

Create a new table with a vector column 
```SQL
CREATE TABLE tab1 (
  id NUMBER,
  embedding VECTOR);
```

Insert some vectors

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
