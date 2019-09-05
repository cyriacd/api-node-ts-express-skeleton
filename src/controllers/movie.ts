import MovieData from "../data/movie";
import Controller from "./controller";

import { Request, Response, Router } from "express";
import Movie from "../models/movie";

export default class MovieController extends Controller {
  private router: Router;
  private movieData = new MovieData();

  constructor() {
    super();
    this.router = Router();
    this.movieData = new MovieData();
    this.router.get("/", this.getMovies);
    // this.router.get("/", this.getMovieByTitle);
    this.router.post("/", this.createMovie);
    this.router.post("/:id", this.updateMovie);
    this.router.delete("/:id", this.deleteMovie);
  }

  public getRouter(): Router {
    return this.router;
  }

  private getMovies = async (req: Request, res: Response) => {
    let data = [];
    if (req.query.title === undefined){
      data = await this.movieData.getAllMovies().catch((e) => {
        return [];
      });
    } else {
      data = await this.movieData.getMovieByTitle(req.query.title).catch((e) => {
        return [];
      });
    }
    res.json({ data });
  }

  private createMovie = async (req: Request, res: Response) => {
    const movie: Movie = new Movie(req.body.title);

    const data = await this.movieData.createMovie(movie);
    res.json({ movie });
  }

  private updateMovie = async (req: Request, res: Response) => {
    const id = req.params.id;
    const movie: Movie = new Movie(req.body.title);

    const data = await this.movieData.updateMovie(id, movie);

    res.json({ movie });
  }

  private deleteMovie = async (req: Request, res: Response) => {
    const data = await this.movieData.getAllMovies();
    res.json({ data });
  }
}
