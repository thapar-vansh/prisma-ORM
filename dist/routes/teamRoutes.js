"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const teamController_1 = require("../controllers/teamController");
const teamStatsController_1 = require("../controllers/teamStatsController");
exports.router = express_1.default.Router();
exports.router.post('/', teamController_1.addTeam);
exports.router.get('/', teamController_1.getTeams);
exports.router.delete('/:id', teamController_1.deleteTeam);
exports.router.put('/stats/:id', teamStatsController_1.updateTeamStats);
exports.router.get('/stats/:id', teamStatsController_1.getTeamStats);
//# sourceMappingURL=teamRoutes.js.map