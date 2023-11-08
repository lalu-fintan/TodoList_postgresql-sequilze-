"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRefreshToken = exports.genAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const genAccessToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.ACCESS_KEY, {
        expiresIn: "1d",
    });
};
exports.genAccessToken = genAccessToken;
const genRefreshToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.ACCESS_KEY, {
        expiresIn: "3d",
    });
};
exports.genRefreshToken = genRefreshToken;
//# sourceMappingURL=jwt.js.map