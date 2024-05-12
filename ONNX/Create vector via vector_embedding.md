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

In this example, we will create a table with some data and then vectorize it.

```SQL
CREATE TABLE vec1 (
  id  NUMBER PRIMARY KEY,
  str VARCHAR2(128),
  v   VECTOR
);

INSERT INTO vec1 (id, str) VALUES (1, 'The quick brown fox jumped over the lazy dog');
INSERT INTO vec1 (id, str) VALUES (2, 'The rain stays mainly on the plains');
INSERT INTO vec1 (id, str) VALUES (3, 'She sells sea shells on the sea shore');
INSERT INTO vec1 (id, str) VALUES (4, 'Humpty Dumpty sat on a wall');
INSERT INTO vec1 (id, str) VALUES (5, 'Humpty Dumpty had a great fall');
INSERT INTO vec1 (id, str) VALUES (6, 'Was Humpty Dumpty an egg?');
INSERT INTO vec1 (id, str) VALUES (7, 'Eggs are egg shaped');
INSERT INTO vec1 (id, str) VALUES (8, 'Mary had a little lamb');
INSERT INTO vec1 (id, str) VALUES (9, 'Its fleece was white as snow');
INSERT INTO vec1 (id, str) VALUES (10, 'Did Mary have any sea shells?');

COMMIT;
```

Create a vector for the str column with id = 2.

```SQL
SELECT VECTOR_EMBEDDING(doc_model USING str as data) AS embedding
FROM vec1
WHERE id = 2;
```

Create vectors for all of the str columns.

```SQL
SELECT VECTOR_EMBEDDING(doc_model USING str as data) AS embedding
FROM vec1;
```

Create multiple vectors, one for each of the str columns, and for the string 'Hello'

```SQL
SELECT
  VECTOR_EMBEDDING(doc_model USING str as data) AS str_embedding,
  VECTOR_EMBEDDING(doc_model USING 'Hello' as data) AS hello_embedding
FROM vec1;
```

Create a table based on an existing table with the vectors created on the fly

```SQL
CREATE TABLE vec2 as
SELECT
  id,
  str,
  VECTOR_EMBEDDING(doc_model USING str as data) as v
FROM vec1;
```

Insert a new row creating the vector on the fly

```SQL
INSERT INTO vec2 values (11, 'Eggs can be brown or white', VECTOR_EMBEDDING(doc_model USING 'Eggs can be brown or white' as data) );
```

Use PLSQL to create a vector

```SQL
SET SERVER OUTPUT ON;

DECLARE
  vec VECTOR;

BEGIN
  SELECT VECTOR_EMBEDDING(doc_model USING 'Eggs' as data) INTO vec;

  vec := VECTOR_EMBEDDING(doc_model USING 'Eggs' as data);
END;
/
```
