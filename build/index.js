"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const main_router_1 = __importDefault(require("./routers/main.router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const coreOption = {
    origin: process.env.ORIGIN_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};
const port = process.env.PORT || 4001;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)(coreOption));
// app.use("/", (req, res) => {
//   res.send("Hello World!");
// });
dbConfig_1.default
    .sync({ force: true })
    .then(() => {
    console.log("connection has been establised successfully");
})
    .catch((err) => {
    console.log("Unable to connect the database" + err);
});
app.use("/", main_router_1.default);
app.listen(port, () => {
    console.log(`server running on ${port}`);
});
//# sourceMappingURL=index.js.map