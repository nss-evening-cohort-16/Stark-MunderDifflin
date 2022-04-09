USE MASTER
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
);

CREATE TABLE Customer (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
	[Name] VARCHAR(55) NOT NULL,
    Email VARCHAR(55) NOT NULL,
    CONSTRAINT UQ_Email UNIQUE(Email)
);

CREATE TABLE [Order] (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
	CustomerId INTEGER NOT NULL,
	OrderId INTEGER NOT NULL,
    IsOpen BIT NOT NULL,
    CONSTRAINT FK_Customer FOREIGN KEY (CustomerId) REFERENCES [Customer](Id) ON DELETE CASCADE
);

CREATE TABLE OrderItem (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
	PaperId INTEGER NOT NULL,
    OrderId INTEGER NOT NULL,
    CONSTRAINT FK_Paper FOREIGN KEY (PaperId) REFERENCES [Paper](Id) ON DELETE CASCADE,
    CONSTRAINT FK_Order FOREIGN KEY (OrderId) REFERENCES [Order](Id) ON DELETE CASCADE
);

INSERT INTO Paper ([Name], Color, [Length], Width, [Weight]) VALUES ('Arches 88 Sild Screen Paper', 'White', 22, 30, 140);
INSERT INTO Paper ([Name], Color, [Length], Width, [Weight]) VALUES ('Hahnemuhle German Etching Paper', 'Cream', 22, 30, 300);
INSERT INTO Paper ([Name], Color, [Length], Width, [Weight]) VALUES ('Legion Somerset Printmaking Paper', 'Antique', 30, 44, 280);
INSERT INTO Paper ([Name], Color, [Length], Width, [Weight]) VALUES ('BFK Rives Printmaking Papers', 'Black', 22, 30, 280);
INSERT INTO Paper ([Name], Color, [Length], Width, [Weight]) VALUES ('Awagami Bamboo Select Paper', 'Cream', 17, 20, 170);


