import express from "express";
import { BookIssueController } from "../controllers/bookIssue.controller.js";

const router = express.Router();

router.post("/book-issues", BookIssueController.create);
router.get("/book-issues", BookIssueController.getAll); // with ?month=YYYY-MM
router.get("/book-issues/:id", BookIssueController.getById);
router.put("/book-issues/:id", BookIssueController.update);
router.delete("/book-issues/:id", BookIssueController.delete);

export default router;
