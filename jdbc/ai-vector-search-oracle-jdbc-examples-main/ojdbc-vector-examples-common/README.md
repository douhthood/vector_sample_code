# Code Examples for AI Vector Search with Oracle Database
This module contains Java code examples for AI Vector Search with Oracle
Database.

The code examples use the Oracle JDBC Driver to execute SQL with the
`VECTOR` data type of Oracle Database. The code examples will also utilize 
functions like `VECTOR_DISTANCE`, which are built-in to Oracle Database.

The code examples are designed to interoperate with different ML technologies
such as Cohere, OpenAI, and ONNX. This happens through a `Model` interface that
is defined in this module. Sibling modules of this project offer specific
implementations of this interface that use a particular technology. For example, 
[OnnxModel.java](../ojdbc-vector-examples-onnx/src/main/java/oracle/jdbc/vector/examples/onnx/OnnxModel.java)
implements `Model` using the ONNX Runtime.

## Configuration
To run the examples, users must [configure the following values](../README.md#configuration):
<dl><dt>
JDBC_URL
<dd>
URL that connects JDBC to a database. Typically, in the form of:
<code>jdbc:oracle:thin:@{host}:{port}/{service-name}</code>
</dd><dt>
JDBC_USER
<dd>
Database username.
</dd><dt>
JDBC_PASSWORD
<dd>
Database password.
</dd></dl>
<i>
Sibling modules define additional configuration that is required for
a particular ML technology. This can be found in the Configuration section of
their README.md document.
</i>

## Database Schema
[Schema.java](src/main/java/oracle/jdbc/vector/examples/Schema.java)
creates a database table named `my_data`. Each row of this table
stores some information in a natural (spoken) language. For instance, a row 
might store this information:
>"San Francisco is in California"

Each row also stores an embedding of their information as a `VECTOR` column. The
`vectorizeTable(Model)` method of `Schema` will populate this column with vector 
embeddings from a given `Model`. The `Model` generates multiple embeddings in a
batch operation, and the embeddings are stored in the database using a single 
batch `UPDATE` command.

## Similarity Search
[SimilaritySearch.java](src/main/java/oracle/jdbc/vector/examples/SimilaritySearch.java)
implements an interactive search function using vector embeddings.

The example prompts the user to enter a search term, and generates an embedding
of the search term using a `Model`. Oracle's built-in `VECTOR_DISTANCE` function
is used to find information that is similar to the user's search term.
