# Create an Augmented ONNX File

In this example, we will use the popular [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) embedding model from Hugging Face.

In this example, we will create the ONNX file on the same machine as the Oracle Database 23ai Free server.

As the **oracle** Linux user, using a bash shell, set the PATH.
Make sure that Python 3.12+ is being used.

```SQL
export PATH=$ORACLE_HOME/python/bin:$PATH
python -V
```

Unzip the OML4Py zip file and install the Python dependencies

```SQL
unzip omlutils.zip
python -m pip install -r requirements.txt
```

Install the OML4Py Pytohn library

```SQL
python -m pip install omlutils-0.14.0-cp312-cp312-linux_x86_64.whl
```

Run the Python interpreter

```SQL
python
from omlutils import EmbeddingModel, EmbeddingModelConfig
em = EmbeddingModel(model_name="sentence-transformers/all-MiniLM-L6-v2")
em.export2file("all-MiniLM-L6-v2",output_dir=".")
exit()
```

This creates an augmented ONNX file called **all-MiniLM-L6-v2.onnx** in the current working directory.

This file is an AUgmented ONNX file as it has additional preprocessing and postprocessing code:
- The preprocessing includes a tokenizer (eg BERT, SENTENCEPIECE, GPT2 or ROBERTA).
- The post processing includes a weighted average
- The model is also quantized to reduce its size
