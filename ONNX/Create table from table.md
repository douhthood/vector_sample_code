# Create a table from a table

This technique is simple and can give the best performance when combined with parallel query and no logging.

Create a new table based on the existing data and create vectors on the fly

```SQL
CREATE TABLE my_data2 as SELECT
  id,
  str,
  vector_embedding(doc_model using str as data) as v
FROM my_data;
```
