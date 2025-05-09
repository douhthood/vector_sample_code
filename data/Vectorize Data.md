# Vectorize the text in table my_data 

Use ONNX in the database to vectorize the data:
- [Download a pre-built Augmented ONNX embedding model](../ONNX/Download%20prebuilt%20Augmented%20ONNX%20file.md)
- [Load the embedding model into Oracle Database 23ai](../ONNX/Load%20the%20ONNX%20model.md)

There are three main techniques to bulk vectorize data in tables:
- Create Table As Select
- Insert as select
- [PLSQL batch updates](../data/PLSQL_batch_vectorize.md)

The table is small, so all the vector columns can be updated in a single transaction.


Now see the newly created vectors:

```SQL
set pages 999
set long 9999

Select id, v
from my_data
order by 1;
```

The floating point values for the vectors do not mean anything to humans, but they represent the meaning or semantics of the INFO column for that row.

