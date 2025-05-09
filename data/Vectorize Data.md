# Vectorize the text in table my_data 

Use ONNX in the database to vectorize the data:
- [Download a pre-built Augmented ONNX embedding model](../ONNX/Download%20prebuilt%20Augmented%20ONNX%20file.md)
- [Load the embedding model into Oracle Database 23ai](../ONNX/Load%20the%20ONNX%20model.md)

There are three main techniques to bulk vectorize data in tables:
- [Create Table As Select](../data/Create%20Table%20As%20Select.Md)
- [Insert as select](../data/Insert%20As%20Select.md)
- [PLSQL batch updates](../data/PLSQL_batch_vectorize.md)


**Create table as Select** and **Insert as Select** tend to have similar performance.  You can use **Parallel Query** to dramatically increase the throughput of Create table as Select and Insert as Select.  These operations tend to be CPU bound as creating vectors is CPU intensive.  You need to have sufficient CPU cores to be able to effectively scale the throughput.

Using PLSQL batches, [even with many concurrent sessions], tends to not be as fast as using Create Table As Select or Insert As Select.

Now view your newly created vectors:

```SQL
set pages 999
set long 9999

Select id, v
from my_data
order by 1;
```

The floating point values for the vectors do not mean anything to humans, but they represent the meaning or semantics of the **text/image/audio/video/DNA** column for that row.

