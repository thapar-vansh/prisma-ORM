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
exports.deletePlayerService = exports.getPlayerByIdService = exports.updatePlayerService = exports.getPlayersService = exports.addPlayerService = void 0;
const index_1 = __importDefault(require("../src/index"));
const addPlayerService = (name, country) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield index_1.default.player.create({
        data: {
            name: name,
            country: country,
        },
    });
    if (!result) {
        throw new Error('No player created !');
    }
    return result;
});
exports.addPlayerService = addPlayerService;
const getPlayersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const players = yield index_1.default.player.findMany();
    if (players.length === 0) {
        throw new Error('No players found !');
    }
    return players;
});
exports.getPlayersService = getPlayersService;
const updatePlayerService = (id, name, country) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield index_1.default.player.upsert({
        where: {
            id: Number(id),
        },
        update: {
            name: name,
            country: country,
        },
        create: {
            name: name,
            country: country,
        },
    });
    if (!result) {
        throw new Error('Player not updated !');
    }
    return result;
});
exports.updatePlayerService = updatePlayerService;
const getPlayerByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const player = yield index_1.default.player.findUnique({
        where: {
            id: Number(id),
        },
    });
    if (player === null) {
        throw new Error('Player not found !');
    }
    return player;
});
exports.getPlayerByIdService = getPlayerByIdService;
const deletePlayerService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const player = yield (0, exports.getPlayerByIdService)(id);
    if (player === null) {
        throw new Error('Player not found !');
    }
    return yield index_1.default.player.delete({
        where: {
            id: Number(id),
        },
    });
});
exports.deletePlayerService = deletePlayerService;
//# sourceMappingURL=playerService.js.map