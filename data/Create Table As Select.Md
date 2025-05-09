# Use Create Table as Select 

Using create table as select can be very efficient when used with parallel query to maximize the throuhput of bulk vectorizaton.  You need to have sufficient CPU cores to be able to benefit from a high degree of parallelism. 

```SQL
create table my_data2 as
select 
  id, 
  info,
  vector_embedding(doc_model using m.info as data) v
from my_data m;
```
