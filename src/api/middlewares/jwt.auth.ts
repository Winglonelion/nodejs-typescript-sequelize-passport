import passport from "passport";

import passportJwt from "passport-jwt";
import config from "config";
const { User } = require("../models")();
const constants = require("../constants");

/* istanbul ignore next */
const jwt = () => {
  return passport.use(
    "jwt",
    new passportJwt.Strategy(
      {
        jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme(
          "Bearer"
        ),
        secretOrKey: config.get("jwt.publicKey"),
      },
      (payload, done) => {
        try {
          User.findOne({ where: { email: payload.sub } }).then((user) => {
            if (user === null)
              return done(null, false, { message: constants.USER_NOT_FOUND });
            return done(null, user);
          });
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};

export default jwt
