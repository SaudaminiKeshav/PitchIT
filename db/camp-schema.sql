DROP DATABASE IF EXISTS `sequelize_pitchit`;
CREATE DATABASE `sequelize_pitchit`;

USE `sequelize_pitchit`;
-- SELECT * FROM `nationalparks`;

-- INSERT INTO nationalparks (`id`, 'parkcode', `name`,`state`, `image0`,`infoUrl`,`createdAt`,`updatedAt`) 
-- VALUES (DEFAULT, 'parkcode', `name`, `state`, `image0`,`infoUrl`, "0000-00-00 00:00:00", "0000-00-00 00:00:00");

INSERT INTO nationalparks (`id`, `parkcode`, `name`,`state`, `image0`,`infoUrl`,`createdAt`,`updatedAt`) 
VALUES (DEFAULT, "cany", "Canyonlands National Park", "UT", "https://www.nps.gov/common/uploads/structured_data/3C7A525D-1DD8-B71B-0B8E59D2EB39F6D0.jpg", "https://www.nps.gov/cany/index.htm", "0000-00-00 00:00:00", "0000-00-00 00:00:00") ,
(DEFAULT, "cave", "Carlsbad Caverns National Park", "NM", "https://www.nps.gov/common/uploads/structured_data/3C82342F-1DD8-B71B-0BAD8438A2A16379.jpg", "https://www.nps.gov/cave/index.htm", "0000-00-00 00:00:00", "0000-00-00 00:00:00"),
(DEFAULT, "brca", "Bryce Canyon National Park", "UT", "https://www.nps.gov/common/uploads/structured_data/3C7F8B29-1DD8-B71B-0B5EA38E8C5E5606.jpg", "https://www.nps.gov/brca/index.htm", "0000-00-00 00:00:00", "0000-00-00 00:00:00"),
(DEFAULT, "arch", "Arches National Park", "UT", "https://www.nps.gov/common/uploads/structured_data/3C79850F-1DD8-B71B-0BC4A88BA85DE6B0.jpg", "https://www.nps.gov/arch/index.htm", "0000-00-00 00:00:00", "0000-00-00 00:00:00"),
(DEFAULT, "deva", "Death Valley National Park", "CA,NV", "https://www.nps.gov/common/uploads/structured_data/3C7EC929-1DD8-B71B-0B6F8851F7D62846.jpg", "https://www.nps.gov/deva/index.htm", "0000-00-00 00:00:00", "0000-00-00 00:00:00"),
(DEFAULT, "care", "Capitol Reef National Park", "UT", "https://www.nps.gov/common/uploads/structured_data/3C82E3C7-1DD8-B71B-0B4181834EE46AED.jpg", "https://www.nps.gov/care/index.htm", "0000-00-00 00:00:00", "0000-00-00 00:00:00"),
(DEFAULT, "grba", "Great Basin National Park", "NV", "https://www.nps.gov/common/uploads/structured_data/3C876E30-1DD8-B71B-0B6A6CDF68B4FA89.jpg", "https://www.nps.gov/grba/index.htm", "0000-00-00 00:00:00", "0000-00-00 00:00:00"),
(DEFAULT, "gumo", "Guadalupe Mountains National Park", "TX", "https://www.nps.gov/common/uploads/structured_data/3C825A11-1DD8-B71B-0BAAA0BDF174AA2F.jpg", "https://www.nps.gov/gumo/index.htm", "0000-00-00 00:00:00", "0000-00-00 00:00:00"),
(DEFAULT, "grca", "Grand Canyon National Park", "AZ", "https://www.nps.gov/common/uploads/structured_data/3C7B12D1-1DD8-B71B-0BCE0712F9CEA155.jpg", "https://www.nps.gov/grca/index.htm", "0000-00-00 00:00:00", "0000-00-00 00:00:00"),
(DEFAULT, "grsa", "Great Sand Dunes National Park & Preserve", "CO", "https://www.nps.gov/common/uploads/structured_data/3C7CE386-1DD8-B71B-0B14D302825B96CF.jpg", "https://www.nps.gov/grsa/index.htm", "0000-00-00 00:00:00", "0000-00-00 00:00:00"),
(DEFAULT, "jotr", "Joshua Tree National Park", "CA", "https://www.nps.gov/common/uploads/structured_data/3C85E84D-1DD8-B71B-0B188E7820D60F14.jpg", "https://www.nps.gov/jotr/index.htm", "0000-00-00 00:00:00", "0000-00-00 00:00:00"),
(DEFAULT, "lake", "Lake Mead National Recreation Area", "AZ,NV", "https://www.nps.gov/common/uploads/structured_data/3C79D292-1DD8-B71B-0B9A850B0D5AAAFC.jpg", "https://www.nps.gov/lake/index.htm", "0000-00-00 00:00:00", "0000-00-00 00:00:00"),
(DEFAULT, "meve", "Mesa Verde National Park", "CO", "https://www.nps.gov/common/uploads/structured_data/3C7C0089-1DD8-B71B-0BC397BA671C0616.jpg", "https://www.nps.gov/meve/index.htm", "0000-00-00 00:00:00", "0000-00-00 00:00:00"),
(DEFAULT, "moja", "Mojave National Preserve", "CA", "https://www.nps.gov/common/uploads/structured_data/3C87561A-1DD8-B71B-0BB71D193B42FC5A.jpg", "https://www.nps.gov/moja/index.htm", "0000-00-00 00:00:00", "0000-00-00 00:00:00"),
(DEFAULT, "sagu", "Saguaro National Park", "AZ", "https://www.nps.gov/common/uploads/structured_data/3C858462-1DD8-B71B-0BB499810C61332C.jpg", "https://www.nps.gov/sagu/index.htm", "0000-00-00 00:00:00", "0000-00-00 00:00:00"),
(DEFAULT, "zion", "Zion National Park", "UT", "https://www.nps.gov/common/uploads/structured_data/3C7EFF41-1DD8-B71B-0B50E940FE9F2658.jpg", "https://www.nps.gov/zion/index.htm", "0000-00-00 00:00:00", "0000-00-00 00:00:00"),
(DEFAULT, "yose", "Yosemite National Park", "CA", "https://www.nps.gov/common/uploads/structured_data/3C84C3C0-1DD8-B71B-0BFF90B64283C3D8.jpg", "https://www.nps.gov/yose/index.htm", "0000-00-00 00:00:00", "0000-00-00 00:00:00"),
(DEFAULT, "grsm", "Great Smoky Mountains National Park", "NC,TN", "https://www.nps.gov/common/uploads/structured_data/3C80EC37-1DD8-B71B-0B87F63E8B030D15.jpg", "https://www.nps.gov/grsm/index.htm", "0000-00-00 00:00:00", "0000-00-00 00:00:00"),
(DEFAULT, "whsa", "White Sands National Park", "NM", "https://www.nps.gov/common/uploads/structured_data/3C7FE691-1DD8-B71B-0B21F94DBD31A965.jpg", "https://www.nps.gov/whsa/index.htm", "0000-00-00 00:00:00", "0000-00-00 00:00:00");

SELECT * FROM `nationalparks`;