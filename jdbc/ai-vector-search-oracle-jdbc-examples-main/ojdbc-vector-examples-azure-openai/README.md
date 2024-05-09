# Code Examples for Azure OpenAI
This module contains Java code examples that integrate Oracle Database with 
[OpenAI](https://openai.com/).

[AzureOpenAiModel.java](src/main/java/oracle/jdbc/vector/examples/azureopenai/AzureOpenAiModel.java)
generates vector embeddings using the OpenAI API. This class implements a
`Model` interface that is recognized by code examples in
the [common module](../ojdbc-vector-examples-common). The common module is where
you'll find code that integrates with Oracle Database.

Examples in this module use the Microsoft maintained 
[azure-ai-openai](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/openai/azure-ai-openai)
library. Please note that the
[ojdbc-vector-examples-openai](../ojdbc-vector-examples-openai) module contains
code examples which use an alternative community maintained client library.

## Configuration
To run the examples, users must [configure the following values](../README.md#configuration):
<dl><dt>
OPENAI_API_KEY
</dt><dd>
<a href="https://platform.openai.com/api-keys">
API key for the OpenAI platform
</a>. Create an account to get one (there's a free trial).
</dd><dt>
OPENAI_MODEL
</dt><dd>
The name of an 
<a href="https://platform.openai.com/docs/guides/embeddings/embedding-models">
OpenAI embedding model
</a>.<br><i>
Configuring this is optional. The text-embedding-ada-002 model will be 
used if no value is configured.
</i></dd></dl>

__Additional configuration for connecting to Oracle Database is
[defined in the common module](../ojdbc-vector-examples-common/README.md#configuration).__