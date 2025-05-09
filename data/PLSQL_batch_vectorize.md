# Use batch updates to vectorize your data

```
SQL
set serveroutput on;
set timing on;

declare

  type my_dat_rec is record (
    id     my_data.id%TYPE,
    info   my_data.info%TYPE
  );

  type my_dat_t is table of my_dat_rec
    index by PLS_INTEGER;

  l_my_dat   my_dat_t;
  c_limit    PLS_INTEGER := 10.0;
  start_id   NUMBER      := 0;
  num_rows   NUMBER      := 0;
  iterations NUMBER      := 0;

  cursor c is
  select
    id, info
  from my_data
  order by id;

begin

  -- Find the minimum ID and the number of rows
  select min(id), count(id)
  into start_id, num_rows
  from my_data;

  -- Determine the number of batches
  iterations := ceil(num_rows / c_limit );

  open c;

  loop

    -- Get a batch of rows
    fetch c
    bulk collect into l_my_dat
    limit c_limit;

    exit when l_my_dat.COUNT = 0;

    -- Show the data, this will slow things down for large datasets
    for i in 1 .. l_my_dat.COUNT loop
      dbms_output.put( l_my_dat(i).id || ', ');
      dbms_output.put_line( l_my_dat(i).info );
    end loop;

    -- Update the vectors for the batch
    forall j in 1 .. l_my_dat.COUNT

      update my_data
      set v = vector_embedding(doc_model using l_my_dat(j).info as data)
      where id = l_my_dat(j).id;

      -- Commit the batch
      commit;

  end loop;

  -- Commit any leftovers
  commit;

  close c;

end;
/
```
