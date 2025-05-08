# ONNX Support in Oracle AI Vector Search

You can create vectors in Oracle Database 23ai via the [vector_embedding](https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/vector_embedding.html#GUID-5ED78260-6D21-4B6B-86E0-A1E70EFA11CA) SQL function.

The vector_embedding SQL function has two input parameters:
- The vector **embedding model**
- The **expression or column name** as the data to embed

The **output** of the vector_embedding SQL function is the **vector**.

<br>

Setup for using the vector_embedding SQL function
- [Download a pre-built Augmented ONNX file](../ONNX/Download%20prebuilt%20Augmented%20ONNX%20file.md)
- [Load the embedding model into Oracle Database 23ai](../ONNX/Load%20the%20ONNX%20model.md)
- [Create a vector via the vector_embedding SQL function](../ONNX/Create%20vector%20via%20vector_embedding.md)
