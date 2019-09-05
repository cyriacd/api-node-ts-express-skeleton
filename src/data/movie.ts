import db from "../db/db";
import logger from "../logger";
import Movie from "../models/movie";

export default class MovieData {
  public async getAllMovies(): Promise<any> {
    return db
      .from("movies")
      .select("id", "title")
      .then((rows) => {
        if (rows.length < 1) {
          logger.error(`Unable to find movies`);
        }
        // const userRow = rows[0];
        return rows;
        // return new User(userRow.name, userRow.email, userRow.password);
      }).catch((e) => {
        return [];
      }) ;
  }

  public async getMovieByTitle(title: string): Promise<any> {
    return db
      .from("movies")
      .select("id", "title")
      .where({title})
      .then((rows: any) => {
        if (rows.length < 1) {
          logger.error(`Unable to find movies`);
          throw new Error("Unable to find movie");
        }
        // const userRow = rows[0];
        return rows.data;
        // return new User(userRow.name, userRow.email, userRow.password);
      });
  }

  public async createMovie(movie: Movie): Promise<any> {
    return db
      .from("movies")
      .insert(movie)
      .then((data: any) => {
        if (data.rowCount < 1) {
          logger.error(`Unable to create movie`);
          throw new Error("Unable to create movie");
        }
        // const userRow = rows[0];
        return data.rows;
        // return new User(userRow.name, userRow.email, userRow.password);
      });
  }

  public async updateMovie(id: number, movie: Movie): Promise<any> {
    return db
      .from("movies")
      .where({id})
      .update(movie)
      .then((data: any) => {
        if (data.rowCount < 1) {
          logger.error(`Unable to update movie`);
          throw new Error("Unable to update movie");
        }
        // const userRow = rows[0];
        return data.rows;
        // return new User(userRow.name, userRow.email, userRow.password);
      });
  }
}
