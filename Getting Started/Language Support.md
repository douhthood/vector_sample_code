# Language Support in Oracle AI Vector Search

<img src="images/languages.png" width="384" alt="Languages"/>

All Oracle SQL drivers which can use SQL or PLSQL can support vectors via the following:
- SQL functions
  - vector_embedding
  - [vector_distance](https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/vector_distance.html#GUID-BA4BCFB2-D905-43DC-87B0-E53522CF07B7)
  - [to_vector](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/23/vecse&id=SQLRF-GUID-2CCAB607-A28B-43F7-A71D-9800C0B9A380)
  - [from_vector](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/23/vecse&id=SQLRF-GUID-AA60B3CB-FCB7-4944-9E06-976C272855B1)
- PLSQL packages
  - DBMS_VECTOR
  - DBMS_VECTOR_CHAIN
