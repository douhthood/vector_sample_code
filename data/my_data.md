# Create a table and load some data

```SQL
create table my_data (
  id   number primary key,
  info varchar2(128),
  v    vector
);
```

Now insert some test data that we can vectorize.


```SQL
insert into my_data values (1, 'San Francisco is in California.', NULL);
insert into my_data values (2, 'San Jose is in California.', NULL);
insert into my_data values (3, 'Los Angeles is in California.', NULL);
insert into my_data values (4, 'Buffalo is in New York.', NULL);
insert into my_data values (5, 'Brooklyn is in New York.', NULL);
insert into my_data values (6, 'Queens is in New York.', NULL);
insert into my_data values (7, 'Harlem is in New York.', NULL);
insert into my_data values (8, 'The Bronx is in New York.', NULL);
insert into my_data values (9, 'Manhattan is in New York.', NULL);
insert into my_data values (10, 'Staten Island is in New York.', NULL);
insert into my_data values (11, 'Miami is in Florida.', NULL);
insert into my_data values (12, 'Tampa is in Florida.', NULL);
insert into my_data values (13, 'Orlando is in Florida.', NULL);
insert into my_data values (14, 'Dallas is in Texas.', NULL);
insert into my_data values (15, 'Huston is in Texas.', NULL);
insert into my_data values (16, 'Austin is in Texas.', NULL); 
insert into my_data values (17, 'Phoenix is in Arizona.', NULL); 
```

```SQL
insert into my_data values (18, 'Las Vegas is in Nevada.', NULL);
insert into my_data values (19, 'Portland is in Oregon.', NULL);
insert into my_data values (20, 'New Orleans is in Louisiana.', NULL);
insert into my_data values (21, 'Atlanta is in Georgia.', NULL);
insert into my_data values (22, 'Chicago is in Illinois.', NULL);
insert into my_data values (23, 'Cleveland is in Ohio.', NULL);
insert into my_data values (24, 'Boston is in Massachusetts.', NULL);
insert into my_data values (25, 'Baltimore is in Maryland.', NULL);
```

```SQL
insert into my_data values (100, 'Ferraris are often red.', NULL);
insert into my_data values (101, 'Teslas are electric.', NULL);
insert into my_data values (102, 'Mini coopers are small.', NULL);
insert into my_data values (103, 'Fiat 500 are small.', NULL);
insert into my_data values (104, 'Dodge Vipers are wide.', NULL);
insert into my_data values (105, 'Ford 150 are popular.', NULL);
insert into my_data values (106, 'Alfa Romeos are fun.', NULL);
insert into my_data values (107, 'Volvos are safe.', NULL);
insert into my_data values (108, 'Toyotas are reliable.', NULL);
insert into my_data values (109, 'Hondas are reliable.', NULL);
insert into my_data values (110, 'Porsches are fast and reliable.', NULL);
insert into my_data values (111, 'Nissan GTR are great', NULL);
insert into my_data values (112, 'NISMO is awesome', NULL);
insert into my_data values (113, 'Tesla Cybertrucks are awesome', NULL);
```

```SQL
insert into my_data values (200, 'Bananas are yellow.', NULL);
insert into my_data values (201, 'Kiwis are green inside.', NULL);
insert into my_data values (202, 'Kiwis are brown on the outside.', NULL);
insert into my_data values (203, 'Kiwis are birds.', NULL);
insert into my_data values (204, 'Kiwis taste good.', NULL);
insert into my_data values (205, 'Ripe strawberries are red.', NULL);
insert into my_data values (206, 'Apples can be green, yellow or red.', NULL);
insert into my_data values (207, 'Ripe cherries are red.', NULL);
insert into my_data values (208, 'Pears can be green, yellow or brown.', NULL);
insert into my_data values (209, 'Oranges are orange.', NULL);
insert into my_data values (210, 'Peaches can be yellow, orange or red.', NULL);
insert into my_data values (211, 'Peaches can be fuzzy.', NULL);
insert into my_data values (212, 'Grapes can be green, red or purple.', NULL);
insert into my_data values (213, 'Watermelons are green on the outside.', NULL);
insert into my_data values (214, 'Watermelons are red on the outside.', NULL);
insert into my_data values (215, 'Blueberries are blue.', NULL);
insert into my_data values (216, 'Limes are green.', NULL);
insert into my_data values (217, 'Lemons are yellow.', NULL);
insert into my_data values (218, 'Ripe tomatoes are red.', NULL);
insert into my_data values (219, 'Unripe tomatoes are green.', NULL);
insert into my_data values (220, 'Ripe raspberries are red.', NULL);
```

```SQL
insert into my_data values (300, 'Tigers have stripes.', NULL);
insert into my_data values (301, 'Lions are big.', NULL);
insert into my_data values (302, 'Mice are small.', NULL);
insert into my_data values (303, 'Cats do not care.', NULL);
insert into my_data values (304, 'Dogs are loyal.', NULL);
insert into my_data values (305, 'Bears are hairy.', NULL);
insert into my_data values (306, 'Pandas are black and white.', NULL);
insert into my_data values (307, 'Zebras are black and white.', NULL);
insert into my_data values (308, 'Penguins can be black and white.', NULL);
insert into my_data values (309, 'Puffins can be black and white.', NULL);
insert into my_data values (310, 'Giraffes have long necks.', NULL);
insert into my_data values (311, 'Elephants have trunks.', NULL);
insert into my_data values (312, 'Horses have four legs.', NULL);
insert into my_data values (313, 'Birds can fly.', NULL);
insert into my_data values (314, 'Birds lay eggs.', NULL);
insert into my_data values (315, 'Fish can swim.', NULL);
insert into my_data values (316, 'Sharks have lots of teeth.', NULL);
insert into my_data values (317, 'Flies can fly.', NULL);
insert into my_data values (318, 'Snakes have fangs.', NULL);
insert into my_data values (319, 'Hyenas laugh.', NULL);
insert into my_data values (320, 'Crocodiles lurk.', NULL);
insert into my_data values (321, 'Spiders have eight legs.', NULL);
insert into my_data values (322, 'Wolves are hairy.', NULL);
insert into my_data values (323, 'Mountain Lions eat deer.', NULL);
```

```SQL
insert into my_data values (400, 'Ibaraki is in Kanto.', NULL);
insert into my_data values (401, 'Tochigi is in Kanto.', NULL);
insert into my_data values (402, 'Gunma is in Kanto.', NULL);
insert into my_data values (403, 'Saitama is in Kanto.', NULL);
insert into my_data values (404, 'Chiba is in Kanto.', NULL);
insert into my_data values (405, 'Tokyo is in Kanto.', NULL);
insert into my_data values (406, 'Kanagawa is in Kanto.', NULL);
```

```SQL
insert into my_data values (500, 'Eggs are egg shaped.', NULL);
insert into my_data values (501, 'Tokyo is in Japan.', NULL);
insert into my_data values (502, 'To be, or not to be, that is the question.', NULL);
insert into my_data values (503, '640K ought to be enough for anybody.', NULL);
insert into my_data values (504, 'Man overboard.', NULL);
```

```SQL
insert into my_data values (900, 'Oracle CloudWorld Las Vegas was on September 18–21, 2023', NULL);
insert into my_data values (901, 'Oracle CloudWorld Las Vegas was at The Venetian Convention and Expo Center', NULL);
insert into my_data values (902, 'Oracle CloudWorld Dubai is on 23 January 2024', NULL);
insert into my_data values (903, 'Oracle CloudWorld Dubai is at the Dubai World Trade Centre', NULL);
insert into my_data values (904, 'Oracle CloudWorld Mumbai is on 14 February 2024', NULL);
insert into my_data values (905, 'Oracle CloudWorld Mumbai is at the Jio World Convention Centre', NULL);
insert into my_data values (906, 'Oracle CloudWorld London is on 14 March 2024', NULL);
insert into my_data values (907, 'Oracle CloudWorld London is at the ExCeL London', NULL);
insert into my_data values (908, 'Oracle CloudWorld Milan is on 21 March 2024', NULL);
insert into my_data values (909, 'Oracle CloudWorld Milan is at the Milano Convention Centre', NULL);
insert into my_data values (910, 'Oracle CloudWorld Sao Paulo is on 4 April 2024', NULL);
insert into my_data values (911, 'Oracle CloudWorld Sao Paulo is at the World Trade Center São Paulo', NULL);
insert into my_data values (912, 'Oracle CloudWorld Singapore is on 16 April 2024', NULL);
insert into my_data values (913, 'Oracle CloudWorld Singapore is at the TBD', NULL);
insert into my_data values (914, 'Oracle CloudWorld Tokyo is on 18 April 2024', NULL);
insert into my_data values (915, 'Oracle CloudWorld Tokyo is at The Prince Park Tower Tokyo', NULL);
insert into my_data values (916, 'Oracle CloudWorld Mexico City is on 25 April 2024', NULL);
insert into my_data values (917, 'Oracle CloudWorld Mexico City is at the Centro Citibanamex', NULL);
```

```SQL
insert into my_data values (1000, 'Dubai is in the United Arab Emirates.', NULL);
insert into my_data values (1001, 'The Burj Khalifa is in Dubai.', NULL);
insert into my_data values (1002, 'The Burj Khalifa is tallest building in the world.', NULL);
insert into my_data values (1003, 'Dubai is in the Persian Gulf.', NULL);
insert into my_data values (1004, 'The United Arab Emirates consists of seven emirates.', NULL);
insert into my_data values (1005, 'The Emirates are Abu Dhabi, Ajman, Dubai, Fujairah, Ras Al Khaimah, Sharjah and Umm Al Quwain.', NULL);
insert into my_data values (1006, 'The Emirates Mars Mission sent the Hope probe into orbit around Mars.', NULL);
insert into my_data values (1007, 'Sheikh Mohamed bin Zayed Al Nahyan is the president of the United Arab Emirates.', NULL);
insert into my_data values (1008, 'Emirates is the largest airline in the Middle East.', NULL);
insert into my_data values (1009, 'Emirates operates to more than 150 cities in 80 countries.', NULL);
insert into my_data values (1010, 'Emirates operates a fleet of nearly 300 aircraft.', NULL);
insert into my_data values (1011, 'Emirates sponsors the Arsenal Football Club.', NULL);
```

```SQL
insert into my_data values (1100, 'Mumbai is in India.', NULL);
insert into my_data values (1101, 'Mumbai is the capital city of the Indian state of Maharashtra.', NULL);
insert into my_data values (1102, 'Mumbai is the Indian state of Maharashtra.', NULL);
insert into my_data values (1103, 'Mumbai is on the west coast of India.', NULL);
insert into my_data values (1104, 'Mumbai is the de facto financial centre of India.', NULL);
insert into my_data values (1105, 'Mumbai has a population of about 12.5 million people.', NULL);
insert into my_data values (1106, 'Mumbai is hot with an average minimum temperature of 24 degrees celsius.', NULL);
insert into my_data values (1107, 'Common languages in Mumbai are Marathi, Hindi, Gujarati, Urdu, Bambaiya  and English.', NULL);
```

```SQL
commit;
```
