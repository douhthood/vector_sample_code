import os
import logging
import time

import oracledb
import array
import gensim
from gensim.test.utils import get_tmpfile

#logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

connection = oracledb.connect(
    user="vector",
    password="vector",
    dsn="freepdb1"
    )
print("Connected to the Oracle database\n")

model_file = "text8.doc2vec"
#model_file = "dm-wiki.doc2vec"

print("Load the Doc2Vec model")
tic = time.perf_counter()
model = gensim.models.doc2vec.Doc2Vec.load(model_file)
toc = time.perf_counter()
print(f"Loaded the Doc2Vec model in {toc - tic:0.4f} seconds")

# Cursor to get the existing data
cursor1 = connection.cursor()

# Cursor to update the vector values
cursor2 = connection.cursor()

# Retrieve the varchar2 data
q1 = 'select id, info '
q2 = 'from my_data '
q3 = 'order by 1 '
myQuery  = q1 + q2 + q3

count = 0

print("\nVectorize the table using doc2vec:\n")

tic = time.perf_counter()

# Get the data to vectorize
cursor1.execute(myQuery)

# Process all of the rows
for row in cursor1:

     # Get the PK value
     id_val = row[0]

     # Get the words from a sentence
     tokens = gensim.utils.simple_preprocess(row[1])

#     print(row[1])

     # Create a vector, given the list of words
     vec = list(model.infer_vector(tokens, alpha=0.001, epochs = 50))

     # Convert to array format
     vec2   = array.array('f', vec)

     # Do an update to add or replace the vector values
     cursor2.execute("update my_data set v = :1 where id = :2",
                     [vec2, id_val])

     count = count + 1

connection.commit()

toc = time.perf_counter()
print(f"Vectors took {toc - tic:0.4f} seconds")
print("Processed " + str(count) + " documents.")

connection.close()
print("\nDisconnected from the Oracle database")

