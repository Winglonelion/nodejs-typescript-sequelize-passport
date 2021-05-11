import { createToken } from 'api/utils/jwt-token';
import passport from 'passport';
import passportLocal from 'passport-local';
import User from 'models/User';
import { HTTP_MESSAGES } from 'constants/http-messages';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

passport.use(
  'login',
  new passportLocal.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email: string, password: string, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (user === null) {
          return done(
            {
              message: HTTP_MESSAGES.INVALID_CREDENTIALS,
              auth: false,
              response: { status: 400 },
            },
            false
          );
        }

        const validated = await user.validatePassword(password);

        if (!validated) {
          return done(
            {
              message: HTTP_MESSAGES.INVALID_CREDENTIALS,
              auth: false,
              response: { status: 400 },
            },
            false
          );
        }

        return done(null, user);
      } catch (err) {
        /* istanbul ignore next */
        return done(err);
      }
    }
  )
);

const handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: HTTP_MESSAGES.VALIDATION_ERROR,
        errors: errors.array(),
      });
    }

    passport.authenticate('login', (err: Error, user: User, info) => {
      if (err) return next(err);
      if (info) return res.json(info);
      req.logIn(user, async (err) => {
        if (err) return next(err);
        // if (cms && !user.isAdmin) {
        // { return next(
        //   {
        //     message: HTTP_MESSAGES.INVALID_CREDENTIALS,
        //     response: { status: 400 }
        //   },
        //   null
        // );
        // }

        const token = await createToken(user);
        res.status(200).json({
          auth: true,
          token: token,
        });
      });
    })(req, res, next);
  } catch (err) {
    next(err);
  }
};

export default handler;
