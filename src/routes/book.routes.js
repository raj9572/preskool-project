import express from "express";
import { BookController } from "../controllers/book.controller.js";

const router = express.Router();

router.post("/books", BookController.create);
router.get("/books", BookController.getAll);
router.get("/books/:id", BookController.getById);
router.put("/books/:id", BookController.update);
router.delete("/books/:id", BookController.delete);

export default router;
