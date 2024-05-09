# AI Vector Search: Oracle JDBC Code Examples
This repository contains Java code examples which show how to use the AI Vector 
Search feature of Oracle Database via the Oracle JDBC Driver.

## Code Examples
Code examples show how to integrate Oracle Database with different machine 
learning (ML) technologies. These examples require JDK 11 or newer.

The [Common Module](ojdbc-vector-examples-common/README.md) contains code 
examples for AI Vector Search with Oracle Database. This module integrates 
with ML technologies through a `Model` interface.

The [Cohere](ojdbc-vector-examples-cohere/README.md) module implements the `Model` 
interface using the Cohere API.

The [OpenAI](ojdbc-vector-examples-openai/README.md) module implements the `Model`
interface using the OpenAI API. This module uses a community maintained client 
library.

The [Azure OpenAI](ojdbc-vector-examples-azure-openai/README.md) module implements the `Model`
interface using the OpenAI API. This module uses a Microsoft maintained client
library.

The [ONNX](ojdbc-vector-examples-onnx/README.md) module implements the `Model`
interface using the ONNX Runtime.

## Configuration
Each module specifies the configuration it requires. Configuration can be set 
with a `config.properties` file, JVM system properties, or environment 
variables.

An [example-config.properties](example-config.properties) file provides the
template for a `config.properties` file. To use it, create a copy named
`config.properties`:
```shell
cp -i example-config.properties config.properties
```

## Build Instructions
This project can be built with [Maven](https://maven.apache.org/index.html):
```shell
mvn clean install
```

### Missing Dependencies
Maven may fail to resolve dependencies which are not available in the central 
repository.

If ojdbc11 can not be resolved, and you have a copy of the 23.4 build, you can
install it with:
```shell
mvn install:install-file -Dfile=$ORACLE_HOME/jdbc/lib/ojdbc11.jar -DgroupId=com.oracle.database.jdbc -DartifactId=ojdbc11 -Dversion=23.4.0.0 -Dpackaging=jar -DgeneratePom=true
```
If onnxruntime-extensions can not be resolved, please see: [install-extensions.sh](ojdbc-vector-examples-onnx/install-extensions.sh)

## Run Instructions
After building and configuring the project, code examples can be run using 
Maven.

To run similarity search with Cohere:
```shell
mvn exec:java -pl ojdbc-vector-examples-cohere -Dexec.mainClass="oracle.jdbc.vector.examples.cohere.CohereSimilaritySearch"
```
To run similarity search with OpenAI via openai-java:
```shell
mvn exec:java -pl ojdbc-vector-examples-openai -Dexec.mainClass="oracle.jdbc.vector.examples.openai.OpenAiSimilaritySearch"
```
To run similarity search with OpenAI via azure-ai-openai:
```shell
mvn exec:java -pl ojdbc-vector-examples-azure-openai -Dexec.mainClass="oracle.jdbc.vector.examples.azureopenai.AzureOpenAiSimilaritySearch"
```
To run similarity search with the ONNX Runtime:
```shell
mvn exec:java -pl ojdbc-vector-examples-onnx -Dexec.mainClass="oracle.jdbc.vector.examples.onnx.OnnxSimilaritySearch"
```

## Proxies, Firewalls, and VPNs
If a code example hangs or fails to make a network connection, you may need to
configure Java to connect through a proxy server.
Try adding this JVM system property to the `mvn` command:

`-Djava.net.useSystemProxies=true`

If that doesn't work, then try adding these system properties instead:

`-Dhttps.proxyHost=example.com -Dhttps.proxyPort=80`

(Use the host and port of your actual proxy server)

