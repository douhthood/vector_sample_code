# Node.js Vector Demos

This set of Node.js demos provides samples that run embedding model-based
similarity searches with the VECTOR datatype introduced in Oracle Database 23.4.

For Node.js, Cohere and OpenAI have API support along with ONNX Runtime.
The sample code uses embedding models from Cohere, OpenAI and
Hugging Face [via the ONNX Runtime].


## Common pre-requisites

Ensure that Node.js (14.6 or later) and npm is installed in your system.

Set the following environment variables:

    NODE_ORACLEDB_USER     # Database Username 
    NODE_ORACLEDB_PASSWORD # Database Password
    NODE_ORACLEDB_CONNECTSTRING # Oracle Database TNS Connect String or Easy Connect Plus Connect String

The following Node.js modules must be installed:

    npm install oracledb

## Pre-requisites for Cohere

Create an account in http://www.cohere.com and generate your API Key.
Set the following environment variable:

    CO_API_KEY   # For Cohere-based Similarity search, get the API Key from cohere.com

The following Node.js module is to be installed:

    npm install cohere-ai # For Cohere support

If you are running behind a firewall or a corporate HTTP/HTTPS proxy, you need
to install global-agent module to connect to Cohere through the proxy for
running the embedding models and similarity searches.

    npm install global-agent

For the proxy settings, we need to set the environment variable
GLOBAL_AGENT_HTTP_PROXY to the proxy URL:

    GLOBAL_AGENT_HTTP_PROXY=http://myproxy.company.com:<port_number> 

## Pre-requisites for OpenAI

Create an account in https://platform.openai.com/api-keys and generate your
API Key.

Set the following environment variable:

    OPENAI_API_KEY   # For OpenAI-based similarity search, get the API Key from openai.com

The following Node.js module is to be installed:

    npm install openai # For openAI support

If you are running behind a firewall or a corporate HTTP/HTTPS proxy, you need
to install global-agent module to connect to Cohere through the proxy for
running the embedding models and similarity searches.

    npm install global-agent

For the proxy settings, we need to set the environment variable
GLOBAL_AGENT_HTTP_PROXY to the proxy URL:

    GLOBAL_AGENT_HTTP_PROXY=http://myproxy.company.com:<port_number> 

## Pre-requisites for Hugging Face Xenova Transformers

The Hugging Face Xenova transformers.js embedding models enable the creation
of vectors.
The Xenova transformers use the ONNX Runtime to be similar to the Hugging Face
Python-based Transformers library.

Note: Hugging Face Transformers require Node.js 18 and above.

See https://huggingface.co/docs/transformers.js/index for details.

The following Node.js module is to be installed:

    npm install @xenova/transformers # For HF transformers support

If you are running behind a firewall or a corporate HTTP/HTTPS proxy, you need
to install global-agent module to connect to Cohere through the proxy for
running the embedding models and similarity searches.

    npm install global-agent

For the proxy settings, you need to set the environment variable
GLOBAL_AGENT_HTTP_PROXY to the proxy URL:

    GLOBAL_AGENT_HTTP_PROXY=http://myproxy.company.com:<port_number>

## Running the samples

Run the sample files in the following order depending on the library using the
`node` command:
- *createSchema.js* (To setup the tables)
- *vectorizeTableCohere.js*/*vectorizeTableOpenAI.js*/*vectorizeHFTransformers.js* (Embed Vectors)
- *similaritySearchCohere.js*/*similarityOpenAI.js*/*similaritySearchHFTransformers.js* (Similarity Search)

E.g.,

    node vectorizeTableCohere.js

## Batch Vectorization

Batch vectorzation speeds up the vectorization process and is efficient for
very large datasets. Batch vectorization with Cohere, OpenAI and Hugging Face
Transformers have been implemented in:
- *batchVectorizeTableCohere.js*
- *batchVectorizeTableOpenAI.js*
- *batchVectorizeTableHFTransformers.js*

The table to be vectorized in the batch vectorization files is set in the
following line:

    const tableName = 'batch'; // Add the table to be vectorized


The Node.js demos provided here, run in the 'Thin' mode of node-oracledb by
default. The Thin mode does not require Oracle Client libraries to connect to
Oracle Database. If you require to use Oracle Client libraries, please enable
'Thick' mode by following the instructions in the node-oracledb documentation below:
https://node-oracledb.readthedocs.io/en/latest/user_guide/initialization.html#enabling-node-oracledb-thick-mode 
