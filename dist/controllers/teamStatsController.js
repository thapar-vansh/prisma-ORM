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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeamStats = exports.updateTeamStats = void 0;
const logger_1 = require("../src/lib/logger");
const teamStatsService_1 = require("../services/teamStatsService");
const updateTeamStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { matches_won, matches_lost } = req.body;
        yield (0, teamStatsService_1.updateTeamStatsService)(Number(id), matches_won, matches_lost);
        return res.send('Updated match stats');
    }
    catch (e) {
        logger_1.Logger.error(e);
        if (e instanceof Error) {
            return res.status(400).send('Data not valid');
        }
        return res.status(400).send('Something went wrong');
    }
});
exports.updateTeamStats = updateTeamStats;
const getTeamStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const team = yield (0, teamStatsService_1.getTeamStatsService)(Number(id));
        return res.send(team);
    }
    catch (e) {
        logger_1.Logger.error(e);
        if (e instanceof Error) {
            return res.status(404).send('Team not found');
        }
        return res.status(400).send('Something went wrong');
    }
});
exports.getTeamStats = getTeamStats;
//# sourceMappingURL=teamStatsController.js.map