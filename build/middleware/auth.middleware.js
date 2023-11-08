"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authentication = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        throw new Error("You don't have a access");
    }
    else {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_KEY);
        console.log(decoded);
        // req.user=decoded
        next();
    }
};
exports.authentication = authentication;
//# sourceMappingURL=auth.middleware.js.map