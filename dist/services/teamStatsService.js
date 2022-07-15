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
exports.deleteTeamStats = exports.updateTeamStatsService = exports.getTeamStatsService = exports.addTeamStats = void 0;
const index_1 = __importDefault(require("../src/index"));
const addTeamStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const teamStats = yield index_1.default.team_stats.create({
        data: {
            total_matches: 14,
            matches_won: 0,
            matches_lost: 0,
        },
    });
    if (!teamStats) {
        throw new Error('No stats created !');
    }
    return teamStats;
});
exports.addTeamStats = addTeamStats;
const getTeamStatsService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const teamStats = yield index_1.default.team_stats.findUnique({
        where: {
            id: id,
        },
    });
    if (teamStats === null) {
        throw new Error('Team not found');
    }
    return teamStats;
});
exports.getTeamStatsService = getTeamStatsService;
const updateTeamStatsService = (id, matchesWon, matchesLost) => __awaiter(void 0, void 0, void 0, function* () {
    if (matchesLost + matchesWon == 14) {
        return yield index_1.default.team_stats.update({
            where: {
                id: id,
            },
            data: {
                matches_lost: matchesLost,
                matches_won: matchesWon,
            },
        });
    }
    else {
        throw new Error('Data not valid');
    }
});
exports.updateTeamStatsService = updateTeamStatsService;
const deleteTeamStats = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedTeamStats = yield index_1.default.team_stats.delete({
        where: {
            id: id,
        },
    });
    if (!deletedTeamStats) {
        throw new Error('No stats deleted !');
    }
    return deletedTeamStats;
});
exports.deleteTeamStats = deleteTeamStats;
//# sourceMappingURL=teamStatsService.js.map