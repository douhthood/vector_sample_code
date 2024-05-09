# Vector Type

There are multiple ways to define a [vector type](https://docs.oracle.com/en/database/oracle/oracle-database/23/vecse/create-tables-using-vector-data-type.html) in a table:

```SQL
CREATE TABLE vectors (
  id  NUMBER,
  v1  VECTOR,
  v2  VECTOR(3, float32),
  v3  VECTOR(3, float64),
  v4  VECTOR(3, INT8),
  v5  VECTOR(1024, float32),
  v6  VECTOR(*, float32),
  v7  VECTOR(*, float64),
  v8  VECTOR(*, INT8),
  v9  VECTOR(384, *),
  v10 VECTOR(768, *),
  v11 VECTOR(1024, *),
  v12 VECTOR(2048, *),
  v13 VECTOR(4096, *),
  v14 VECTOR(*, *)
);
```
 
