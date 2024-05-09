# Code Examples for Cohere
This module contains Java code examples that integrate Oracle Database with 
[Cohere](https://cohere.com/).

[CohereModel.java](src/main/java/oracle/jdbc/vector/examples/cohere/CohereModel.java)
generates vector embeddings using the Cohere API. This class implements a
`Model` interface that is recognized by code examples in
the [common module](../ojdbc-vector-examples-common). The common module is where
you'll find code that integrates with Oracle Database.

## Configuration
To run the examples, users must [configure the following values](../README.md#configuration):
<dl><dt>
COHERE_API_KEY
</dt><dd>
<a href="https://dashboard.cohere.com/api-keys">
API key for the Cohere service.
</a>
Create an account to get one.
</a> (There's a free trial.)
</dd><dt>
COHERE_MODEL
</dt><dd>
The name of a Cohere embedding model. Supported models are listed in the
"model" section under "BODY PARAMS" in the 
<a href="https://docs.cohere.com/reference/embed">
Embed endpoint specification
</a>.<br> 
<i>
Configuring this is optional. The embed-multilingual-v3.0 model will be 
used if no value is configured.
</i>
</dd></dl>

__Additional configuration for connecting to Oracle Database is
[defined in the common module](../ojdbc-vector-examples-common/README.md#configuration).__