import express, { Application } from "express";
import cors from 'cors'
import api from 'api'

// const logger = require("./api/utils/logger");
const server: Application = express();

const port = parseInt(process.env.PORT ?? '', 10) || 3000;

server.use(cors());
// server.use(logger);

server.get("/ping", (req, res) => {
  return res.send("pong");
});

server.use("/", api);

server.listen(port, () => {
  console.log(
    `> Ready on http://localhost:${port}`
  ); /* eslint-disable no-console */
});

export default server
