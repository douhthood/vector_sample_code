# Code Examples for ONNX
This module contains Java code examples that integrate Oracle Database with the
[ONNX Runtime](https://onnxruntime.ai/).

[OnnxModel.java](src/main/java/oracle/jdbc/vector/examples/onnx/OnnxModel.java)
generates vector embeddings using the ONNX Runtime. This class implements a
`Model` interface that is recognized by code examples in
the [common module](../ojdbc-vector-examples-common). The common module is where
you'll find code that integrates with Oracle Database.

## PLEASE READ: Installing ONNX Runtime Extensions 
These examples depend on the
[ONNX Runtime Extensions](https://github.com/microsoft/onnxruntime-extensions/tree/main).
As of February 2024, [the Java build is not available on Maven Central](https://github.com/microsoft/onnxruntime-extensions/issues/597
). The issue is expected to be resolved soon, but until then users will need to
build locally. [A bash script](install-extensions.sh) is provided to help with
that.

## Configuration
To run the examples, users must [configure the following values](../README.md#configuration):
<dl><dt>
MODEL_PATH
</dt><dd>
File system path to an ONNX model. Example:
<code>/users/michael/models/BERT-TINY.onnx</code>
</dd></dl>

__Additional configuration for connecting to Oracle Database is
[defined in the common module](../ojdbc-vector-examples-common/README.md#configuration).__