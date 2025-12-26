import express from "express";
import { NoticeController } from "../controllers/notice.controller.js";

const router = express.Router();

router.get("/notice", NoticeController.getAll);
router.get("/notice/:id", NoticeController.getById);
router.post("/notice", NoticeController.create);
router.delete("/notice/:id", NoticeController.delete);

export default router;
