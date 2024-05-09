package oracle.jdbc.vector.examples.cohere;

import oracle.jdbc.vector.examples.SimilaritySearch;

/**
 * Runs an interactive similarity search using Oracle Database and
 * {@linkplain CohereModel Cohere}. Please see the README.md for values that
 * must be configured to run this example.
 */
public class CohereSimilaritySearch {

  public static void main(String[] args) {
    SimilaritySearch.run(CohereModel.INSTANCE);
  }

}
