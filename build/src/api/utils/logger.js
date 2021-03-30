"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const express_winston_1 = __importDefault(require("express-winston"));
const httpTransportOptions = {
    // host: "http-intake.logs.datadoghq.eu",
    // path:
    //   "/v1/input/b2d2c72c53abef2bdcbba19a5c815cf4?ddsource=nodejs&service=auth_service",
    ssl: true,
};
const logger = winston_1.createLogger({
    level: "info",
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json()),
    defaultMeta: { service: "auth-service" },
    transports: [
        // new transports.File({ filename: "quick-start-error.log", level: "error" }),
        // new transports.File({ filename: "quick-start-combined.log" }),
        new winston_1.transports.Console(),
        new winston_1.transports.Http(httpTransportOptions),
    ],
});
const exp = express_winston_1.default.logger({ winstonInstance: logger });
exports.default = exp;
//# sourceMappingURL=logger.js.map