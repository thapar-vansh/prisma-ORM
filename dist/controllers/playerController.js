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
exports.deletePlayer = exports.updatePlayer = exports.getPlayers = exports.addPlayer = void 0;
const logger_1 = require("../src/lib/logger");
const playerService_1 = require("../services/playerService");
const addPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req);
        const { name, country } = req.body.input;
        const player = yield (0, playerService_1.addPlayerService)(name, country);
        return res.json({ name: player.name });
    }
    catch (e) {
        logger_1.Logger.error(e);
        if (e instanceof Error) {
            return res.status(400).send('No player created !');
        }
        return res.status(400).send('Something went wrong');
    }
});
exports.addPlayer = addPlayer;
const getPlayers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const players = yield (0, playerService_1.getPlayersService)();
        return res.send(players);
    }
    catch (e) {
        logger_1.Logger.error(e);
        if (e instanceof Error) {
            return res.status(404).send('No players found !');
        }
        return res.status(400).send('Something went wrong');
    }
});
exports.getPlayers = getPlayers;
// getPlayers()
const updatePlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { name, country } = req.body;
        const result = yield (0, playerService_1.updatePlayerService)(Number(id), name, country);
        return res.send('Updated player');
    }
    catch (e) {
        logger_1.Logger.error(e);
        if (e instanceof Error) {
            return res.status(400).send('Player not updated !');
        }
        return res.status(400).send('Something went wrong');
    }
});
exports.updatePlayer = updatePlayer;
const deletePlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield (0, playerService_1.deletePlayerService)(Number(id));
        return res.send('Deleted player');
    }
    catch (e) {
        logger_1.Logger.error(e);
        if (e instanceof Error) {
            return res.status(404).send('Player not found !');
        }
        return res.status(400).send('Something went wrong');
    }
});
exports.deletePlayer = deletePlayer;
//# sourceMappingURL=playerController.js.map