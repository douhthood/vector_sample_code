package oracle.jdbc.vector.examples.azureopenai;

import oracle.jdbc.vector.examples.SimilaritySearch;

/**
 * Runs an interactive similarity search using Oracle Database and
 * {@linkplain AzureOpenAiModel OpenAI}. Please see the README.md for values
 * that must be configured to run this example.
 */
public class AzureOpenAiSimilaritySearch {

  public static void main(String[] args) {
    SimilaritySearch.run(AzureOpenAiModel.INSTANCE);
  }

}
