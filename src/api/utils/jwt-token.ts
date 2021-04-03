import { CONFIGS } from "constants/config";
import jwt, { Secret, SignOptions, VerifyOptions } from "jsonwebtoken";
import User from "models/User";
import { promisify } from 'util'
import {v4 as uuidv4} from 'uuid'

const sign = promisify((payload: any, secretOrPrivateKey: Secret, options?: jwt.SignOptions, callback?: Function) => {
   jwt.sign(payload, secretOrPrivateKey, options)
   callback && callback()
});
const verify = promisify((token: string, secretOrPublicKey: Secret, options?: VerifyOptions, callback?: Function)  => {
  jwt.verify(token, secretOrPublicKey, options)
  callback && callback()
});

export const createToken = (user: User, expires?: Date) => {
  let exp;
  if (expires) exp = expires;
  else {
    exp = new Date();
    exp.setDate(exp.getDate() + CONFIGS.JWT.EXPIRES_DAYS);
  }

  const data = {
    // https://auth0.com/docs/tokens/jwt-claims
    sub: user.email,
    iss: "ARMY",
    exp: exp.getTime() / 1000,
    aud: "ARMY",
    nbf: (new Date(Date.now()).getTime() - 1000) / 1000,
    iat: new Date(Date.now()).getTime() / 1000,
    jti: uuidv4(),
  };

  const opt: SignOptions = {
    algorithm: "RS256",
  };

  return sign(data, CONFIGS.JWT.PRIVATE_KEY, opt);
};

export const verifyAndDecodeToken = async (token: string) => {
  try {
    const decoded = await verify(token, CONFIGS.JWT.PUBLIC_KEY, {});
    return { isValid: true, decoded };
  } catch (error) {
    return { isValid: false, reason: error.message };
  }
};


