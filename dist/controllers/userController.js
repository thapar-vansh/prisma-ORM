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
exports.login = exports.register = void 0;
const userServices_1 = require("../services/userServices");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, type } = req.body.input;
    if (!username && !password) {
        return res.status(422).send('Input required');
    }
    try {
        const result = yield (0, userServices_1.registerUser)(username, password, type);
        return res.status(200).json({ id: result.id });
    }
    catch (e) {
        console.log(e);
        return res.status(400).send('Registration failed');
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body.input;
    if (!username && !password) {
        return res.status(422).send('Input required');
    }
    try {
        const result = yield (0, userServices_1.loginUser)(username, password);
        res.status(200).json({ accessToken: result });
    }
    catch (e) {
        console.log(e);
        return res.status(400).send('Something went wrong');
    }
});
exports.login = login;
//# sourceMappingURL=userController.js.map