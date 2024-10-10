const { Pool } = require("pg");
require("dotenv").config({ path: "../src/config/ormpath.env" });
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mebelin',
  password: 1234,
  port: 5432,
});
module.exports = pool;
