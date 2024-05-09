package oracle.jdbc.vector.examples.azureopenai;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.OpenAIClientBuilder;
import com.azure.ai.openai.models.EmbeddingItem;
import com.azure.ai.openai.models.Embeddings;
import com.azure.ai.openai.models.EmbeddingsOptions;
import com.azure.core.credential.KeyCredential;
import com.azure.core.exception.HttpResponseException;
import com.azure.core.http.ProxyOptions;
import com.azure.core.util.HttpClientOptions;
import oracle.jdbc.vector.examples.Config;
import oracle.jdbc.vector.examples.Model;

import java.net.InetSocketAddress;
import java.util.Arrays;
import java.util.List;

/**
 * A model implemented with OpenAI. This implementation uses the
 * <a href="https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/openai/azure-ai-openai#azure-openai-client-library-for-java">
 * Azure OpenAI client library for Java
 * </a>
 */
final class AzureOpenAiModel implements Model {

  /** Singleton instance of this class */
  static final AzureOpenAiModel INSTANCE = new AzureOpenAiModel();
  private AzureOpenAiModel() { }

  @Override
  public float[][] embed(String[] sentences) {

    OpenAIClient client = new OpenAIClientBuilder()
      .credential(new KeyCredential(Config.get("OPENAI_API_KEY")))
      .buildClient();

    EmbeddingsOptions embeddingsOptions =
      new EmbeddingsOptions(Arrays.asList(sentences));

    Embeddings embeddings;
    do {
      try {
        embeddings =
          client.getEmbeddings(
            Config.getOrDefault("OPENAI_MODEL", "text-embedding-ada-002"),
            embeddingsOptions);
        break;
      }
      catch (HttpResponseException httpResponseException) {
        if (httpResponseException.getResponse().getStatusCode() != 429)
          throw httpResponseException;

        // An HTTP 429 error means that too many requests have been
        // sent within a period of time. Recover from this by waiting.
        System.out.println(httpResponseException.getMessage());
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
    }
    while (true);

    return embeddings.getData()
      .stream()
      .map(EmbeddingItem::getEmbedding)
      .map(AzureOpenAiModel::toFloatArray)
      .toArray(float[][]::new);
  }

  private static float[] toFloatArray(List<Double> doubleList) {
    float[] floatArray = new float[doubleList.size()];

    for (int i = 0; i < floatArray.length; i++)
      floatArray[i] = doubleList.get(i).floatValue();

    return floatArray;
  }

}
