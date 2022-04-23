ALTER TABLE Paper
ADD ImageURL text;

UPDATE Paper
SET ImageURL = 'https://i.imgur.com/3aucv1x.jpg'
WHERE [Name] = 'Arches 88 Sild Screen Paper';

UPDATE Paper
SET ImageURL = 'https://i.imgur.com/e7oPdpi.jpg'
WHERE [Name] = 'Hahnemuhle German Etching Paper';

UPDATE Paper
SET ImageURL = 'https://i.imgur.com/jKFsoJs.jpg'
WHERE [Name] = 'Legion Somerset Printmaking Paper';

UPDATE Paper
SET ImageURL = 'https://i.imgur.com/qPZOsv2.jpg'
WHERE [Name] = 'BFK Rives Printmaking Papers';

UPDATE Paper
SET ImageURL = 'https://i.imgur.com/1puf1fV.jpg'
WHERE [Name] = 'Awagami Bamboo Select Paper';