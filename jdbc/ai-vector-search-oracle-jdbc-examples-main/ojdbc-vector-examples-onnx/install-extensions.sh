#!/bin/bash
# Installs the ONNX Runtime Extensions for Java. It is installed as a jar file
# in the local Maven repository/cache of this device.
#
# As of February 2024, the extensions are not published to Maven Central. There
# is an open issue to resolve that:
# https://github.com/microsoft/onnxruntime-extensions/issues/597
# This script is just a stop-gap solution until the issue above is resolved.
# USERS SHOULD ABANDON THIS SCRIPT AND INSTEAD PULL THE BUILD FROM MAVEN
# CENTRAL, WHEN IT BECOMES POSSIBLE TO DO SO.
#
# Requirements:
# 1. Download and install CMake: https://cmake.org/
# 2. Add CMake to the PATH.
#      2.1 Open the CMake application.
#      2.2 From menu bar: Tools -> How to Install for Command Line Use
#      2.3 Run the provided commands
# 3. Download and install Python: https://www.python.org/

# Get the code
temp=$(mktemp -d)
cd $temp
git clone https://github.com/microsoft/onnxruntime-extensions.git --branch v0.10.0

# Compile the code
cd onnxruntime-extensions
./build.sh -DOCOS_BUILD_JAVA=ON

# Install the compiled code
mvn install:install-file -Dfile=java/build/libs/onnxruntime-extensions-0.10.0.jar -DgroupId=com.microsoft.onnxruntime -DartifactId=onnxruntime-extensions -Dversion=0.10.0 -Dpackaging=jar -DgeneratePom=true

