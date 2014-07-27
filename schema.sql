DROP DATABASE IF EXISTS social_app;

CREATE DATABASE social_app;

\c social_app

CREATE TABLE IF NOT EXISTS people (
  id serial primary key,
  firstname varchar(25),
  lastname varchar(25),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);


INSERT INTO people (firstname, lastname) VALUES ('Palmer','Sanderson');
INSERT INTO people (firstname, lastname) VALUES ('Ricky','Bobby');

\d+ people
\q

