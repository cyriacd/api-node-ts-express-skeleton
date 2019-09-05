import pgPromise from "pg-promise";
import config from "../config";
import logger from "../logger";

const database = config.get("DB_NAME");
const host = config.get("DB_HOST");
const password = config.get("DB_PASSWORD");
const port = Number(config.get("DB_PORT"));
const user = config.get("DB_USER");

const pgp = pgPromise();
const db = pgp(`postgres://${user}:${password}@${host}:${port}/${database}`);
export default db;
