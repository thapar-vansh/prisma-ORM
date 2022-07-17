"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const teams = __importStar(require("../../services/teamService"));
const teamStats = __importStar(require("../../services/teamStatsService"));
const data = __importStar(require("../data/data.json"));
const index_1 = __importDefault(require("../../src/index"));
describe('Tests for team service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('service to add team to database success', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockAddTeamStats = jest
            .spyOn(teamStats, 'addTeamStats')
            .mockResolvedValueOnce(data.addTeamStatsSuccess);
        const mockAddTeam = jest
            .spyOn(index_1.default.team, 'create')
            .mockResolvedValueOnce(data.addTeamSuccess);
        const result = teams.addTeamService('kkr');
        expect(mockAddTeam).toHaveBeenCalledTimes(0);
        expect(mockAddTeamStats).toHaveBeenCalledTimes(1);
        expect(yield result).toEqual(data.addTeamSuccess);
    }));
    it('service to add team to database failure', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const mockAddTeamStats = jest
                .spyOn(teamStats, 'addTeamStats')
                .mockRejectedValueOnce('No stats created !');
            const mockAddTeam = jest
                .spyOn(index_1.default.team, 'create')
                .mockRejectedValueOnce('No team created !');
            const result = yield teams.addTeamService('kkr');
            expect(mockAddTeam).toHaveBeenCalledTimes(1);
            expect(mockAddTeamStats).toHaveBeenCalledTimes(0);
            expect(result).toThrow('No stats created !');
        }
        catch (e) {
            console.log(e);
        }
    }));
    it('returns all teams success', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetAllTeams = jest
            .spyOn(index_1.default.team, 'findMany')
            .mockResolvedValueOnce(data.getTeamsSuccess);
        const result = teams.getTeamsService();
        expect(yield result).toBe(data.getTeamsSuccess);
        expect(mockGetAllTeams).toBeCalledTimes(1);
    }));
    it('returns all teams failure', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetAllTeams = jest
            .spyOn(index_1.default.team, 'findMany')
            .mockRejectedValueOnce('No teams found');
        const result = teams.getTeamsService();
        yield expect(result).rejects.toEqual('No teams found');
        expect(mockGetAllTeams).toBeCalledTimes(1);
    }));
    it('service to delete team success', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockTeamToBeDeleted = jest
            .spyOn(teamStats, 'getTeamStatsService')
            .mockResolvedValueOnce(data.deleteTeamStatsSuccess);
        const mockDeletedTeam = jest
            .spyOn(index_1.default.team, 'delete')
            .mockResolvedValueOnce(data.deleteTeamSuccess);
        const mockDeletedTeamStats = jest
            .spyOn(index_1.default.team_stats, 'delete')
            .mockResolvedValueOnce(data.deleteTeamStatsSuccess);
        const result = teams.deleteTeamService(1);
        expect(yield result).toBe(data.deleteTeamStatsSuccess);
        expect(mockTeamToBeDeleted).toBeCalledTimes(1);
        expect(mockDeletedTeamStats).toBeCalledTimes(1);
        expect(mockDeletedTeam).toBeCalledTimes(1);
    }));
    it('service to delete team failure', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockTeamToBeDeleted = jest
            .spyOn(teamStats, 'getTeamStatsService')
            .mockRejectedValueOnce('Team not found');
        const mockDeletedTeam = jest
            .spyOn(index_1.default.team, 'delete')
            .mockResolvedValueOnce(data.deleteTeamSuccess);
        const mockDeletedTeamStats = jest
            .spyOn(index_1.default.team_stats, 'delete')
            .mockRejectedValueOnce('No stats deleted !');
        const result = teams.deleteTeamService(1);
        yield expect(result).rejects.toEqual('Team not found');
        expect(mockTeamToBeDeleted).toBeCalledTimes(1);
        expect(mockDeletedTeam).toBeCalledTimes(0);
        expect(mockDeletedTeamStats).toBeCalledTimes(0);
    }));
});
//# sourceMappingURL=teamService.test.js.map