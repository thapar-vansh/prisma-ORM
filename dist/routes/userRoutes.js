"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
exports.router = express_1.default.Router();
exports.router.post('/register', userController_1.register);
exports.router.post('/login', userController_1.login);
//# sourceMappingURL=userRoutes.js.map