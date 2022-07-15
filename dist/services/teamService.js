"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeamService = exports.getTeamsService = exports.addTeamService = void 0;
const index_1 = __importDefault(require("../src/index"));
const teamStatsService_1 = require("./teamStatsService");
const addTeamService = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const teamStats = yield (0, teamStatsService_1.addTeamStats)();
    const team = yield index_1.default.team.create({
        data: {
            name: name,
        },
    });
    if (!team && !teamStats) {
        throw new Error('No team created !');
    }
    return team;
});
exports.addTeamService = addTeamService;
const getTeamsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const teams = yield index_1.default.team.findMany();
    if (teams.length === 0) {
        throw new Error('No teams found');
    }
    return teams;
});
exports.getTeamsService = getTeamsService;
const deleteTeamService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield (0, teamStatsService_1.getTeamStatsService)(id);
    yield index_1.default.team.delete({
        where: {
            id: id,
        },
    });
    yield (0, teamStatsService_1.deleteTeamStats)(id);
    return team;
});
exports.deleteTeamService = deleteTeamService;
//# sourceMappingURL=teamService.js.map