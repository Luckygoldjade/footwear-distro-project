/* 
Citation for the following express setup, routes, and listeners:
Date: 10/31/2023
Copied from:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database
*/

var mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "classmysql.engr.oregonstate.edu",
  user: "cs340_[your_onid]",
  password: "[your_db_password]",
  database: "cs340_[your_onid]",
});

module.exports.pool = pool;
