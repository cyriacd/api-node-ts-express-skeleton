import bcrypt from "bcrypt";
import { Request, Response, Router } from "express";
import UserData from "../data/user";
import logger from "../logger";
import User from "../models/user";
import { getToken } from "../util/jwt";
import Controller from "./controller";

export default class UserController extends Controller {
  private router: Router;
  private userData = new UserData();

  constructor() {
    super();
    this.router = Router();
    this.userData = new UserData();
    this.router.post("/login", this.login);
    this.router.post("/register", this.register);
    this.router.post("", this.login);
  }

  public getRouter(): Router {
    return this.router;
  }

  private login = async (req: Request, res: Response) => {
    const email = req.body.email.toString();
    const password = req.body.password.toString();
    try {
      const user: User = await this.userData.getUserByEmail(email);
      logger.info(user);
      logger.info(password);
      logger.info(user.getPassword());
      logger.info(bcrypt.compare(password, user.getPassword()));
      if (await bcrypt.compare(password, user.getPassword())) {
        res.json({
          status: "logged in",
          token: getToken(user.getUserData()),
        });
      } else {
        Controller.sendErrorMessage(new Error("Unauthorized"), res, 401);
      }
    } catch (e) {
      Controller.sendErrorMessage(e, res, 401);
    }
  }

  private register = async (req: Request, res: Response) => {
    if (
      req.headers.email === undefined ||
      req.headers.password === undefined ||
      req.headers.name === undefined
    ) {
      Controller.sendErrorMessage(new Error("Did not get user data"), res, 400);
      return;
    }
    const email = req.headers.email.toString();
    const password = req.headers.password.toString();
    const name = req.headers.name.toString();
    const hashPassword = await bcrypt.hash(password, 10);
    this.userData.createUser(new User(name, email, hashPassword)).then((value) => {
      logger.info(value);
      res.json(value);
    }).catch((e) => {
      Controller.sendErrorMessage(new Error("Unable to create this user"), res);
    });
    // }
  }
}
