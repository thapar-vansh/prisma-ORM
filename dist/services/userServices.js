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
exports.generateToken = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../src/index"));
const registerUser = (username, password, type) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const result = yield index_1.default.users.create({
        data: {
            username: username,
            password: hashedPassword,
            type: type
        },
    });
    if (!result) {
        throw new Error('No user created !');
    }
    return result;
});
exports.registerUser = registerUser;
const loginUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_1.default.users.findUnique({
        where: {
            username: username
        },
    });
    if (yield bcrypt_1.default.compare(password, user.password)) {
        const token = (0, exports.generateToken)(user.id, user.type);
        return token;
    }
    else {
        throw new Error('Invalid credentials');
    }
});
exports.loginUser = loginUser;
const generateToken = (id, type) => __awaiter(void 0, void 0, void 0, function* () {
    const privateKey = process.env.HASURA_JWT_PRIVATE_KEY ? process.env.HASURA_JWT_PRIVATE_KEY : "";
    const token = jsonwebtoken_1.default.sign({
        sub: String(id),
        iat: Math.round(new Date().getTime() / 1000),
        created: new Date().toISOString(),
        "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["FREE", "PREMIUM", "PRO"],
            "x-hasura-default-role": "FREE",
            "x-hasura-role": type,
            "x-hasura-user-id": String(id)
        }
    }, privateKey, { "algorithm": "HS256" });
    return token;
});
exports.generateToken = generateToken;
//# sourceMappingURL=userServices.js.map