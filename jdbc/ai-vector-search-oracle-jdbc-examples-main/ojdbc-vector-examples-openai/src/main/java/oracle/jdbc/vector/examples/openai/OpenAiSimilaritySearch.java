package oracle.jdbc.vector.examples.openai;

import oracle.jdbc.vector.examples.SimilaritySearch;

/**
 * Runs an interactive similarity search using Oracle Database and
 * {@linkplain OpenAiModel OpenAI}. Please see the README.md for values that
 * must be configured to run this example.
 */
public class OpenAiSimilaritySearch {

  public static void main(String[] args) {
    SimilaritySearch.run(OpenAiModel.INSTANCE);
  }

}
