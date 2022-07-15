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
const teamStats = __importStar(require("../../services/teamStatsService"));
const data = __importStar(require("../data/data.json"));
const index_1 = __importDefault(require("../../src/index"));
describe('Tests for teamstats service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('returns team stats success', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetTeamStats = jest
            .spyOn(index_1.default.team_stats, 'findUnique')
            .mockResolvedValueOnce(data.getTeamStatsSuccess);
        const result = teamStats.getTeamStatsService(1);
        expect(yield result).toBe(data.getTeamStatsSuccess);
        expect(mockGetTeamStats).toBeCalledTimes(1);
    }));
    it('returns all team stats failure', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetTeamStats = jest
            .spyOn(index_1.default.team_stats, 'findUnique')
            .mockRejectedValueOnce('Team not found');
        const result = teamStats.getTeamStatsService(1);
        yield expect(result).rejects.toEqual('Team not found');
        expect(mockGetTeamStats).toBeCalledTimes(1);
    }));
    it('service to update team stats success', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUpdateTeamStats = jest
            .spyOn(index_1.default.team_stats, 'update')
            .mockResolvedValueOnce(data.updateTeamStatsSuccess);
        const result = teamStats.updateTeamStatsService(1, 8, 6);
        expect(yield result).toBe(data.updateTeamStatsSuccess);
        expect(mockUpdateTeamStats).toBeCalledTimes(1);
    }));
    it('service to update team stats failure', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUpdateTeamStats = jest
            .spyOn(teamStats, 'updateTeamStatsService')
            .mockRejectedValueOnce('Data not valid');
        const result = teamStats.updateTeamStatsService(1, 9, 6);
        yield expect(result).rejects.toEqual('Data not valid');
        expect(mockUpdateTeamStats).toBeCalledTimes(1);
    }));
    it('service to delete team success', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockDeletedTeamStats = jest
            .spyOn(index_1.default.team_stats, 'delete')
            .mockResolvedValueOnce(data.deleteTeamStatsSuccess);
        const result = teamStats.deleteTeamStats(1);
        expect(yield result).toBe(data.deleteTeamStatsSuccess);
        expect(mockDeletedTeamStats).toBeCalledTimes(1);
    }));
    it('service to delete team failure', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockDeletedTeamStats = jest
            .spyOn(index_1.default.team_stats, 'delete')
            .mockRejectedValueOnce('No stats deleted !');
        const result = teamStats.deleteTeamStats(1);
        yield expect(result).rejects.toEqual('No stats deleted !');
        expect(mockDeletedTeamStats).toBeCalledTimes(1);
    }));
});
//# sourceMappingURL=teamStatsService.test.js.map