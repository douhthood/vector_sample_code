import os
import oracledb
import array
import gensim
from gensim.test.utils import get_tmpfile

connection = oracledb.connect(
    user="vector",
    password="vector",
    dsn="freepdb1"
    )
print("Connected to the Oracle database\n")

model_file = "text8.doc2vec"
#model_file = "dm-wiki.doc2vec"

print("Load the Doc2Vec model")
model = gensim.models.doc2vec.Doc2Vec.load(model_file)
print("Loaded the Doc2Vec model")

print("Similarity Search using Doc2Vec")

cursor = connection.cursor()

# The Doc2Vec model works best with the DOT product distance function
q1 = 'select info '
q2 = 'from my_data '
q3 = 'order by vector_distance(v, :1, COSINE) '
q4 = 'fetch first 3 rows only'
query = q1 + q2 + q3 + q4

while (True):

  # Get the input text to vectorize
  text = input("\nEnter a phrase. Type quit to exit : ")

  if ((text == 'quit') or (text == 'exit')):
      break

  if (text == ''):
      continue

  print(text)

  # Get the words from a sentence
  tokens = gensim.utils.simple_preprocess(text)

  # Create a vector, given the list of words
  vec = list(model.infer_vector(tokens, alpha=0.001, epochs = 50))

  # Convert to array format
  vec2   = array.array('d', vec)

  # Do the Similarity Search
  cursor.execute(query, [vec2])
  for row in cursor:
     print(row)


connection.close()
print("\nDisconnected from the Oracle database")

