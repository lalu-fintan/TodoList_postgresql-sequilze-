import express from "express";
import userRouter from "./user.router";
import todoListRouter from "./list.router";

const router = express();

router.use("/api/user", userRouter);
router.use("/api/list", todoListRouter);

export default router;
