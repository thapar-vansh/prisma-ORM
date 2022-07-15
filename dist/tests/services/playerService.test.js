"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const players = __importStar(require("../../services/playerService"));
const data = __importStar(require("../data/data.json"));
const index_1 = __importDefault(require("../../src/index"));
describe('Tests for player service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('service to add player to database success', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockAddPlayer = jest
            .spyOn(index_1.default.player, 'create')
            .mockResolvedValueOnce(data.addPlayerSuccess);
        const result = yield players.addPlayerService('vansh', 'india');
        expect(mockAddPlayer).toHaveBeenCalledTimes(1);
        expect(result).toEqual(data.addPlayerSuccess);
    }));
    it('service to add player to database failure', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockAddPlayer = jest
            .spyOn(index_1.default.player, 'create')
            .mockRejectedValueOnce('No player created !');
        const result = players.addPlayerService('vansh', 'india');
        expect(mockAddPlayer).toHaveBeenCalledTimes(1);
        yield expect(result).rejects.toEqual('No player created !');
    }));
    it('returns all players success', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetAllPlayers = jest
            .spyOn(index_1.default.player, 'findMany')
            .mockResolvedValueOnce(data.getPlayersSuccess);
        const result = players.getPlayersService();
        expect(yield result).toBe(data.getPlayersSuccess);
        expect(mockGetAllPlayers).toBeCalledTimes(1);
    }));
    it('returns all players failure', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetAllPlayers = jest
            .spyOn(index_1.default.player, 'findMany')
            .mockRejectedValueOnce('No players found');
        const result = players.getPlayersService();
        expect(mockGetAllPlayers).toBeCalledTimes(1);
        yield expect(result).rejects.toEqual('No players found');
    }));
    it('returns player by id success', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetPlayerById = jest
            .spyOn(index_1.default.player, 'findUnique')
            .mockResolvedValueOnce(data.getPlayerByIdSuccess);
        const result = players.getPlayerByIdService(1);
        expect(mockGetPlayerById).toBeCalledTimes(1);
        expect(yield result).toBe(data.getPlayerByIdSuccess);
    }));
    it('returns player by id failure', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetPlayerById = jest
            .spyOn(index_1.default.player, 'findUnique')
            .mockRejectedValueOnce('Player not found !');
        const result = players.getPlayerByIdService(1);
        expect(mockGetPlayerById).toBeCalledTimes(1);
        yield expect(result).rejects.toEqual('Player not found !');
    }));
    it('service to delete player success', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockDeletedPlayer = jest
            .spyOn(players, 'getPlayerByIdService')
            .mockResolvedValueOnce(data.deletePlayerSuccess);
        const mockPlayerToBeDeleted = jest
            .spyOn(index_1.default.player, 'delete')
            .mockResolvedValueOnce(data.deletePlayerSuccess);
        const result = yield players.deletePlayerService(1);
        expect(mockPlayerToBeDeleted).toBeCalledTimes(1);
        expect(mockDeletedPlayer).toBeCalledTimes(1);
        expect(result).toBe(data.deletePlayerSuccess);
    }));
    it('service to delete player failure', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockDeletedPlayer = jest
            .spyOn(players, 'getPlayerByIdService')
            .mockRejectedValueOnce('Player not found !');
        const result = players.deletePlayerService(1);
        expect(mockDeletedPlayer).toBeCalledTimes(1);
        yield expect(result).rejects.toEqual('Player not found !');
    }));
    it('service to update player success', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUpdatedPlayer = jest
            .spyOn(index_1.default.player, 'upsert')
            .mockResolvedValueOnce(data.updatePlayerSuccess);
        const result = players.updatePlayerService(1, 'ansh', 'india');
        expect(yield result).toBe(data.updatePlayerSuccess);
        expect(mockUpdatedPlayer).toBeCalledTimes(1);
    }));
    it('service to update player failure', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUpdatedPlayer = jest
            .spyOn(index_1.default.player, 'upsert')
            .mockRejectedValueOnce('Player not updated !');
        const result = players.updatePlayerService(1, 'ansh', 'india');
        expect(mockUpdatedPlayer).toBeCalledTimes(1);
        yield expect(result).rejects.toEqual('Player not updated !');
    }));
});
//# sourceMappingURL=playerService.test.js.map