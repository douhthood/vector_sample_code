# Python Vector Demos

This set of Python demos provides samples that run embedding model-based
similarity searches with the VECTOR datatype introduced in Oracle Database 23.4.

The sample code uses embedding models from Cohere, OpenAI and Sentence Transformers.


## Common pre-requisites

Ensure that Python (3.11 or later) and pip are installed in your system.

Set the following environment variables:

    PYTHON_USERNAME      # Database Username 
    PYTHON_PASSWORD      # Database Password
    PYTHON_CONNECTSTRING # Oracle Database TNS Connect String or Easy Connect Plus Connect String

The following Python modules must be installed:

    python -m pip install oracledb --upgrade


## Pre-requisites for Cohere

Create an account in http://www.cohere.com and generate your API Key.
Set the following environment variable:

    CO_API_KEY   # For Cohere-based Similarity search, get the API Key from cohere.com

The following Python module needs to be installed:

    pip install cohere


## Pre-requisites for OpenAI

Create an account in https://platform.openai.com/api-keys and generate your
API Key.

Set the following environment variable:

    OPENAI_API_KEY   # For OpenAI-based similarity search, get the API Key from openai.com
    

The following Python modules need to be installed:

    pip install openai==0.28.0
    pip install numpy


## Pre-requisites for Hugging Face Sentence Transformers

The Hugging Face Sentence Transformers embedding models enable the creation
of vectors.

The following Python module needs to be installed:

    pip install -U sentence-transformers


## Running the samples

Run the sample files in the following order depending on the library using the
`Python` command:
- *create_schema.py* (To setup the tables)
- *vectorize_table_Cohere.py*/*vectorize_table_openai.py*/*vectorize_table_SentenceTransformers.py* (Embed Vectors)
- *similarity_search_Cohere.py*/*similarity_search_OpenAI.py*/*similarity_search_SentenceTransformers.py* (Similarity Search)

E.g.,

    Python3.11 vectorize_table_SentenceTransformers.py
    Python3.11 similarity_search_SentenceTransformers.py

    Python3.11 vectorize_table_Cohere.py
    Python3.11 similarity_search_Cohere.py

    Python3.11 vectorize_table_openai.py
    Python3.11 similarity_search_OpenAI.py

    

