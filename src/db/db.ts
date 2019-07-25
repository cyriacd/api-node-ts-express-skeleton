import knex from "knex";
import config from "../config";
import logger from "../logger";

const dbType = config.get("DB_TYPE");

// let db: knex;

// switch (dbType) {
//   case "sqlite3": {
//     db = knex({
//       client: "sqlite3",
//       connection: {
//         filename: "./db.sqlite",
//       },
//     });
//   }
//   case "pg": {
const db = knex({
  client: "pg",
  connection: {
    database: config.get("DB_NAME"),
    host: config.get("DB_HOST"),
    password: config.get("DB_PASSWORD"),
    port: Number(config.get("DB_PORT")),
    user: config.get("DB_USER"),
  },
});
logger.info(db);
// }
// default: {
//   logger.error("No DB config given");
// }
// }

export default db;
