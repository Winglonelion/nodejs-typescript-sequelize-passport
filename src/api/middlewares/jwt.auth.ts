import passport from "passport";

import passportJwt from "passport-jwt";
import { CONFIGS } from "constants/config";
import { HTTP_MESSAGES } from "constants/http-messages";
import User from "models/User";






/* istanbul ignore next */
const useJWT = () => {
  return passport.use(
    "jwt",
    new passportJwt.Strategy(
      {
        jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme(
          "Bearer"
        ),
        secretOrKey: CONFIGS.JWT.PUBLIC_KEY,
      },
      (payload, done) => {
        try {
          User.findOne({ where: { email: payload.sub } }).then((user) => {
            if (user === null) {
              return done(null, false, { message: HTTP_MESSAGES.USER_NOT_FOUND });
            }

            return done(null, user);
          });
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};

export default useJWT
