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
# Basic Similarity Search using the Sentence Transformers embedding models
#

import os
import sys
import array
import time

import oracledb
from sentence_transformers import SentenceTransformer
from sentence_transformers import CrossEncoder

un = os.getenv("PYTHON_USERNAME")
pw = os.getenv("PYTHON_PASSWORD")
cs = os.getenv("PYTHON_CONNECTSTRING")

# topK is how many rows to return
topK = 5

# Re-ranking is about potentially improving the order of the resultset
# Re-ranking is significantly slower than doing similarity search
# Re-ranking is optional
rerank = 0

sql = """select info
         from my_data
         order by vector_distance(v, :1, COSINE)
         fetch APPROX first :2 rows only"""

# English embedding models
embedding_model = "sentence-transformers/all-MiniLM-L6-v2"
#embedding_model = "sentence-transformers/all-MiniLM-L12-v2"
#embedding_model = "sentence-transformers/paraphrase-MiniLM-L3-v2"
#embedding_model = "sentence-transformers/all-mpnet-base-v2"
#embedding_model = "sentence-transformers/all-distilroberta-v1"
#embedding_model = "BAAI/bge-small-en-v1.5"
#embedding_model = "BAAI/bge-base-en-v1.5"
#embedding_model = "sentence-transformers/average_word_embeddings_glove.6B.300d"
#embedding_model = "sentence-transformers/average_word_embeddings_komninos"
#embedding_model = "nomic-ai/nomic-embed-text-v1"

# Multi-lingual embedding models
#embedding_model = "BAAI/bge-m3"
#embedding_model = "intfloat/multilingual-e5-large"
#embedding_model = "intfloat/multilingual-e5-base"
#embedding_model = "intfloat/multilingual-e5-small"
#embedding_model = "paraphrase-multilingual-mpnet-base-v2"
#embedding_model = "distiluse-base-multilingual-cased-v2"
#embedding_model = "stsb-xlm-r-multilingual"

# English re-rankers
rerank_model = "cross-encoder/ms-marco-TinyBERT-L-2-v2"
#rerank_model = "cross-encoder/ms-marco-MiniLM-L-2-v2"
#rerank_model = "cross-encoder/ms-marco-MiniLM-L-6-v2"
#rerank_model = "cross-encoder/ms-marco-MiniLM-L-12-v2"
#rerank_model = "BAAI/bge-reranker-base"
#rerank_model = "BAAI/bge-reranker-large"

# Multi-lingual re-rankers
#rerank_model = "jeffwan/mmarco-mMiniLMv2-L12-H384-v1"
#rerank_model = "cross-encoder/msmarco-MiniLM-L6-en-de-v1"

print("Using embedding model " + embedding_model)
if rerank:
  print("Using reranker " + rerank_model)

print("TopK = " + str(topK))

model = SentenceTransformer(embedding_model, trust_remote_code=False)

# Connect to Oracle Database 23.4
with oracledb.connect(user=un, password=pw, dsn=cs) as connection:
    db_version = tuple(int(s) for s in connection.version.split("."))[:2]
    if db_version < (23, 4):
        sys.exit("This example requires Oracle Database 23.4 or later")
    print("Connected to Oracle Database\n")

    with connection.cursor() as cursor:

        while True:
            # Get the input text to vectorize
            text = input("\nEnter a phrase. Type quit to exit : ")

            if (text == "quit") or (text == "exit"):
                break

            if text == "":
                continue

            tic = time.perf_counter()

            # Create the embedding and extract the vector
            embedding = list(model.encode(text))

            toc = time.perf_counter()
            print(f"\nVectorize query took {toc - tic:0.3f} seconds")

            # Convert to array format
            vec = array.array("f", embedding)

            docs  = []
            cross = []

            tic = time.perf_counter()

            # Do the Similarity Search
            for (info,) in cursor.execute(sql, [vec, topK]):

                # Remember the SQL data resultset
                docs.append(info)

                if rerank == 1:

                  # create the query/data pair needed for cross encoding
                  tup = []
                  tup.append(text)
                  tup.append(info)
                  cross.append(tup)

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
              ce = CrossEncoder(rerank_model, max_length=512)
              ce_scores = ce.predict(cross)

              toc = time.perf_counter()
              print(f"Rerank took {toc - tic:0.3f} seconds")

              # Create the unranked list of ce_scores + data
              unranked = []
              for idx in range(topK):

                  tup2 = []
                  tup2.append(ce_scores[idx])
                  tup2.append(docs[idx])
                  unranked.append(tup2)

              # Create the reranked list by sorting the unranked list
              reranked = sorted(unranked, key=lambda foo: foo[0], reverse=True)

              print("\nReRanked results:")
              print("=================")
              for idx in range(topK):
                  x = reranked[idx]
                  print(x[1])

