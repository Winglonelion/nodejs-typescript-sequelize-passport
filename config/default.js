const fs = require("fs");


module.exports = {
  jwt: {
    privateKey: fs.readFileSync("./config/certs/jwt.key", "utf8"),
    publicKey: fs.readFileSync("./config/certs/jwt.key.pub", "utf8"),
    expires_days: 90,
  },
  db: {
    uri:
      "postgres://orm-user:hunter12@localhost:5432/orm-db",
  },
  auth: {},
};
