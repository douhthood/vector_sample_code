# Create vectors via the vector_embedding SQL function

Create a vector via the vector_embedding SQL function using 'hello' as the input

```SQL
SET PAGES 999
SELECT VECTOR_EMBEDDING(doc_model USING 'hello' as data) AS embedding;
```

The first paramter to the vector_embedding SQL function is the name of the model that you loaded into Oracle 23ai.
You can load multiple different ONNX embedding models at the same time.  Make sure that you can uniquely identify each model.

The second parameter to the vector_embedding SQL function is the input text.  This text could be a literal string or a table column name. 

Create a vector via the vector_embedding SQL function using 'The quick brown fox' as the input

```SQL
SELECT VECTOR_EMBEDDING(doc_model USING 'The quick brown fox' as data) AS embedding;
```
