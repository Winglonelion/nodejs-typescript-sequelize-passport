"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
const routes_1 = __importDefault(require("./routes"));
const { version } = require("../../package.json");
const api = express_1.default();
api.use(passport_1.default.initialize());
// require("./middleware/jwt.auth")();
api.use(body_parser_1.default.json());
api.use(body_parser_1.default.urlencoded({ extended: true }));
Object.values(routes_1.default).forEach(({ name, router }) => {
    if (!name || !router)
        return;
    api.use(`/api/v1/${name}`, router);
});
api.use((err, req, res, next) => {
    const { status } = err;
    /* istanbul ignore next */
    if (status) {
        res.status(status).json({
            error: {
                name: err.name,
                message: err.message,
                data: err.data,
            },
        });
        return;
    }
    else
        next(err);
});
/* istanbul ignore next */
api.get("/version", (req, res) => {
    res.send(version);
});
api.use((e, req, res, next) => {
    const status = e.response ? e.response.status : 500;
    res.status(status).json({ message: e.message });
    next(e);
});
exports.default = api;
//# sourceMappingURL=index.js.map