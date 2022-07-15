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
exports.deleteTeam = exports.getTeams = exports.addTeam = void 0;
const logger_1 = require("../src/lib/logger");
const teamService_1 = require("../services/teamService");
const addTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        yield (0, teamService_1.addTeamService)(name);
        return res.send('Team added');
    }
    catch (e) {
        logger_1.Logger.error(e);
        if (e instanceof Error) {
            return res.status(400).send('No team created !');
        }
        return res.status(400).send('Something went wrong');
    }
});
exports.addTeam = addTeam;
const getTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teams = yield (0, teamService_1.getTeamsService)();
        return res.send(teams);
    }
    catch (e) {
        logger_1.Logger.error(e);
        if (e instanceof Error) {
            return res.status(404).send('No teams found');
        }
        return res.status(400).send('Something went wrong');
    }
});
exports.getTeams = getTeams;
const deleteTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield (0, teamService_1.deleteTeamService)(Number(id));
        return res.send('Deleted team');
    }
    catch (e) {
        logger_1.Logger.error(e);
        if (e instanceof Error) {
            return res.status(404).send('Invalid id ! Team does not exists');
        }
        return res.status(400).send('Something went wrong');
    }
});
exports.deleteTeam = deleteTeam;
//# sourceMappingURL=teamController.js.map