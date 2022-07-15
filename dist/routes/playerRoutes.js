"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const playerController_1 = require("../controllers/playerController");
exports.router = express_1.default.Router();
exports.router.post('/', playerController_1.addPlayer);
exports.router.get('/', playerController_1.getPlayers);
exports.router.put('/:id', playerController_1.updatePlayer);
exports.router.delete('/:id', playerController_1.deletePlayer);
//# sourceMappingURL=playerRoutes.js.map