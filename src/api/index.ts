import express, { Application, ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import bodyParser from "body-parser";
import passport from "passport";
import useJWT from './middlewares/jwt.auth'

import routes from './routes'
const { version } = require("../../package.json");
import HttpException from './utils/error-handler';



const api = express();

api.use(passport.initialize());
useJWT()
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

Object.values(routes).forEach(({name, router}) => {
  if (!name || !router) return;
  api.use(`/api/v1/${name}`, router);
});

api.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  const {status} = err;
  /* istanbul ignore next */
  if (status) {
    res.status(status).json({
      error: {
        name: err.name,
        message: err.message,
        data: err.data,
      },
    });
    return
  } else next(err);
});

/* istanbul ignore next */
api.get("/version", (req, res) => {
  res.send(version);
});

api.use((e: any, req: Request, res: Response, next: NextFunction) => {
  const status = e.response ? e.response.status : 500;
  res.status(status).json({ message: e.message });
  next(e);
});

export default api;
