/* Copyright (c) 2024, Oracle and/or its affiliates. */

/******************************************************************************
 *
 * This software is dual-licensed to you under the Universal Permissive License
 * (UPL) 1.0 as shown at https://oss.oracle.com/licenses/upl and Apache License
 * 2.0 as shown at http://www.apache.org/licenses/LICENSE-2.0. You may choose
 * either license.
 *
 * If you elect to accept the software under the Apache License, Version 2.0,
 * the following applies:
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * NAME
 *   createSchema.js
 *
 * DESCRIPTION
 *   Functions to create schema objects for the vector demos
 *
 *****************************************************************************/
const oracledb = require('oracledb');

async function createSchema() {
  let connection, oracleDbVersion;
  const dbConfig = {
    user          : process.env.NODE_ORACLEDB_USER,
    password      : process.env.NODE_ORACLEDB_PASSWORD,
    connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING
  };
  try {
    //oracledb.initOracleClient(); // To enable node-oracledb Thick mode

    // Get a standalone Oracle Database connection
    connection = await oracledb.getConnection(dbConfig);

    // Check if we are connected to Oracle Database 23.4 that supports vectors
    if (connection.oracleServerVersion < 2304000000) {
      console.log('This example requires Oracle Database 23.4 or later');
      process.exit();
    }
    console.log('Connected to Oracle Database');

    console.log('Creating schema objects');

    const stmts = [

      `DROP TABLE my_data PURGE`,

      `CREATE TABLE my_data (
        id   NUMBER PRIMARY KEY,
        info VARCHAR2(128),
        v    VECTOR)`,

      `DROP TABLE table1 PURGE`,

      `CREATE TABLE table1 (
          id  NUMBER,
          v   VECTOR)`,

      `DROP TABLE table2 PURGE`,

      `CREATE TABLE table2 (
        id     NUMBER,
        vcol   VECTOR(3),
        vcol32 VECTOR(3, float32),
        vcol64 VECTOR(3, float64),
        vcol8  VECTOR(3, int8))`,

      `DROP TABLE text_image PURGE`,

      `create table text_image (
        id       NUMBER,
        textvec  VECTOR,
        imagevec VECTOR)`,

      `create table batch (
        id       NUMBER,
        info     VARCHAR2(128),
        v        VECTOR)`,

    ];

    for (const s of stmts) {
      try {
        await connection.execute(s);
      } catch (e) {
        if (e.errorNum != 942) // Ignore ORA-942: table does not exist
          throw (e);
      }
    }

    const dataToInsert = [
      [1, "San Francisco is in California.", null],
      [2, "San Jose is in California.", null],
      [3, "Los Angeles is in California.", null],
      [4, "Buffalo is in New York.", null],
      [5, "Brooklyn is in New York.", null],
      [6, "Queens is in New York.", null],
      [7, "Harlem is in New York.", null],
      [8, "The Bronx is in New York.", null],
      [9, "Manhattan is in New York.", null],
      [10, "Staten Island is in New York.", null],
      [11, "Miami is in Florida.", null],
      [12, "Tampa is in Florida.", null],
      [13, "Orlando is in Florida.", null],
      [14, "Dallas is in Texas.", null],
      [15, "Houston is in Texas.", null],
      [16, "Austin is in Texas.", null],
      [17, "Phoenix is in Arizona.", null],
      [18, "Las Vegas is in Nevada.", null],
      [19, "Portland is in Oregon.", null],
      [20, "New Orleans is in Louisiana.", null],
      [21, "Atlanta is in Georgia.", null],
      [22, "Chicago is in Illinois.", null],
      [23, "Cleveland is in Ohio.", null],
      [24, "Boston is in Massachusetts.", null],
      [25, "Baltimore is in Maryland.", null],

      [100, "Ferraris are often red.", null],
      [101, "Teslas are electric.", null],
      [102, "Mini coopers are small.", null],
      [103, "Fiat 500 are small.", null],
      [104, "Dodge Vipers are wide.", null],
      [105, "Ford 150 are popular.", null],
      [106, "Alfa Romeos are fun but unreliable.", null],
      [107, "Volvos are safe.", null],
      [108, "Toyotas are reliable.", null],
      [109, "Hondas are reliable.", null],
      [110, "Porsches are fast and reliable.", null],
      [111, "Nissan GTRs are great.", null],
      [112, "NISMO is awesome.", null],

      [200, "Bananas are yellow.", null],
      [201, "Kiwis are green inside.", null],
      [202, "Kiwis are brown on the outside.", null],
      [203, "Kiwis are birds.", null],
      [204, "Kiwis taste good.", null],
      [205, "Ripe strawberries are red.", null],
      [206, "Apples can be green, yellow or red.", null],
      [207, "Ripe cherries are red.", null],
      [208, "Pears can be green, yellow or brown.", null],
      [209, "Oranges are orange.", null],
      [210, "Peaches can be yellow, orange or red.", null],
      [211, "Peaches can be fuzzy.", null],
      [212, "Grapes can be green, red or purple.", null],
      [213, "Watermelons are green on the outside.", null],
      [214, "Watermelons are red on the outside.", null],
      [215, "Blueberries are blue.", null],
      [216, "Limes are green.", null],
      [217, "Lemons are yellow.", null],
      [218, "Ripe tomatoes are red.", null],
      [219, "Unripe tomatoes are green.", null],
      [220, "Ripe raspberries are red.", null],

      [300, "Tigers have stripes.", null],
      [301, "Lions are big.", null],
      [302, "Mice are small.", null],
      [303, "Cats do not care.", null],
      [304, "Dogs are loyal.", null],
      [305, "Bears are hairy.", null],
      [306, "Pandas are black and white.", null],
      [307, "Zebras are black and white.", null],
      [308, "Penguins can be black and white.", null],
      [309, "Puffins can be black and white.", null],
      [310, "Giraffes have long necks.", null],
      [311, "Elephants have trunks.", null],
      [312, "Horses have four legs.", null],
      [313, "Birds can fly.", null],
      [314, "Birds lay eggs.", null],
      [315, "Fish can swim.", null],
      [316, "Sharks have lots of teeth.", null],
      [317, "Flies can fly.", null],
      [318, "Snakes have fangs.", null],
      [319, "Hyenas laugh.", null],
      [320, "Crocodiles lurk.", null],
      [321, "Spiders have eight legs.", null],
      [322, "Wolves are hairy.", null],
      [323, "Mountain Lions eat deer.", null],

      [400, "Ibaraki is in Kanto.", null],
      [401, "Tochigi is in Kanto.", null],
      [402, "Gunma is in Kanto.", null],
      [403, "Saitama is in Kanto.", null],
      [404, "Chiba is in Kanto.", null],
      [405, "Tokyo is in Kanto.", null],
      [406, "Kanagawa is in Kanto.", null],
      [407, "Tokyo is in Japan.", null],

      [500, "Eggs are egg shaped.", null],
      [501, "The answer to life is 42.", null],
      [502, "To be, or not to be, that is the question.", null],
      [503, "640K ought to be enough for anybody.", null],
      [504, "Man overboard.", null],

      [900, 'Oracle CloudWorld Las Vegas was on September 18–21, 2023', null],
      [901, 'Oracle CloudWorld Las Vegas was at The Venetian Convention and Expo Center', null],
      [902, 'Oracle CloudWorld Dubai is on 23 January 2024', null],
      [903, 'Oracle CloudWorld Dubai is at the Dubai World Trade Centre', null],
      [904, 'Oracle CloudWorld Mumbai is on 14 February 2024', null],
      [905, 'Oracle CloudWorld Mumbai is at the Jio World Convention Centre', null],
      [906, 'Oracle CloudWorld London is on 14 March 2024', null],
      [907, 'Oracle CloudWorld London is at the ExCeL London', null],
      [908, 'Oracle CloudWorld Milan is on 21 March 2024', null],
      [909, 'Oracle CloudWorld Milan is at the Milano Convention Centre', null],
      [910, 'Oracle CloudWorld Sao Paulo is on 4 April 2024', null],
      [911, 'Oracle CloudWorld Sao Paulo is at the TBD', null],
      [912, 'Oracle CloudWorld Singapore is on 16 April 2024', null],
      [913, 'Oracle CloudWorld Singapore is at the TBD', null],
      [914, 'Oracle CloudWorld Tokyo is on 18 April 2024', null],
      [915, 'Oracle CloudWorld Tokyo is at the TBD', null],
      [916, 'Oracle CloudWorld Mexico City is on 25 April 2024', null],
      [917, 'Oracle CloudWorld Mexico City is at the TBD', null],

      [1000, 'Dubai is in the United Arab Emirates.', null],
      [1001, 'The Burj Khalifa is in Dubai.', null],
      [1002, 'The Burj Khalifa is the tallest building in the world.', null],
      [1003, 'Dubai is in the Persian Gulf.', null],
      [1004, 'The United Arab Emirates consists of seven Emirates.', null],
      [1005, 'The Emirates are Abu Dhabi, Ajman, Dubai, Fujairah, Ras Al Khaimah, Sharjah and Umm Al Quwain.', null],
      [1006, 'The Emirates Mars Mission sent the Hope probe into orbit around Mars.', null],
      [1007, 'Sheikh Mohamed bin Zayed Al Nahyan is the president of the United Arab Emirates.', null],
      [1008, 'Emirates is the largest airline in the Middle East.', null],
      [1009, 'Emirates operates to more than 150 cities in 80 countries.', null],
      [1010, 'Emirates operates a fleet of nearly 300 aircraft.', null],
      [1011, 'Emirates sponsors the Arsenal Football Club.', null],

      [1100, 'Mumbai is in India.', null],
      [1101, 'Mumbai is the capital city of the Indian state of Maharashtra.', null],
      [1102, 'Mumbai is the Indian state of Maharashtra.', null],
      [1103, 'Mumbai is on the west coast of India.', null],
      [1104, 'Mumbai is the de facto financial centre of India.', null],
      [1105, 'Mumbai has a population of about 12.5 million people.', null],
      [1106, 'Mumbai is hot with an average minimum temperature of 24 degrees Celsius.', null],
      [1107, 'Common languages in Mumbai are Marathi, Hindi, Gujarati, Urdu, Bambaiya and English.', null],

    ];

    await connection.executeMany('INSERT INTO my_data (id, info, v) VALUES (:1, :2, :3)',
      dataToInsert, {autoCommit: true});

    // await connection.commit();
    console.log('Created tables and inserted data');
    oracleDbVersion = connection.oracleServerVersionString;

  } catch (err) {
    console.error(err);
  } finally {
    if (connection)
      await connection.close();
  }

  if (oracledb.thin)
    console.log("\nThin mode selected");
  else
    console.log("\nThick mode selected");

  console.log("Run at: " + new Date());
  console.log("Node.js version: " + process.version + " (" + process.platform, process.arch + ")");
  if (oracleDbVersion)
    console.log("Oracle Database version:", oracleDbVersion);
  console.log("Node-oracledb version:", oracledb.versionString);
  if (!oracledb.thin)
    console.log("Oracle Client library version:", oracledb.oracleClientVersionString);
}
createSchema();
