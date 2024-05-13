# Vectorize more data using vector_embeding

In this example, we will first create a table without the vectors:
- [Create table and load data](Insert%20more%20data.md)

<br>

There are multiple ways to vectorize the data:
- [Create a new table based on the existing table](Create%20table%20from%20table.md)
- [Use a PLSQL cursor and do batch updates](PLSQL%20batch%20update.md)
- [Use a stored procedure for batch updates](PLSQL%20stored%20procedure.md)

<br>

## Now we can do the Similarity Search using SqlPlus and PLSQL

Use SqlPlus for Similarity Search - **Part 1 - Get the query string**

```SQL
ACCEPT text_input CHAR PROMPT 'Enter text: '
```

Use SqlPlus for Similarity Search - **Part 2 - Run the Similarity Search** 

```SQL
VARIABLE text_variable VARCHAR2(1000)
VARIABLE query_vector VECTOR
BEGIN
  :text_variable := '&text_input';
  SELECT vector_embedding(doc_model using :text_variable as data) into :query_vector;
END;
/
 
SELECT info
FROM my_data2
ORDER BY VECTOR_DISTANCE(v, :query_vector, COSINE)
FETCH APPROX FIRST 5 ROWS ONLY; 
```
