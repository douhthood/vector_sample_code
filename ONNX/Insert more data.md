# Load the Similarity Search Data

```SQL
drop table my_data;
create table my_data (
  id   number primary key,
  info varchar2(128),
  v    vector
);

truncate table my_data;
insert into my_data values (1, 'San Francisco is in California.', null);
insert into my_data values (2, 'San Jose is in California.', null);
insert into my_data values (3, 'Los Angles is in California.', null);
insert into my_data values (4, 'Buffalo is in New York.', null);
insert into my_data values (5, 'Brooklyn is in New York.', null);
insert into my_data values (6, 'Queens is in New York.', null);
insert into my_data values (7, 'Harlem is in New York.', null);
insert into my_data values (8, 'The Bronx is in New York.', null);
insert into my_data values (9, 'Manhattan is in New York.', null);
insert into my_data values (10, 'Staten Island is in New York.', null);
insert into my_data values (11, 'Miami is in Florida.', null);
insert into my_data values (12, 'Tampa is in Florida.', null);
insert into my_data values (13, 'Orlando is in Florida.', null);
insert into my_data values (14, 'Dallas is in Texas.', null);
insert into my_data values (15, 'Huston is in Texas.', null);
insert into my_data values (16, 'Austin is in Texas.', null);
insert into my_data values (17, 'Phoenix is in Arizona.', null);
insert into my_data values (18, 'Las Vegas is in Nevada.', null);
insert into my_data values (19, 'Portland is in Oregon.', null);
insert into my_data values (20, 'New Orleans is in Louisiana.', null);
insert into my_data values (21, 'Atlanta is in Georgia.', null);
insert into my_data values (22, 'Chicago is in Illinois.', null);
insert into my_data values (23, 'Cleveland is in Ohio.', null);
insert into my_data values (24, 'Boston is in Massachusetts.', null);
insert into my_data values (25, 'Baltimore is in Maryland.', null);

insert into my_data values (100, 'Ferraris are often red.', null);
insert into my_data values (101, 'Teslas are electric.', null);
insert into my_data values (102, 'Mini coopers are small.', null);
insert into my_data values (103, 'Fiat 500 are small.', null);
insert into my_data values (104, 'Dodge Vipers are wide.', null);
insert into my_data values (105, 'Ford 150 are popular.', null);
insert into my_data values (106, 'Alfa Romeos are fun.', null);
insert into my_data values (107, 'Volvos are safe.', null);
insert into my_data values (108, 'Toyotas are reliable.', null);
insert into my_data values (109, 'Hondas are reliable.', null);
insert into my_data values (110, 'Porsches are fast and reliable.', null);
insert into my_data values (111, 'Nissan GTR are great', null);
insert into my_data values (112, 'NISMO is awesome', null);

insert into my_data values (200, 'Bananas are yellow.', null);
insert into my_data values (201, 'Kiwis are green inside.', null);
insert into my_data values (202, 'Kiwis are brown on the outside.', null);
insert into my_data values (203, 'Kiwis are birds.', null);
insert into my_data values (204, 'Kiwis taste good.', null);
insert into my_data values (205, 'Ripe strawberries are red.', null);
insert into my_data values (206, 'Apples can be green, yellow or red.', null);
insert into my_data values (207, 'Ripe cherries are red.', null);
insert into my_data values (208, 'Pears can be green, yellow or brown.', null);
insert into my_data values (209, 'Oranges are orange.', null);
insert into my_data values (210, 'Peaches can be yellow, orange or red.', null);
insert into my_data values (211, 'Peaches can be fuzzy.', null);
insert into my_data values (212, 'Grapes can be green, red or purple.', null);
insert into my_data values (213, 'Watermelons are green on the outside.', null);
insert into my_data values (214, 'Watermelons are red on the outside.', null);
insert into my_data values (215, 'Blueberries are blue.', null);
insert into my_data values (216, 'Limes are green.', null);
insert into my_data values (217, 'Lemons are yellow.', null);
insert into my_data values (218, 'Ripe tomatoes are red.', null);
insert into my_data values (219, 'Unripe tomatoes are green.', null);
insert into my_data values (220, 'Ripe raspberries are red.', null);

insert into my_data values (300, 'Tigers have stripes.', null);
insert into my_data values (301, 'Lions are big.', null);
insert into my_data values (302, 'Mice are small.', null);
insert into my_data values (303, 'Cats do not care.', null);
insert into my_data values (304, 'Dogs are loyal.', null);
insert into my_data values (305, 'Bears are hairy.', null);
insert into my_data values (306, 'Pandas are black and white.', null);
insert into my_data values (307, 'Zebras are black and white.', null);
insert into my_data values (308, 'Penguins can be black and white.', null);
insert into my_data values (309, 'Puffins can be black and white.', null);
insert into my_data values (310, 'Giraffes have long necks.', null);
insert into my_data values (311, 'Elephants have trunks.', null);
insert into my_data values (312, 'Horses have four legs.', null);
insert into my_data values (313, 'Birds can fly.', null);
insert into my_data values (314, 'Birds lay eggs.', null);
insert into my_data values (315, 'Fish can swim.', null);
insert into my_data values (316, 'Sharks have lots of teeth.', null);
insert into my_data values (317, 'Flies can fly.', null);

insert into my_data values (400, 'Ibaraki is in Kanto.', null);
insert into my_data values (401, 'Tochigi is in Kanto.', null);
insert into my_data values (402, 'Gunma is in Kanto.', null);
insert into my_data values (403, 'Saitama is in Kanto.', null);
insert into my_data values (404, 'Chiba is in Kanto.', null);
insert into my_data values (405, 'Tokyo is in Kanto.', null);
insert into my_data values (406, 'Kanagawa is in Kanto.', null);

insert into my_data values (500, 'Eggs are egg shaped.', null);
insert into my_data values (501, 'Tokyo is in Japan.', null);
insert into my_data values (502, 'To be, or not to be, that is the question.', null);
insert into my_data values (503, '640K ought to be enough for anybody.', null);
insert into my_data values (504, 'Man overboard.', null);
commit;

insert into my_data values (900, 'Oracle CloudWorld Las Vegas was on September 18–21, 2023', null);
insert into my_data values (901, 'Oracle CloudWorld Las Vegas was at The Venetian Convention and Expo Center', null);
insert into my_data values (902, 'Oracle CloudWorld Dubai is on 23 January 2024', null);
insert into my_data values (903, 'Oracle CloudWorld Dubai is at the Dubai World Trade Centre', null);
insert into my_data values (904, 'Oracle CloudWorld Mumbai is on 14 February 2024', null);
insert into my_data values (905, 'Oracle CloudWorld Mumbai is at the Jio World Convention Centre', null);
insert into my_data values (906, 'Oracle CloudWorld London is on 14 March 2024', null);
insert into my_data values (907, 'Oracle CloudWorld London is at the ExCeL London', null);
insert into my_data values (908, 'Oracle CloudWorld Milan is on 21 March 2024', null);
insert into my_data values (909, 'Oracle CloudWorld Milan is at the Milano Convention Centre', null);
insert into my_data values (910, 'Oracle CloudWorld Sao Paulo is on 4 April 2024', null);
insert into my_data values (911, 'Oracle CloudWorld Sao Paulo is at the TBD', null);
insert into my_data values (912, 'Oracle CloudWorld Singapore is on 16 April 2024', null);
insert into my_data values (913, 'Oracle CloudWorld Singapore is at the TBD', null);
insert into my_data values (914, 'Oracle CloudWorld Tokyo is on 18 April 2024', null);
insert into my_data values (915, 'Oracle CloudWorld Tokyo is at the TBD', null);
insert into my_data values (916, 'Oracle CloudWorld Mexico City is on 25 April 2024', null);
insert into my_data values (917, 'Oracle CloudWorld Mexico City is at the TBD', null);

insert into my_data values (1000, 'Dubai is in the United Arab Emirates.', null);
insert into my_data values (1001, 'The Burj Khalifa is in Dubai.', null);
insert into my_data values (1002, 'The Burj Khalifa is the tallest building in the world.', null);
insert into my_data values (1003, 'Dubai is in the Persian Gulf.', null);
insert into my_data values (1004, 'The United Arab Emirates consists of seven Emirates.', null);
insert into my_data values (1005, 'The Emirates are Abu Dhabi, Ajman, Dubai, Fujairah, Ras Al Khaimah, Sharjah and Umm Al Quwain.', null);
insert into my_data values (1006, 'The Emirates Mars Mission sent the Hope probe into orbit around Mars.', null);
insert into my_data values (1007, 'Sheikh Mohamed bin Zayed Al Nahyan is the president of the United Arab Emirates.', null);
insert into my_data values (1008, 'Emirates is the largest airline in the Middle East.', null);
insert into my_data values (1009, 'Emirates operates to more than 150 cities in 80 countries.', null);
insert into my_data values (1010, 'Emirates operates a fleet of nearly 300 aircraft.', null);
insert into my_data values (1011, 'Emirates sponsors the Arsenal Football Club.', null);

insert into my_data values (1100, 'Mumbai is in India.', null);
insert into my_data values (1101, 'Mumbai is the capital city of the Indian state of Maharashtra.', null);
insert into my_data values (1102, 'Mumbai is the Indian state of Maharashtra.', null);
insert into my_data values (1103, 'Mumbai is on the west coast of India.', null);
insert into my_data values (1104, 'Mumbai is the de facto financial centre of India.', null);
insert into my_data values (1105, 'Mumbai has a population of about 12.5 million people.', null);
insert into my_data values (1106, 'Mumbai is hot with an average minimum temperature of 24 degrees Celsius.', null);
insert into my_data values (1107, 'Common languages in Mumbai are Marathi, Hindi, Gujarati, Urdu, Bambaiya and English.', null);
commit;
