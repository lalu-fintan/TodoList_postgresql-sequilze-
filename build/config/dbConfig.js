"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("todo-list", "laluprasath", "12345678", {
    host: "localhost",
    dialect: "postgres",
});
sequelize
    .authenticate()
    .then(() => {
    console.log("connection has been establised successfully");
})
    .catch((err) => {
    console.log("Unable to connect the database ", err);
});
exports.default = sequelize;
//# sourceMappingURL=dbConfig.js.map