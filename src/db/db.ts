import { configDotenv } from "dotenv";
import { Knex } from "knex";

configDotenv();

const knexConfig: Knex.Config = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};

const knex = require("knex")(knexConfig);

export default knex;
