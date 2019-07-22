import winston, { format } from "winston";

const { combine, timestamp, label, prettyPrint } = format;

const logger = winston.createLogger({
  format: combine(timestamp(), prettyPrint(), format.splat(), format.simple()),
  transports: [new winston.transports.Console()],
});

export default logger;
