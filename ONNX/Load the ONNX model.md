# Load the ONNX model into Oracle Database 23ai

The Augumented ONNX file needs to be securely loaded into Oracle Database 23ai.

As the PDP SYS user, grant some privileges to a user and create a directory object for the ONNX file.

```SQL
sqlplus sys@localhost:1521/freepdb1 as sysdba

grant create mining model to vector;
create or replace directory DM_DUMP as '/home/oracle/omlutil';
grant read on directory dm_dump to vector;
exit
```

As the vector user, load the ONNX model into Oracle Database 23ai and name it **doc_model***.

```SQL
sqlplus vector/vector@freepdb1
EXECUTE DBMS_VECTOR.LOAD_ONNX_MODEL( 'DM_DUMP', 'all-MiniLM-L6-v2.onnx', 'doc_model', JSON('{"function" : "embedding", "embeddingOutput" : "embedding", "input": {"input": ["DATA"]}}'));
```

Create a vector via the vector_embedding SQL function

```SQL
SET PAGES 999
SELECT VECTOR_EMBEDDING(doc_model USING 'hello' as data) AS embedding;
```
