const mysql = require("mysql2");
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send({ message: "Welcome to App!" }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Robisageek2021",
  database: "warmovies",
});

connection.connect(
  (err) => (err ? err : console.log(`connected to mysql!`)),
  connection.query(
    `CREATE DATABASE IF NOT EXISTS warmovies`,
    (err, result) => (err ? err : console.log(`DATABASE CREATED!`)),
    connection.query(
      `CREATE TABLE movies(id INT PRIMARY KEY, name VARCHAR(255), year INT(4), country VARCHAR(255))`,
      (err, result) => (err ? err : console.log(`Table created!`)),
      connection.query(
        `INSERT INTO movies(id, name, year, country) VALUES ('1', 'PATTON', '1970', 'USA')`,
        (err, result) => (err ? err : console.log(`Table created!`)),
      ),
      connection.end(),
    ),
  ),
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`app listening at ${PORT}`));
