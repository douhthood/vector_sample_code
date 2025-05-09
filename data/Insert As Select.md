# Use Insert As Select

Using Insert as select can be very efficient when used with parallel query to maximize the throuhput of bulk vectorizaton.  You need to have sufficient CPU cores to be able to benefit from a high degree of parallelism. 

You need to have an ONNX vector embedding model loaded for this to work:
- [Download a pre-built Augmented ONNX embedding model](../ONNX/Download%20prebuilt%20Augmented%20ONNX%20file.md)
- [Load the embedding model into Oracle Database 23ai](../ONNX/Load%20the%20ONNX%20model.md)

```SQL
create table my_data2 as
select 
  id, 
  info,
  vector_embedding(doc_model using m.info as data) v
from my_data m;
```
