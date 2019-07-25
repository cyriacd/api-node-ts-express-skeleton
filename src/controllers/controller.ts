import express, { Request, Response } from "express";
import HttpStatus from "http-status-codes";

export default class Controller {
  public static sendErrorMessage(
    err: Error,
    res: Response,
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
  ): void {
    res.status(statusCode).json({
      message: err.message,
      status: statusCode,
    });
  }
}
