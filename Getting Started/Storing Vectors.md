## Storing Vectors

Create a new table with a vector column 
```SQL
CREATE TABLE tab1 (
  id NUMBER,
  embedding VECTOR);
```

Insert some vectors

```SQL
INSERT INTO tab1 VALUES (1, '[1,2,3]'),
                         (2, '[4,5,6]'),
                         (3, '[7,8,9]'),
                         (4, '[7.1,5,6.3]'),
                         (5, '[9,7,8]');
```

