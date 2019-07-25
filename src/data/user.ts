import db from "../db/db";
import logger from "../logger";
import User from "../models/user";

export default class UserData {
  public async getUserByEmail(email: string): Promise<User> {
    return db
      .from("users")
      .select("name", "email", "password")
      .then((rows) => {
        if (rows.length < 1) {
          logger.error(`Unable to find user ${email}`);
          throw new Error("Unable to find User");
        }
        const userRow = rows[0];
        return new User(userRow.name, userRow.email, userRow.password);
      });
  }

  public async createUser(user: User): Promise<User> {
    return db
      .from("users")
      .insert(user.toDBObject())
      .then((val) => {
        logger.info(val);
        return user;
      });
  }
}
