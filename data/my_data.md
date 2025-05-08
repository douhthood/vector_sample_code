# Create a table and load some data

```SQL
create table my_datainsert (
  id   number primary key,
  info varchar2(128),
  v    vector
);
```

Now insert some test data that we can vectorize.


```SQL
insert into my_data values (1, 'San Francisco is in California.', NULL);
insert into my_data values (2, 'San Jose is in California.', NULL);
insert into my_data values (3, 'Los Angeles is in California.', NULL);
insert into my_data values (4, 'Buffalo is in New York.', NULL);
insert into my_data values (5, 'Brooklyn is in New York.', NULL);
insert into my_data values (6, 'Queens is in New York.', NULL);
insert into my_data values (7, 'Harlem is in New York.', NULL);
insert into my_data values (8, 'The Bronx is in New York.', NULL);
insert into my_data values (9, 'Manhattan is in New York.', NULL);
insert into my_data values (10, 'Staten Island is in New York.', NULL);
insert into my_data values (11, 'Miami is in Florida.', NULL);
insert into my_data values (12, 'Tampa is in Florida.', NULL);
insert into my_data values (13, 'Orlando is in Florida.', NULL);
insert into my_data values (14, 'Dallas is in Texas.', NULL);
insert into my_data values (15, 'Huston is in Texas.', NULL);
insert into my_data values (16, 'Austin is in Texas.', NULL); 
insert into my_data values (17, 'Phoenix is in Arizona.', NULL); 
```
