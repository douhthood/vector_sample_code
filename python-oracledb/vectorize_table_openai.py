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
# Add or update the vectors for all data values in a table
# Use the OpenAI text-embedding-ada-002 model to create the vectors
#

import os
import sys
import array

import oracledb
import openai
import time

un = os.getenv("PYTHON_USERNAME")
pw = os.getenv("PYTHON_PASSWORD")
cs = os.getenv("PYTHON_CONNECTSTRING")

# Get your OpenAI API Key from the environment
openai.api_key = os.getenv("OPENAI_API_KEY")
if openai.api_key:
    print('Using OPENAI_API_KEY')
else:
    print('\nYou need to set your OpenAI API KEY\n')
    print('https://openai.com/pricing')
    print('export OPENAI_API_KEY=whatever_your_api_key_value_is\n')
    exit();

embedding_model = "text-embedding-3-small"
#embedding_model = "text-embedding-3-large"
#embedding_model = "text-embedding-ada-002"

print("Using embedding model " + embedding_model)

query_sql = """select id, info
               from my_data
               order by 1"""

update_sql = """update my_data set v = :1
                where id = :2"""

# Connect to Oracle Database 23.4
with oracledb.connect(user=un, password=pw, dsn=cs) as connection:
    db_version = tuple(int(s) for s in connection.version.split("."))[:2]
    if db_version < (23, 4):
        sys.exit("This example requires Oracle Database 23.4 or later")
    print("Connected to Oracle Database\n")

    with connection.cursor() as cursor:
        print("Vectorizing the following data:\n")

        # Loop over the rows and vectorize the VARCHAR2 data
        binds = []
        tic = time.perf_counter()
        for id_val, info in cursor.execute(query_sql):
            # Convert to format that OpenAI wants
            data = [info]

            print(info)

            # Create the vector embedding [a JSON object]
            response = openai.Embedding.create(
                model=embedding_model, input=data
            )

            # Extract the vector from the JSON object
            vec = response["data"][0]["embedding"]

            # Convert to array format
            vec2 = array.array("f", vec)

            # Record the array and key
            binds.append([vec2, id_val])

        toc = time.perf_counter()

        # Do an update to add or replace the vector values
        cursor.executemany(
            update_sql,
            binds,
        )
        connection.commit()

        print(f"\nVectors took {toc - tic:0.3f} seconds")
        print(f"Added {len(binds)} vectors to the table")
