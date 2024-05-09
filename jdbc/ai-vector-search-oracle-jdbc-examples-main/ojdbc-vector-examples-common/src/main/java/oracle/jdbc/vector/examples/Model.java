package oracle.jdbc.vector.examples;

/**
 * A machine learning (ML) model which generates a vector embedding for
 * sentences in a natural language. Implementations of this interface use
 * a particular model and a particular library or remote service to generate
 * the embedding.
 */
public interface Model {

  /**
   * Returns embeddings for the given <code>sentences</code>. In the returned
   * array, the <code>float[]</code> at index <i>n</i> is the embedding for
   * the sentence at index <i>n</i> in the given array of
   * <code>sentences</code>.
   *
   * @param sentences Sentences to embed. Not null. Not containing null.
   * @return Embeddings for the sentences. Not null. Not containing null.
   */
  float[][] embed(String[] sentences);

}
