"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("./user.router"));
const list_router_1 = __importDefault(require("./list.router"));
const router = (0, express_1.default)();
router.use("/api/user", user_router_1.default);
router.use("/api/list", list_router_1.default);
exports.default = router;
//# sourceMappingURL=main.router.js.map