import db from "../db/db";
import logger from "../logger";
import Task from "../models/task";

export default class TaskData {
  public async getAllTasks(): Promise<Task[]> {
    return db
      .from("task_list")
      .select("*")
      .then((rows) => {
        if (rows.length < 1) {
          logger.error(`Unable to find any tasks`);
        }
        logger.info(rows);
        return rows;
      }).catch((e) => {
        return [];
      }) ;
  }

  public async startTask(taskId: number, userId: number): Promise<Date> {
    const currTime = new Date().toISOString();
    return db
      .from("task_log")
      .insert({
        user_id: userId,
        start_time: currTime,
        task_id: taskId,
      })
      .then((result) => {
        return currTime;
      }).catch((e) => {
        logger.info(e);
        return undefined;
      });
  }

  public async stopTask(taskId: number, userId: number): Promise<any> {
    const currTime = new Date().toISOString();
    return db
      .from("task_log")
      .select("id")
      .where({
        task_id: taskId,
        user_id: userId,
        end_time: null,
      }).then((data: any): any => {
        console.log("stop task", data);
        if(data.length === 1){
          return db.from("task_log")
          .update({
            end_time: currTime,
          })
          .where({
            id: data[0].id,
          })
        }
      });
  }

  public async createTaskLog(taskId: number, userId: number, startTime: Date, endTime: Date): Promise<any> {
    return db
      .from("task_log")
      .insert({
        user_id: userId,
        start_time: startTime,
        end_time: endTime,
        task_id: taskId,
      })
      .then((result: any) => {
        if(result.rowCount < 1){
          throw new Error("task log not added");
        }
        return {
          user_id: userId,
          start_time: startTime,
          end_time: endTime,
          task_id: taskId,
        };
      }).catch((e: Error) => {
        logger.info(e);
        throw e;
      });
  }

  public async getTaskLogs(userid: number, taskid: number): Promise<any> {
    console.log("user id", userid, " taskid ", taskid);

    return db
    .from("task_log")
    .select("*")
    .where({
      task_id: taskid,
      user_id: userid,
    })
    .then((rows) => {
      console.log(rows);
      if (rows.length < 1) {
        logger.error(`Unable to find any tasks`);
      }
      logger.info(rows);
      return rows;
    }).catch((e) => {
      return [];
    }) ;
  }
}
