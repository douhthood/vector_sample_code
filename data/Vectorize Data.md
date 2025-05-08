# Vectorize the text in table my_data 

Use ONNX in the database to vectorize the data:
- [Download a pre-built Augmented ONNX embedding model](../ONNX/Download%20prebuilt%20Augmented%20ONNX%20file.md)
- [Load the embedding model into Oracle Database 23ai](../ONNX/Load%20the%20ONNX%20model.md)

```SQL
set serveroutput on;
set timing on;

declare

  type my_dat_rec is record (
    id     my_data.id%TYPE,
    info   my_data.info%TYPE
  );

  type my_dat_t is table of my_dat_rec
    index by PLS_INTEGER;

  l_my_dat my_dat_t;

begin

  -- Get the ID and INFO for the table
  select
    id, info
  bulk collect into l_my_dat
  from my_data;

  -- Update all of the vector columns
  for indx in 1 .. l_my_dat.count loop

    dbms_output.put_line( l_my_dat(indx).id );
    dbms_output.put_line( l_my_dat(indx).info );

    -- vectorize each row's info column 
    update my_data
    set v = vector_embedding(doc_model using l_my_dat(indx).info as data)
    where id = l_my_dat(indx).id;

  end loop;

  commit;

end;
/

```

Now insert some test data that we can vectorize.

