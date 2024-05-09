package oracle.jdbc.vector.examples.cohere;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import oracle.jdbc.vector.examples.Config;
import oracle.jdbc.vector.examples.Model;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Arrays;

import static java.nio.charset.StandardCharsets.UTF_8;

/**
 * A model which is accessed through the Cohere REST API. This model requests an
 * embedding from the <a href="https://docs.cohere.com/reference/embed">
 * "embed" endpoint of the Cohere API. The implementation is derived from the
 * specification of this endpoint, which can be found at the link above.
 */
final class CohereModel implements Model {

  /** Singleton instance of this model */
  static final Model INSTANCE = new CohereModel();
  private CohereModel() { }

  /**
   * Java representation of a JSON request sent to Cohere's embed endpoint. The
   * Jackson library understands how to convert instance of this class into
   * JSON.
   */
  private static final class Request {
    public String[] texts;

    public String model;

    public String input_type = "search_query";
  }

  /**
   * Java representation of the JSON response from Cohere's embed endpoint. The
   * Jackson library understands how to map JSON to an instance of this class.
   */
  private static final class EmbedResponse {
    public float[][] embeddings;
  }

  /**
   * <p>
   * Requests an embedding from the
   * <a href="https://docs.cohere.com/reference/embed">
   * "embed" endpoint of the Cohere API.
   * </a>.
   * </p>
   * @param texts Texts to request embeddings for. Not null.
   * @return The embedding for the given text. Not null.
   */
  @Override
  public float[][] embed(String[] texts) {

    float[][] embeddings = new float[texts.length][];

    // The endpoint is specified to generate a maximum of 96 embeddings per
    // request. Split the input texts into multiple requests if necessary.
    // TODO: Can this be multi-threaded?
    int from = 0;
    while (from != texts.length) {
      int to = Math.min(from + 96, texts.length);

      final float[][] moreEmbeddings;
      try {
        moreEmbeddings = embed(texts, from, to);
      }
      catch (Exception exception) {
        throw new RuntimeException(
          "Cohere endpoint request failed. See cause for details", exception);
      }

      System.arraycopy(
        moreEmbeddings, 0, embeddings, from, moreEmbeddings.length);
      from = to;
    }

    return embeddings;
  }

  /**
   * <p>
   * Requests an embedding from the
   * <a href="https://docs.cohere.com/reference/embed">
   * "embed" endpoint of the Cohere API.
   * </a>.
   * </p>
   *
   * @param texts Texts to request embeddings for. Not null.
   * @param from Inclusive index of the first text to request an embedding for.
   * @param to Exclusive index of the last text to request an embedding for.
   * @return The embedding for the given text. Not null.
   *
   * @throws IOException If network communication fails.
   * @throws InterruptedException If the calling thread is interrupted.
   */
  private static float[][] embed(String[] texts, int from, int to)
    throws IOException, InterruptedException {

    // Using Jackson's ObjectMapper to convert between Java objects and JSON.
    // Failing on unknown properties is disabled so that the EmbedResponse class
    // can just declare the "embeddings" field, without having to declare all
    // other fields of the response.
    ObjectMapper jsonMapper = new ObjectMapper();
    jsonMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);

    // Jackson converts a Java object into JSON
    Request request = new Request();
    request.texts = Arrays.copyOfRange(texts, from, to);
    request.model =
      Config.getOrDefault("COHERE_MODEL", "embed-multilingual-v3.0");
    byte[] requestBytes = jsonMapper.writeValueAsBytes(request);

    // Using java.net.http classes added in JDK 10. (If you're on JDK 8, you can
    // use java.net.HttpsUrlConnection, or you can use a library like Apache
    // HttpClient).
    HttpRequest embedRequest =
      HttpRequest.newBuilder()
        .uri(URI.create("https://api.cohere.ai/v1/embed"))
        .POST(HttpRequest.BodyPublishers.ofByteArray(requestBytes))
        .header("Authorization", "BEARER " + Config.get("COHERE_API_KEY"))
        .header("accept", "application/json")
        .header("content-type", "application/json")
        .build();

    final byte[] responseBytes;
    HttpClient http = HttpClient.newHttpClient();
    HttpResponse<byte[]> embedResponse =
      http.send(embedRequest, HttpResponse.BodyHandlers.ofByteArray());

    responseBytes = embedResponse.body();

    // If the HTTP status code is not 200 (OK), then report an error
    if (embedResponse.statusCode() != 200) {
      throw new RuntimeException(new String(responseBytes, UTF_8));
    }

    // Jackson converts JSON into a Java object
    EmbedResponse response =
      jsonMapper.readValue(responseBytes, EmbedResponse.class);

    return response.embeddings;
  }

}
