"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
// interface UserAttributes {
//   id: string;
//   userName: string;
//   Email: string;
//   password: string;
//   role: string;
// }
// interface userInstance extends Model<UserAttributes>, UserAttributes {}
const User = dbConfig_1.default.define("User", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        // want to store the username toUppercase in database use this...
        //   get() {
        //     const rawValue = this.getDataValue("userName");
        //     return rawValue ? rawValue.toUpperCase() : null;
        //   },
    },
    Email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true,
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    role: {
        type: sequelize_1.DataTypes.ENUM("Admin", "User"),
        allowNull: false,
        defaultValue: "User",
    },
}, { timestamps: true });
User.sync();
exports.default = User;
//# sourceMappingURL=user.model.js.map