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
exports.deleteProductById = exports.updateProdunctById = exports.getById = exports.getAllList = exports.createList = void 0;
const list_model_1 = __importDefault(require("../models/list.model"));
const cloudinary_1 = require("../config/cloudinary");
const createList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { title, description } = req.body;
    const imageUrl = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    const fileName = ((_b = req.file) === null || _b === void 0 ? void 0 : _b.originalname) || "";
    try {
        if (!imageUrl) {
            res.status(400).json({ message: "Image file is required" });
        }
        else {
            const image = (0, cloudinary_1.uploadImage)(imageUrl, "Todo");
            // console.log(image.secure_url);
            const data = yield list_model_1.default.create({
                title,
                description,
                image: (yield image).secure_url,
            });
            console.log({ data });
            res.status(200).json({
                message: "data created successfully",
                imageUrl: (yield image).secure_url,
            });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.createList = createList;
const getAllList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getList = yield list_model_1.default.findAll();
        res.status(200).json(getList);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAllList = getAllList;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const getList = yield list_model_1.default.findByPk(id);
        if (getList) {
            res.status(200).json(getList);
        }
        else {
            res.status(400).json({ message: "data not avilable" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getById = getById;
const updateProdunctById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { id } = req.params;
    const data = req.body;
    const imageUrl2 = (_c = req.file) === null || _c === void 0 ? void 0 : _c.path;
    try {
        const product = yield list_model_1.default.findByPk(id);
        if (product) {
            const image = (0, cloudinary_1.uploadImage)(imageUrl2, "Todo");
            const updatedProduct = yield list_model_1.default.update({ data, image }, {
                where: {
                    id,
                },
            });
            res.status(200).json({ message: "updated successfully" });
        }
        else {
            res.status(400).json({ message: "data not found" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.updateProdunctById = updateProdunctById;
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield list_model_1.default.findByPk(id);
        if (product) {
            const deleteProduct = yield product.destroy();
            res.status(200).json({ message: "deleted successfully" });
        }
        else {
            res.status(400).json({ message: "no data found" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.deleteProductById = deleteProductById;
//# sourceMappingURL=list.controller.js.map