import bodyParser from "body-parser";
import express from "express";
import HttpStatus from "http-status-codes";
import config from "./config";
import logger from "./logger";
// import RouteManger from './routes/RouteManger'

logger.info(config.get("NODE_ENV"));
const app = express();
app.use(bodyParser.json());
app.get("*", (req: express.Request, res: express.Response) => {
  res.status(HttpStatus.NOT_FOUND).json({
    status: 404,
  });
});

const port = config.get("PORT") || 8080;

app.listen(port, (): void => {
  logger.info(`Listening on port: ${port}`);
});
