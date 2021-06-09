const mysql = require("mysql2");
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send({ message: "Welcome to App!" }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysqlpassmacrob",
  database: "bestwarmovies",
});

connection.connect(
  (err) => (err ? err : console.log(`Connected to MySQL Database!`)),
  connection.query(
    `CREATE DATABASE IF NOT EXISTS bestwarmovies;`,
    (err, result) => (err ? err : console.log(`${result}: Database Created!`)),
  ),
);

connection.connect(
  (err) => (err ? err : console.log(`CREATING TABLE...`)),
  connection.query(
    `CREATE TABLE movies(id INT PRIMARY KEY, name VARCHAR(255), year INT(4), country VARCHAR(255));`,
    (err, result) => (err ? err : console.log(`${result}: Table created!`)),
  ),
);

connection.connect((err) => {
  err ? err : console.log(`INSERTING INTO DATABASE...`);
  let sql = `INSERT INTO movies(id, name, year, country) VALUES ?;`;
  let values = [
    ["1", "Patton", "1970", "USA"],
    ["2", "Saving Private Ryan", "1998", "USA"],
    ["3", "Apocalypse Now", "1979", "USA"],
    ["4", "The Hurt Locker", "2008", "USA"],
    ["5", "Full Metal Jacket", "1987", "USA"],
    ["6", "Schindler's List ", "1993", "USA"],
    ["7", "Dunkirk", "2017", "USA"],
    ["8", "1917", "2019", "UK"],
  ];
  connection.query(sql, [values], (err, result) =>
    err
      ? err
      : console.log(`Number of records inserted ${result.affectedRows}`),
  );
});

connection.connect((err) => {
  err ? err : console.log(`SELECTING FROM DATABASE...`);
  let sql = `SELECT * FROM bestwarmovies;`;
  connection.query(sql, (err, result) => (err ? err : console.log(result)));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`app listening at ${PORT}`));
