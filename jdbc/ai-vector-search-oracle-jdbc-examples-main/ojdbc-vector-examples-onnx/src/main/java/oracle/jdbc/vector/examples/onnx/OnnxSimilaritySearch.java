package oracle.jdbc.vector.examples.onnx;

import oracle.jdbc.vector.examples.SimilaritySearch;

/**
 * Runs an interactive similarity search using Oracle Database and
 * {@linkplain OnnxModel ONNX}. Please see the README.md for values that
 * must be configured to run this example.
 */
public class OnnxSimilaritySearch {

  public static void main(String[] args) {
    SimilaritySearch.run(OnnxModel.INSTANCE);
  }

}
