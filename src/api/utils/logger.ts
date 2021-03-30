import { createLogger, format, transports } from "winston";
import expressWinston from "express-winston";

const httpTransportOptions = {
  // host: "http-intake.logs.datadoghq.eu",
  // path:
  //   "/v1/input/b2d2c72c53abef2bdcbba19a5c815cf4?ddsource=nodejs&service=auth_service",
  ssl: true,
};

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "auth-service" },
  transports: [
    // new transports.File({ filename: "quick-start-error.log", level: "error" }),
    // new transports.File({ filename: "quick-start-combined.log" }),
    new transports.Console(),
    new transports.Http(httpTransportOptions),
  ],
});

const exp = expressWinston.logger({ winstonInstance: logger });
export default exp;
