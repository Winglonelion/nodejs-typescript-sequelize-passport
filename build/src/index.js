"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("api"));
// const logger = require("./api/utils/logger");
const server = express_1.default();
const port = parseInt(process.env.PORT ?? '', 10) || 3000;
server.use(cors_1.default());
// server.use(logger);
server.get("/ping", (req, res) => {
    return res.send("pong");
});
server.use("/", api_1.default);
server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`); /* eslint-disable no-console */
});
exports.default = server;
//# sourceMappingURL=index.js.map