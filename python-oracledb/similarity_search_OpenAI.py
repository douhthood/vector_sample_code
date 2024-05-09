# -----------------------------------------------------------------------------
# Copyright (c) 2023, Oracle and/or its affiliates.
#
# This software is dual-licensed to you under the Universal Permissive License
# (UPL) 1.0 as shown at https://oss.oracle.com/licenses/upl and Apache License
# 2.0 as shown at http://www.apache.org/licenses/LICENSE-2.0. You may choose
# either license.
#
# If you elect to accept the software under the Apache License, Version 2.0,
# the following applies:
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# -----------------------------------------------------------------------------
#
# Basic Similarity Search using the Cohere embed-english-light-v3.0 model
#

import os
import sys
import array

import oracledb
import openai
import cohere
import time

un = os.getenv("PYTHON_USERNAME")
pw = os.getenv("PYTHON_PASSWORD")
cs = os.getenv("PYTHON_CONNECTSTRING")

# topK is how many rows to return
topK = 5

# Re-ranking is about potentially improving the order of the resultset
# Re-ranking is significantly slower than doing similarity search
# Re-ranking is optional
rerank = 0

embedding_model = "text-embedding-3-small"
#embedding_model = "text-embedding-3-large"
#embedding_model = "text-embedding-ada-002"

# Cohere ReRanking
rerank_model = "rerank-english-v2.0"
#rerank_model = "rerank-multilingual-v2.0"

print("Using embedding model " + embedding_model)
if rerank:
  print("Using reranking model Cohere " + rerank_model)
else:
  print("Not using reranking")

print("TopK = " + str(topK))

sql = """select info
         from my_data
         order by vector_distance(v, :1, COSINE)
         fetch approx first :2 rows only"""

# Get your OpenAI API Key from the environment
openai.api_key = os.getenv("OPENAI_API_KEY")
if openai.api_key:
    print('Using OPENAI_API_KEY')
else:
    print('\nYou need to set your OpenAI API KEY\n')
    print('https://openai.com/pricing')
    print('export OPENAI_API_KEY=whatever_your_api_key_value_is\n')
    exit();

# Get your Cohere API Key from the environment
# Cohere is used for reranking 
api_key = os.getenv("CO_API_KEY")
if api_key:
    print('Using Cohere CO_API_KEY')
else:
    print('\nYou need to set your Cohere API KEY\n')
    print('https://cohere.com/pricing')
    print('export CO_API_KEY=whatever_your_api_key_value_is\n')
    exit();

co = cohere.Client(api_key)

# Connect to Oracle Database 23.4
with oracledb.connect(user=un, password=pw, dsn=cs) as connection:
    db_version = tuple(int(s) for s in connection.version.split("."))[:2]
    if db_version < (23, 4):
        sys.exit("This example requires Oracle Database 23.4 or later")
    print("Connected to Oracle Database")

    with connection.cursor() as cursor:

        while True:
            # Get the input text to vectorize
            text = input("\nEnter a phrase. Type quit to exit : ")

            if (text == "quit") or (text == "exit"):
                break

            if text == "":
                continue

            sentence = [text]

            tic = time.perf_counter()

            # Create the vector embedding [a JSON object]
            response = openai.Embedding.create(
                model=embedding_model, input=sentence
            )

            toc = time.perf_counter()
            print(f"Vectorize query took {toc - tic:0.3f} seconds")

            # Extract the vector from the JSON object
            vec = response.data[0].embedding
            vec2 = array.array("f", vec)

            docs = []

            tic = time.perf_counter()

            # Do the Similarity Search
            for (info,) in cursor.execute(sql, [vec2, topK]):
                docs.append(info)

            toc = time.perf_counter()
            print(f"Similarity Search took {toc - tic:0.4f} seconds")

            if rerank == 0:

                # Just rely on the vector distance for the resultset order
                print("\nWithout ReRanking")
                print("=================")
                for hit in docs:
                  print(hit)

            else:

              tic = time.perf_counter()

              # ReRank for better results
              results = co.rerank(query=text, 
                                  documents=docs, 
                                  top_n=topK, 
                                  model=rerank_model)

              toc = time.perf_counter()
              print(f"Rerank took {toc - tic:0.3f} seconds")

              print("\nReRanked results:")
              print("=================")
              for hit in results:
                print(docs[hit.index])
