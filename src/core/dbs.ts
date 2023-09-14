// const { Pool } = require('pg');

import { Pool } from "pg";
import config from "src/config";

const pool = new Pool({
  user: config.db.user,
  password: config.db.password,
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
});

export default pool;
