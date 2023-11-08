import { authentication } from "./../middleware/auth.middleware";
import { Router } from "express";
import {
  createList,
  deleteProductById,
  getAllList,
  getById,
  updateProdunctById,
} from "../controllers/list.controller";
import upload from "../middleware/image.upload";
import multer from "multer";
import path from "path";

// const upload = multer({ dest: path.join("src", "uploads") });

const router = Router();

router.post("/", authentication, upload.single("image"), createList);
router.get("/", authentication, getAllList);
router.get("/:id", authentication, getById);
router.put("/:id", authentication, upload.single("image"), updateProdunctById);
router.delete("/:id", authentication, deleteProductById);

export default router;
