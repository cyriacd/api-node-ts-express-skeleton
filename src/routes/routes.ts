import express, { Router } from "express";
import PollController from "../controllers/poll";
import UserController from "../controllers/user";

export default class RouteManager {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public registerController(): void {
    const userController = new UserController();
    const pollController = new PollController();
    this.router.use("/user", userController.getRouter());
    this.router.use("/poll", pollController.getRouter());
  }

  public getRouter(): Router {
    return this.router;
  }
}
