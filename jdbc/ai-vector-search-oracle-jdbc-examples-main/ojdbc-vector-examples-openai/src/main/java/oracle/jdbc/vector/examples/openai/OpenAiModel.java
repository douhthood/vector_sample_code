package oracle.jdbc.vector.examples.openai;

import com.theokanning.openai.OpenAiHttpException;
import com.theokanning.openai.embedding.Embedding;
import com.theokanning.openai.embedding.EmbeddingRequest;
import oracle.jdbc.vector.examples.Config;
import oracle.jdbc.vector.examples.Model;
import com.theokanning.openai.service.OpenAiService;

import java.util.Arrays;
import java.util.List;

/**
 * A model implemented with OpenAI. This implementation uses the community
 * maintained Java client for OpenAI:
 * <a href="https://github.com/TheoKanning/openai-java/tree/main">
 * OpenAI-Java
 * </a>
 */
final class OpenAiModel implements Model {


  /** Singleton instance of this class */
  static final OpenAiModel INSTANCE = new OpenAiModel();
  private OpenAiModel() { }

  private static final OpenAiService SERVICE =
    new OpenAiService(Config.get("OPENAI_API_KEY"));

  @Override
  public float[][] embed(String[] sentences) {
    EmbeddingRequest request =
      EmbeddingRequest.builder()
        .input(Arrays.asList(sentences))
        .model(Config.getOrDefault("OPENAI_MODEL", "text-embedding-ada-002"))
        .build();

    do {
      try {
        return SERVICE.createEmbeddings(request)
          .getData()
          .stream()
          .map(Embedding::getEmbedding)
          .map(OpenAiModel::toFloatArray)
          .toArray(float[][]::new);
      }
      catch (OpenAiHttpException httpException) {
        if (!"rate_limit_exceeded".equals(httpException.code))
          throw httpException;

        // A "rate_limit_exceeded" error means that too many requests have been
        // sent within a period of time. Recover from this by waiting.
        System.out.println(httpException.getMessage());
        try {
          // TODO: A more correct solution might read
          //  x-ratelimit-reset-requests from the HTTP response header. This
          //  implementation is just based off the error message, which
          //  specifies 20 seconds.
          for (int i = 20; i >= 0; i--) {
            System.out.print("Waiting " + i + " seconds...\r");
            Thread.sleep(1_000);
          }
        }
        catch (InterruptedException interruptedException) {
          System.out.println("Wait interrupted");
        }
      }
    } while (true);

  }

  private static float[] toFloatArray(List<Double> doubleList) {
    float[] floatArray = new float[doubleList.size()];

    for (int i = 0; i < floatArray.length; i++)
      floatArray[i] = doubleList.get(i).floatValue();

    return floatArray;
  }
}
