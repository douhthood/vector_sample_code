# Create a table and load some data

```SQL
create table my_datainsert into my_data values (
  id   number primary key,
  info varchar2(128),
  v    vector
);
```

