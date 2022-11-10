"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const playerRoutes_1 = require("../routes/playerRoutes");
const teamRoutes_1 = require("../routes/teamRoutes");
const userRoutes_1 = require("../routes/userRoutes");
const client_1 = require("@prisma/client");
const logger_1 = require("./lib/logger");
const prisma = new client_1.PrismaClient();
exports.default = prisma;
exports.app = (0, express_1.default)();
dotenv_1.default.config();
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
exports.app.use(body_parser_1.default.json());
exports.app.use('/player', playerRoutes_1.router);
exports.app.use('/team', teamRoutes_1.router);
exports.app.use('/user', userRoutes_1.router);
exports.app.listen(port, () => {
    return logger_1.Logger.debug(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map