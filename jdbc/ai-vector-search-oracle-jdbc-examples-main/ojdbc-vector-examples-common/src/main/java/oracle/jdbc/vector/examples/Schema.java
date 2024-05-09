package oracle.jdbc.vector.examples;

import oracle.jdbc.OracleType;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

/**
 * <p>
 * A database schema (a collection of tables and other database objects) which
 * are used in code examples. Methods of this class will create and drop the
 * schema.
 * </p><p>
 * The example schema includes a table named "my_data". This table has the
 * following columns:
 * <dl><dt>
 * id
 * </dt><dd>
 * A unique numeric id. It is a PRIMARY KEY
 * </dd><dt>
 * info
 * </dt><dd>
 * A plain text sentence which conveys some information, such as
 * "San Francisco is in California".
 * </dd><dt>
 * v
 * </dt><dd>
 * A vector embedding of the <code>info</code> sentence.
 * </dd></dl>
 * </p>
 */
public final class Schema {

  private Schema() { }

  /**
   * Creates the schema, if it does not already exist.
   *
   * @param connection Connection used to create the schema. Not null.
   * @throws SQLException If creation fails due to a database error.
   */
  public static void create(Connection connection) throws SQLException {

    try (Statement statement = connection.createStatement()) {
      statement.execute("CREATE TABLE my_data ("
        + " id   NUMBER PRIMARY KEY,"
        + " info VARCHAR2(128),"
        + " v    VECTOR)");
    }
    catch (SQLException sqlException) {
      if (sqlException.getErrorCode() == 955) {
        // Return if ORA-00955 is caught. This error means the schema is already
        // created.
        return;
      }
      else {
        throw sqlException;
      }
    }

    try (PreparedStatement preparedStatement = connection.prepareStatement(
      "INSERT INTO my_data (id, info) VALUES (:1, :2)")) {
      // TODO: Would be nice if users can provide this data from a file, perhaps
      //   csv format?
      preparedStatement.setInt(1, 1);
      preparedStatement.setString(2, "San Francisco is in California.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 2);
      preparedStatement.setString(2, "San Jose is in California.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 3);
      preparedStatement.setString(2, "Los Angeles is in California.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 4);
      preparedStatement.setString(2, "Buffalo is in New York.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 5);
      preparedStatement.setString(2, "Brooklyn is in New York.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 6);
      preparedStatement.setString(2, "Queens is in New York.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 7);
      preparedStatement.setString(2, "Harlem is in New York.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 8);
      preparedStatement.setString(2, "The Bronx is in New York.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 9);
      preparedStatement.setString(2, "Manhattan is in New York.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 10);
      preparedStatement.setString(2, "Staten Island is in New York.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 11);
      preparedStatement.setString(2, "Miami is in Florida.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 12);
      preparedStatement.setString(2, "Tampa is in Florida.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 13);
      preparedStatement.setString(2, "Orlando is in Florida.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 14);
      preparedStatement.setString(2, "Dallas is in Texas.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 15);
      preparedStatement.setString(2, "Houston is in Texas.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 16);
      preparedStatement.setString(2, "Austin is in Texas.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 17);
      preparedStatement.setString(2, "Phoenix is in Arizona.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 18);
      preparedStatement.setString(2, "Las Vegas is in Nevada.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 19);
      preparedStatement.setString(2, "Portland is in Oregon.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 20);
      preparedStatement.setString(2, "New Orleans is in Louisiana.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 21);
      preparedStatement.setString(2, "Atlanta is in Georgia.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 22);
      preparedStatement.setString(2, "Chicago is in Illinois.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 23);
      preparedStatement.setString(2, "Cleveland is in Ohio.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 24);
      preparedStatement.setString(2, "Boston is in Massachusetts.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 25);
      preparedStatement.setString(2, "Baltimore is in Maryland.");
      preparedStatement.addBatch();

      preparedStatement.setInt(1, 100);
      preparedStatement.setString(2, "Ferraris are often red.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 101);
      preparedStatement.setString(2, "Teslas are electric.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 102);
      preparedStatement.setString(2, "Mini coopers are small.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 103);
      preparedStatement.setString(2, "Fiat 500 are small.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 104);
      preparedStatement.setString(2, "Dodge Vipers are wide.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 105);
      preparedStatement.setString(2, "Ford 150 are popular.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 106);
      preparedStatement.setString(2, "Alfa Romeos are fun but unreliable.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 107);
      preparedStatement.setString(2, "Volvos are safe.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 108);
      preparedStatement.setString(2, "Toyotas are reliable.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 109);
      preparedStatement.setString(2, "Hondas are reliable.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 110);
      preparedStatement.setString(2, "Porsches are fast and reliable.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 111);
      preparedStatement.setString(2, "Nissan GTRs are great");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 112);
      preparedStatement.setString(2, "NISMO is awesome");
      preparedStatement.addBatch();

      preparedStatement.setInt(1, 200);
      preparedStatement.setString(2, "Bananas are yellow.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 201);
      preparedStatement.setString(2, "Kiwis are green inside.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 202);
      preparedStatement.setString(2, "Kiwis are brown on the outside.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 203);
      preparedStatement.setString(2, "Kiwis are birds.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 204);
      preparedStatement.setString(2, "Kiwis taste good.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 205);
      preparedStatement.setString(2, "Ripe strawberries are red.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 206);
      preparedStatement.setString(2, "Apples can be green, yellow or red.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 207);
      preparedStatement.setString(2, "Ripe cherries are red.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 208);
      preparedStatement.setString(2, "Pears can be green, yellow or brown.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 209);
      preparedStatement.setString(2, "Oranges are orange.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 210);
      preparedStatement.setString(2, "Peaches can be yellow, orange or red.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 211);
      preparedStatement.setString(2, "Peaches can be fuzzy.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 212);
      preparedStatement.setString(2, "Grapes can be green, red or purple.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 213);
      preparedStatement.setString(2, "Watermelons are green on the outside.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 214);
      preparedStatement.setString(2, "Watermelons are red on the outside.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 215);
      preparedStatement.setString(2, "Blueberries are blue.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 216);
      preparedStatement.setString(2, "Limes are green.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 217);
      preparedStatement.setString(2, "Lemons are yellow.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 218);
      preparedStatement.setString(2, "Ripe tomatoes are red.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 219);
      preparedStatement.setString(2, "Unripe tomatoes are green.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 220);
      preparedStatement.setString(2, "Ripe raspberries are red.");
      preparedStatement.addBatch();

      preparedStatement.setInt(1, 300);
      preparedStatement.setString(2, "Tigers have stripes.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 301);
      preparedStatement.setString(2, "Lions are big.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 302);
      preparedStatement.setString(2, "Mice are small.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 303);
      preparedStatement.setString(2, "Cats do not care.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 304);
      preparedStatement.setString(2, "Dogs are loyal.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 305);
      preparedStatement.setString(2, "Bears are hairy.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 306);
      preparedStatement.setString(2, "Pandas are black and white.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 307);
      preparedStatement.setString(2, "Zebras are black and white.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 308);
      preparedStatement.setString(2, "Penguins can be black and white.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 309);
      preparedStatement.setString(2, "Puffins can be black and white.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 310);
      preparedStatement.setString(2, "Giraffes have long necks.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 311);
      preparedStatement.setString(2, "Elephants have trunks.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 312);
      preparedStatement.setString(2, "Horses have four legs.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 313);
      preparedStatement.setString(2, "Birds can fly.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 314);
      preparedStatement.setString(2, "Birds lay eggs.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 315);
      preparedStatement.setString(2, "Fish can swim.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 316);
      preparedStatement.setString(2, "Sharks have lots of teeth.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 317);
      preparedStatement.setString(2, "Flies can fly.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 318);
      preparedStatement.setString(2, "Snakes have fangs.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 319);
      preparedStatement.setString(2, "Hyenas laugh.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 320);
      preparedStatement.setString(2, "Crocodiles lurk.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 321);
      preparedStatement.setString(2, "Spiders have eight legs.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 322);
      preparedStatement.setString(2, "Wolves are hairy.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 323);
      preparedStatement.setString(2, "Mountain Lions eat deer.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 400);
      preparedStatement.setString(2, "Ibaraki is in Kanto.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 401);
      preparedStatement.setString(2, "Tochigi is in Kanto.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 402);
      preparedStatement.setString(2, "Gunma is in Kanto.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 403);
      preparedStatement.setString(2, "Saitama is in Kanto.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 404);
      preparedStatement.setString(2, "Chiba is in Kanto.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 405);
      preparedStatement.setString(2, "Tokyo is in Kanto.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 406);
      preparedStatement.setString(2, "Kanagawa is in Kanto.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 407);
      preparedStatement.setString(2, "Tokyo is in Japan.");
      preparedStatement.addBatch();

      preparedStatement.setInt(1, 500);
      preparedStatement.setString(2, "Eggs are egg shaped.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 501);
      preparedStatement.setString(2, "The answer to life is 42.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 502);
      preparedStatement.setString(2, "To be, or not to be, that is the question.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 503);
      preparedStatement.setString(2, "640K ought to be enough for anybody.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 504);
      preparedStatement.setString(2, "Man overboard.");
      preparedStatement.addBatch();

      preparedStatement.setInt(1, 900);
      preparedStatement.setString(2, "Oracle CloudWorld Las Vegas was on September 18–21, 2023");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 901);
      preparedStatement.setString(2, "Oracle CloudWorld Las Vegas was at The Venetian Convention and Expo Center");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 902);
      preparedStatement.setString(2, "Oracle CloudWorld Dubai is on 23 January 2024");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 903);
      preparedStatement.setString(2, "Oracle CloudWorld Dubai is at the Dubai World Trade Centre");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 904);
      preparedStatement.setString(2, "Oracle CloudWorld Mumbai is on 14 February 2024");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 905);
      preparedStatement.setString(2, "Oracle CloudWorld Mumbai is at the Jio World Convention Centre");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 906);
      preparedStatement.setString(2, "Oracle CloudWorld London is on 14 March 2024");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 907);
      preparedStatement.setString(2, "Oracle CloudWorld London is at the ExCeL London");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 908);
      preparedStatement.setString(2, "Oracle CloudWorld Milan is on 21 March 2024");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 909);
      preparedStatement.setString(2, "Oracle CloudWorld Milan is at the Milano Convention Centre");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 910);
      preparedStatement.setString(2, "Oracle CloudWorld Sao Paulo is on 4 April 2024");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 911);
      preparedStatement.setString(2, "Oracle CloudWorld Sao Paulo is at the TBD");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 912);
      preparedStatement.setString(2, "Oracle CloudWorld Singapore is on 16 April 2024");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 913);
      preparedStatement.setString(2, "Oracle CloudWorld Singapore is at the TBD");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 914);
      preparedStatement.setString(2, "Oracle CloudWorld Tokyo is on 18 April 2024");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 915);
      preparedStatement.setString(2, "Oracle CloudWorld Tokyo is at the TBD");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 916);
      preparedStatement.setString(2, "Oracle CloudWorld Mexico City is on 25 April 2024");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 917);
      preparedStatement.setString(2, "Oracle CloudWorld Mexico City is at the TBD");
      preparedStatement.addBatch();

      preparedStatement.setInt(1, 1000);
      preparedStatement.setString(2, "Dubai is in the United Arab Emirates.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 1001);
      preparedStatement.setString(2, "The Burj Khalifa is in Dubai.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 1002);
      preparedStatement.setString(2, "The Burj Khalifa is the tallest building in the world.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 1003);
      preparedStatement.setString(2, "Dubai is in the Persian Gulf.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 1004);
      preparedStatement.setString(2, "The United Arab Emirates consists of seven Emirates.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 1005);
      preparedStatement.setString(2, "The Emirates are Abu Dhabi, Ajman, Dubai, Fujairah, Ras Al Khaimah, Sharjah and Umm Al Quwain.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 1006);
      preparedStatement.setString(2, "The Emirates Mars Mission sent the Hope probe into orbit around Mars.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 1007);
      preparedStatement.setString(2, "Sheikh Mohamed bin Zayed Al Nahyan is the president of the United Arab Emirates.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 1008);
      preparedStatement.setString(2, "Emirates is the largest airline in the Middle East.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 1009);
      preparedStatement.setString(2, "Emirates operates to more than 150 cities in 80 countries.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 1010);
      preparedStatement.setString(2, "Emirates operates a fleet of nearly 300 aircraft.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 1011);
      preparedStatement.setString(2, "Emirates sponsors the Arsenal Football Club.");
      preparedStatement.addBatch();

      preparedStatement.setInt(1, 1100);
      preparedStatement.setString(2, "Mumbai is in India.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 1101);
      preparedStatement.setString(2, "Mumbai is the capital city of the Indian state of Maharashtra.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 1102);
      preparedStatement.setString(2, "Mumbai is the Indian state of Maharashtra.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 1103);
      preparedStatement.setString(2, "Mumbai is on the west coast of India.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 1104);
      preparedStatement.setString(2, "Mumbai is the de facto financial centre of India.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 1105);
      preparedStatement.setString(2, "Mumbai has a population of about 12.5 million people.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 1106);
      preparedStatement.setString(2, "Mumbai is hot with an average minimum temperature of 24 degrees celsius.");
      preparedStatement.addBatch();
      preparedStatement.setInt(1, 1107);
      preparedStatement.setString(2, "Common languages in Mumbai are Marathi, Hindi, Gujarati, Urdu, Bambaiya  and English.");
      preparedStatement.addBatch();

      preparedStatement.executeBatch();
    }
  }

  /**
   * Drops the schema, if it exists.
   * @param connection Connection used to drop the schema. Not null.
   * @throws SQLException If dropping fails due to a database error.
   */
  public static void drop(Connection connection) throws SQLException {
    try (Statement statement = connection.createStatement()) {
      statement.addBatch("DROP TABLE IF EXISTS my_data PURGE");
      statement.addBatch("DROP INDEX IF EXISTS my_data_v");
      statement.executeBatch();
    }
  }

  /**
   * Updates the table to store vector embeddings generated by a given
   * <code>model</code>.
   *
   * @param connection Connection to use for updating the table. Not null.
   * @param model Model to use for generating vector embeddings. Not null.
   * @throws SQLException If a database failure occurs when updating the table.
   */
  public static void vectorizeTable(Connection connection, Model model)
    throws SQLException {

    class IdInfo {
      int id;
      String info;
    }

    ArrayList<IdInfo> idInfos = new ArrayList<>();
    try (
      Statement statement = connection.createStatement();
      ResultSet resultSet = statement.executeQuery(
        "SELECT id, info FROM my_data")) {
      while (resultSet.next()) {
        IdInfo idInfo = new IdInfo();
        idInfo.id = resultSet.getInt("id");
        idInfo.info = resultSet.getString("info");
        idInfos.add(idInfo);
      }
    }

    String[] sentences = idInfos.stream()
      .map(idInfo -> idInfo.info)
      .toArray(String[]::new);

    float[][] embeddings = model.embed(sentences);

    try (PreparedStatement update = connection.prepareStatement(
      "UPDATE my_data SET v=? WHERE id=?")) {
      for (int i = 0; i < idInfos.size(); i++) {
        update.setObject(1, embeddings[i], OracleType.VECTOR);
        update.setInt(2, idInfos.get(i).id);
        update.addBatch();
      }
      update.executeBatch();
    }

    try (Statement statement = connection.createStatement()) {
      statement.execute("CREATE VECTOR INDEX my_data_v_index"
        + " ON my_data (v)"
        + " ORGANIZATION INMEMORY NEIGHBOR GRAPH"
        + " DISTANCE COSINE"
        + " WITH TARGET ACCURACY 95"
        + " PARALLEL 4");
    }
  }

}
