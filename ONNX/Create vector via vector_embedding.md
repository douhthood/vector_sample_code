# Create vector via the vector_embedding SQL function

Create a vector via the vector_embedding SQL function using 'hello' as the input

```SQL
SET PAGES 999
SELECT VECTOR_EMBEDDING(doc_model USING 'hello' as data) AS embedding;
```
