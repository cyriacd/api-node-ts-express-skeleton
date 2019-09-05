import express, { Router } from "express";
import MovieController from "../controllers/movie";
import TaskController from "../controllers/task";
import UserController from "../controllers/user";
import { authenticate } from "../util/jwt";

export default class RouteManager {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public registerController(): void {
    const userController = new UserController();
    const movieController = new MovieController();
    const taskController = new TaskController();
    this.router.use("/user", userController.getRouter());
    this.router.use("/movies", authenticate, movieController.getRouter());
    this.router.use("/tasks", authenticate, taskController.getRouter());
  }

  public getRouter(): Router {
    return this.router;
  }
}
