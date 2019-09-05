import TaskData from "../data/task";
import Controller from "./controller";

import { Request, Response, Router } from "express";
import logger from "../logger";
import Task from "../models/task";
import User from "../models/user";
import { getUser } from "../util/jwt";

export default class TaskController extends Controller {
  private router: Router;
  private taskData = new TaskData();

  constructor() {
    super();
    this.router = Router();
    this.taskData = new TaskData();
    this.router.get("/", this.getTasks);
    this.router.post("/:taskid/start", this.startTask);
    this.router.post("/:taskid/stop", this.stopTask);
    this.router.post("/task_log", this.createTaskLog);
    // this.router.get("/", this.getTaskByTitle);
    // this.router.post("/", this.createTask);
    // this.router.post("/:id", this.updateTask);
    // this.router.delete("/:id", this.deleteTask);
  }

  public getRouter(): Router {
    return this.router;
  }

  private getTasks = async (req: Request, res: Response) => {
    let data = [];
    // if (req.query.title === undefined){
    data = await this.taskData.getAllTasks().catch((e: Error): Task[] => {
      logger.info("No tasks found!");
      logger.error(e.message);
      return [];
    });
    // } else {
    //   data = await this.taskData.getTaskByTitle(req.query.title).catch((e: any) => {
    //     return [];
    //   });
    // }
    const user: any = getUser(req);
    const tasks = data.map(async (task) => {
      return Object.assign({}, task, {
        logs: await this.taskData.getTaskLogs(user.id, task.id),
      });
    });
    res.json({ data: await Promise.all(tasks) });
  }

  private startTask = async (req: Request, res: Response) => {
    const taskId = req.params.taskid;
    const user: any = getUser(req);
    logger.info(`task : ${taskId}`);
    logger.info(`user : ${user.email}`);
    this.taskData.startTask(taskId, user.id).then((startTime: any) => {
      if (startTime === undefined){
        Controller.sendErrorMessage(new Error("Unable to start Task Log"), res);
      } else {
        res.json({startTime});
      }
    });
  }

  private stopTask = async (req: Request, res: Response) => {
    const taskId = req.params.taskid;
    const user: any = getUser(req);
    logger.info(`task : ${taskId}`);
    logger.info(`user : ${user.email}`);
    this.taskData.stopTask(taskId, user.id).then((data: any) => {
      res.json(data);
    });
  }

  private createTaskLog = async (req: Request, res: Response) => {
    const taskId = req.body.taskid;
    const user: any = getUser(req);
    const starttime: Date = req.body.starttime;
    const endtime: Date = req.body.endtime;

    logger.info(`task : ${taskId}`);
    logger.info(`user : ${user.email}`);
    this.taskData.createTaskLog(taskId, user.id, starttime, endtime).then((data: any) => {
      res.json(data);
    }).catch((e) => {
      Controller.sendErrorMessage(new Error("Unable to create a new log"), res, 400);
    });
  }

  

}
