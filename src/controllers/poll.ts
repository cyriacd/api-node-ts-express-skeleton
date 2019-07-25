import Controller from "./controller";
import { Router } from "express";

export default class PollController extends Controller {
  private router: Router;
  // private userData = new UserData();

  constructor() {
    super();
    this.router = Router();
    // this.userData = new UserData();
    this.router.post("/", this.login);
  }

  public getRouter(): Router {
    return this.router;
  }

  private createPoll = async (req: Request, res: Response) => {
    const title = req.body.title;
    const description = req.body.description;
    const polloptions = req.body.polloptions;
    // TODO validate the values and send error
    
  }

}