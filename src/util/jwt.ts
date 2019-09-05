import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import Controller from "../controllers/controller";
import logger from "../logger";
import User from "../models/user";

export const getToken = (data: any): string => {
  return jwt.sign(
    {
      data,
    },
    config.getSecret(),
    { expiresIn: "2h" },
  );
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, config.getSecret());
};

export const getUser = (req: Request): User => {
  const authToken = req.headers.authorization.toString();
  const payload = verifyToken(authToken.split(" ")[1]);
  console.log(payload.data);
  return payload.data;
};


export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authToken = req.headers.authorization.toString();
    const payload = verifyToken(authToken.split(" ")[1]);
    req.params.user = payload;
    next();
  } catch (e) {
    Controller.sendErrorMessage(
      new Error("Unable to authorize user"),
      res,
      401,
    );
  }
};
