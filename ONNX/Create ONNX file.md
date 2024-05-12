# Create an Augmented ONNX File

In this example, we will use the popular [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) embedding model from Hugging Face.

In this example, we will create the ONNX file on the same machine as the Oracle Database 23ai Free server.

As the **oracle** Linux user, using a bash shell, set the PATH.
Make sure that Python 3.12+ is being used.

```SQL
export PATH=$ORACLE_HOME/python/bin:$PATH
python -V
```


