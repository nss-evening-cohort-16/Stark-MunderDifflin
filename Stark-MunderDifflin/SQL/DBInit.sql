﻿USE MASTER
GO

IF NOT EXISTS (
    SELECT [name]
    FROM sys.databases
    WHERE [name] = N'MunderDifflin'
)
CREATE DATABASE MunderDifflin
GO

USE MunderDifflin
GO


DROP TABLE IF EXISTS Paper;
DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS [Order];
DROP TABLE IF EXISTS OrderItem;

CREATE TABLE Paper (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
	[Name] VARCHAR(55) NOT NULL,
    Color VARCHAR(55) NOT NULL,
    [Length] INTEGER NOT NULL,
    Width INTEGER NOT NULL,
    [Weight] INTEGER NOT NULL,
    [Price] DECIMAL(9,2) NOT NULL,
    ImageURL TEXT
);

CREATE TABLE Customer (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
	[Name] VARCHAR(55) NOT NULL,
    Email VARCHAR(55) NOT NULL,
    [UID] VARCHAR(55) NOT NULL UNIQUE,
    CONSTRAINT UQ_Email UNIQUE(Email)
);

CREATE TABLE [Order] (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
	CustomerId VARCHAR(55) NOT NULL,
    IsOpen BIT NOT NULL,
    CONSTRAINT FK_Customer FOREIGN KEY (CustomerId) REFERENCES [Customer]([UID]) ON DELETE CASCADE
);

CREATE TABLE OrderItem (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
	PaperId INTEGER NOT NULL,
    OrderId INTEGER NOT NULL,
    Quantity INTEGER NOT NULL,
    CONSTRAINT FK_Paper FOREIGN KEY (PaperId) REFERENCES [Paper](Id) ON DELETE CASCADE,
    CONSTRAINT FK_Order FOREIGN KEY (OrderId) REFERENCES [Order](Id) ON DELETE CASCADE
);

INSERT INTO Paper ([Name], Color, [Length], Width, [Weight], [Price], ImageURL) VALUES ('Arches 88 Sild Screen Paper', 'White', 22, 30, 140, 2.99, 'https://i.imgur.com/3aucv1x.jpg');
INSERT INTO Paper ([Name], Color, [Length], Width, [Weight], [Price], ImageURL) VALUES ('Hahnemuhle German Etching Paper', 'Cream', 22, 30, 300, 1.99, 'https://i.imgur.com/e7oPdpi.jpg');
INSERT INTO Paper ([Name], Color, [Length], Width, [Weight], [Price], ImageURL) VALUES ('Legion Somerset Printmaking Paper', 'Antique', 30, 44, 280, 3.99, 'https://i.imgur.com/jKFsoJs.jpg');
INSERT INTO Paper ([Name], Color, [Length], Width, [Weight], [Price], ImageURL) VALUES ('BFK Rives Printmaking Papers', 'Black', 22, 30, 280, 5.99, 'https://i.imgur.com/qPZOsv2.jpg');
INSERT INTO Paper ([Name], Color, [Length], Width, [Weight], [Price], ImageURL) VALUES ('Awagami Bamboo Select Paper', 'Cream', 17, 20, 170, 0.79, 'https://i.imgur.com/1puf1fV.jpg');

INSERT INTO Customer ([Name], Email, [UID]) VALUES ('Pam', 'pam@gmail.com', 1234);
INSERT INTO Customer ([Name], Email, [UID]) VALUES ('Dwight', 'dwight@gmail.com', 3456);
INSERT INTO Customer ([Name], Email, [UID]) VALUES ('Big Tuna', 'bigtuna@gmail.com', 2345);
INSERT INTO Customer ([Name], Email, [UID]) VALUES ('Pat Thetic', 'sad@gmail.com', 2875);

INSERT INTO [Order] (CustomerId, IsOpen) VALUES (1234, 0);
INSERT INTO [Order] (CustomerId, IsOpen) VALUES (1234, 0);
INSERT INTO [Order] (CustomerId, IsOpen) VALUES (2345, 0);
INSERT INTO [Order] (CustomerId, IsOpen) VALUES (3456, 0);

