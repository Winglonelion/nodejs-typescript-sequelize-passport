"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const config_1 = __importDefault(require("config"));
const { User } = require("../models")();
const constants = require("../constants");
/* istanbul ignore next */
const jwt = () => {
    return passport_1.default.use("jwt", new passport_jwt_1.default.Strategy({
        jwtFromRequest: passport_jwt_1.default.ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
        secretOrKey: config_1.default.get("jwt.publicKey"),
    }, (payload, done) => {
        try {
            User.findOne({ where: { email: payload.sub } }).then((user) => {
                if (user === null)
                    return done(null, false, { message: constants.USER_NOT_FOUND });
                return done(null, user);
            });
        }
        catch (err) {
            return done(err);
        }
    }));
};
exports.default = jwt;
//# sourceMappingURL=jwt.auth.js.map