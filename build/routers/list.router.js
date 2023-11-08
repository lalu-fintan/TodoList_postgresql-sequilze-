"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./../middleware/auth.middleware");
const express_1 = require("express");
const list_controller_1 = require("../controllers/list.controller");
const image_upload_1 = __importDefault(require("../middleware/image.upload"));
// const upload = multer({ dest: path.join("src", "uploads") });
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authentication, image_upload_1.default.single("image"), list_controller_1.createList);
router.get("/", auth_middleware_1.authentication, list_controller_1.getAllList);
router.get("/:id", auth_middleware_1.authentication, list_controller_1.getById);
router.put("/:id", auth_middleware_1.authentication, image_upload_1.default.single("image"), list_controller_1.updateProdunctById);
router.delete("/:id", auth_middleware_1.authentication, list_controller_1.deleteProductById);
exports.default = router;
//# sourceMappingURL=list.router.js.map