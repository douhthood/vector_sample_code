# Oracle AI Vector Search

## Storing Vectors

Create a new table with a vector column 
```SQL
CREATE TABLE tabl1 (
  id NUMBER,
  embedding VECTOR);
```

Insert some vectors

```SQL
INSERT INTO flex1 VALUES ('[1,2,3]'),
                         ('[4,5,6]'),
                         ('[7,8,9]'),
                         ('[7.1,5,6.3]'),
                         ('[9,7,8]');
```

