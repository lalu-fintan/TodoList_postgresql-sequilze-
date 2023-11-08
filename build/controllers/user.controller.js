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
exports.signIn = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jwt_1 = require("../utilities/jwt");
const sequelize_1 = require("sequelize");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, Email, password } = req.body;
    try {
        const user = yield user_model_1.default.findOne({ where: { Email } });
        if (user) {
            res.status(400).json({ message: "Email Already Exist" });
        }
        else {
            const hashPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = yield user_model_1.default.create({
                userName,
                Email,
                password: hashPassword,
            });
            const userId = newUser.getDataValue("id");
            const refreshToken = (0, jwt_1.genRefreshToken)(userId);
            const accessToken = (0, jwt_1.genAccessToken)(userId);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
            });
            res.status(200).json({ message: "SignUp successfully", accessToken });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Email, password } = req.body;
    try {
        const user = yield user_model_1.default.findOne({
            where: { Email: { [sequelize_1.Op.iLike]: Email } },
        });
        if (user &&
            (yield bcrypt_1.default.compare(password, user.dataValues.password))) {
            const userId = user.getDataValue("id");
            const refreshToken = (0, jwt_1.genRefreshToken)(userId);
            const accessToken = (0, jwt_1.genAccessToken)(userId);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
            });
            res.status(200).json({ message: "SignIn successfully", accessToken });
        }
        else {
            res.status(403).json({ message: "Invalid Credentials" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.signIn = signIn;
//# sourceMappingURL=user.controller.js.map