import config from 'config'

export const CONFIGS = {
  JWT: {
    PUBLIC_KEY: config.get('jwt.publicKey') as string,
    PRIVATE_KEY: config.get('jwt.privateKey') as string,
    EXPIRES_DAYS: config.get('jwt.expires_days') as number,
  },
  DB: {
    URI: config.get('db.uri') as string
  }
}
