package oracle.jdbc.vector.examples;

import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Properties;

/**
 * Configurable values used by code examples. In order of precedence, these
 * values can be configured as JVM system properties, or environment variables.
 */
public final class Config {

  /**
   * Path to the configuration file
   */
  private static final Path CONFIG_PATH =
    Paths.get("config.properties").toAbsolutePath();

  /**
   * Configuration read from config.properties in the current working directory.
   */
  private static final Properties CONFIG_FILE = new Properties();
  static {
    try (Reader reader = Files.newBufferedReader(CONFIG_PATH)) {
      CONFIG_FILE.load(reader);
    }
    catch (IOException ioException) {
      System.out.println("Failed to read configuration from path:\n"
        + CONFIG_PATH
        + "\nFalling back to JVM system properties and environment variables");
    }
  }

  private Config() { }

  /**
   * Returns the value configured for a given <code>name</code>, or throws a
   * {@link RuntimeException} if no value is configured.
   *
   * @param name Name of a configurable value. Case sensitive. Not null.
   * @return The configured value. Not null.
   * @throws RuntimeException If no value is configured.
   */
  public static String get(String name) {
    String value = getOrDefault(name, null);

    if (value == null) {
      throw new RuntimeException(
        "\"" + name + "\" must be configured in:\n"
          + CONFIG_PATH
          + "\nOr set as a JVM system property or environment variable.");
    }

    return value;
  }

  /**
   * Returns the value configured for a given <code>name</code>, or a
   * <code>defaultValue</code> if no value is configured.
   *
   * @param name Name of a configurable value. Case sensitive. Not null.
   * @param defaultValue Default value. May be null.
   * @return The configured value, or the default if none is configured. May be
   * null if the <code>defaultValue</code> argument is null.
   */
  public static String getOrDefault(String name, String defaultValue) {
    String value = CONFIG_FILE.getProperty(name);
    if (value != null)
      return value;

    value = System.getProperty(name);
    if (value != null)
      return value;

    value = System.getenv(name);
    if (value != null)
      return value;

    return defaultValue;
  }

}
