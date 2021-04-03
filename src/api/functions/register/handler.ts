import { createToken } from "api/utils/jwt-token";
import passport from "passport";
import passportLocal from "passport-local";
import { validationResult }from "express-validator";
import User from "models/User";
import { HTTP_MESSAGES } from "constants/http-messages";
import HttpException from "api/utils/error-handler";
import { NextFunction, Request, Response } from "express";


declare global {
  namespace Express {
    interface User  {
      id: number
    }
  }
}



passport.serializeUser<any, any>((req, user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ where: { id } })
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  "register",
  new passportLocal.Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {

      try {
        const user = await User.findOne({ where: { email } })
        if (user) {
          return done({
            message: HTTP_MESSAGES.EMAIL_ALREADY_EXISTS,
            response: { status: 400 },
          });
        }

          const newUser = await User.create({ email })
          await newUser.setPassword(password)
                return done(null, user);
          } catch (error) {
        done(error);
      }
    }
  )
);

const handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(422).json({
    //     message: HTTP_MESSAGES.VALIDATION_ERROR,
    //     errors: errors.array(),
    //   });
    // }

    passport.authenticate("register", (err: Error, user: User) => {
      try {
        if (err) throw err;
        req.logIn(user, async (err: Error) => {
          /* istanbul ignore next */
          if (err) throw err;
          const foundUser = await  User.findOne({ where: { email: user.email } })

          if (!foundUser) throw new HttpException(500, HTTP_MESSAGES.USER_NOT_FOUND)
          const token = await createToken(foundUser)
                res.status(200).json({
                  auth: true,
                  token: token,
                  message: HTTP_MESSAGES.USER_CREATED,
                });
        });
      } catch (err) {
        return next(err);
      }
    })(req, res, next);
  } catch (err) {
    next(err);
  }
};

export default handler
