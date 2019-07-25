import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import HttpStatus from "http-status-codes";
import config from "./config";
import logger from "./logger";
import RouteManager from "./routes/routes";
import { authenticate } from "./util/jwt";

logger.info(config.get("NODE_ENV"));
const app = express();
app.use(cors());
app.use(bodyParser.json());

const routes = new RouteManager();
routes.registerController();
app.use("/api/v1", routes.getRouter());
app.get(
  "/protected",
  authenticate,
  (req: express.Request, res: express.Response) => {
    res.json({
      dummylist: [
        {
          age: 15,
          loc: "NJ",
          name: "Jack",
        },
        {
          age: 26,
          loc: "FL",
          name: "Austin",
        },
        {
          age: 37,
          loc: "MN",
          name: "John",
        },
        {
          age: 55,
          loc: "NY",
          name: "Isaac",
        },
        {
          age: 75,
          loc: "OH",
          name: "Ayoade",
        },
        {
          age: 89,
          loc: "NC",
          name: "James",
        },
      ],
      user: req.params.user,
    });
  },
);
app.get("*", (req: express.Request, res: express.Response) => {
  res.status(HttpStatus.NOT_FOUND).json({
    status: 404,
  });
});

const port = config.get("PORT") || 8080;

app.listen(port, (): void => {
  logger.info(`Listening on port: ${port}`);
});
