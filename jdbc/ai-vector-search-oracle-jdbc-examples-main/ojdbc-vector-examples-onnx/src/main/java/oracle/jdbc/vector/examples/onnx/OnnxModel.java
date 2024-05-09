package oracle.jdbc.vector.examples.onnx;

import ai.onnxruntime.OnnxTensor;
import ai.onnxruntime.OrtEnvironment;
import ai.onnxruntime.OrtException;
import ai.onnxruntime.OrtSession;
import ai.onnxruntime.extensions.OrtxPackage;
import oracle.jdbc.vector.examples.Config;
import oracle.jdbc.vector.examples.Model;

import java.nio.FloatBuffer;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * Model which uses the ONNX Runtime for Java to generate embeddings.
 */
final class OnnxModel implements Model {

  /** Singleton instance of this class */
  static final OnnxModel INSTANCE = new OnnxModel();
  private OnnxModel() { }

  /**
   * File system path to a .onnx format model.
   */
  private static final String MODEL_PATH = Config.get("MODEL_PATH");

  private static final OrtEnvironment ENVIRONMENT =
    OrtEnvironment.getEnvironment();

  private static final OrtSession SESSION;
  static {
    try {
      // Options are used to register the ONNX Runtime Extensions for Java
      OrtSession.SessionOptions options = new OrtSession.SessionOptions();
      options.registerCustomOpLibrary(OrtxPackage.getLibraryPath());
      SESSION = ENVIRONMENT.createSession(MODEL_PATH, options);
    }
    catch (OrtException ortException) {
      throw new RuntimeException(ortException);
    }
  }

  @Override
  public float[][] embed(String[] sentences) {
    float[][] embeddings = new float[sentences.length][];

    // An ONNX session is run to yield a result for an input tensor. The
    // session, tensor, and result are all resources which MUST be closed.
    try (OnnxTensor inputTensor =
           OnnxTensor.createTensor(ENVIRONMENT, sentences)) {

      // The input to ONNX is a Map of named tensors. Our model simply has one
      // input named "input".
      Map<String, OnnxTensor> inputs = new HashMap<>(1);
      inputs.put("input", inputTensor);

      try (OrtSession.Result result = SESSION.run(inputs)) {

        // The output from ONNX is a single tensor. The tensor exposes a single
        // flattened FloatBuffer that contains the embeddings for each sentence
        // of the input tensor.
        OnnxTensor outputTensor = (OnnxTensor) result.get(0);
        int embeddingLength =
          Math.toIntExact(outputTensor.getInfo().getShape()[1]);
        FloatBuffer embeddingBuffer = outputTensor.getFloatBuffer();

        for (int i = 0; i < sentences.length; i++) {
          float[] embedding = new float[embeddingLength];
          embeddingBuffer.get(embedding);
          embeddings[i] = embedding;
        }
      }

      return embeddings;
    }
    catch (OrtException ortException) {
      throw new RuntimeException(ortException);
    }
  }
}
