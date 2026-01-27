import express from "express";
import { TransportController } from "../controllers/transport.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/transport", TransportController.getAll);
router.get("/transport/:id", TransportController.getById);
router.post("/transport", TransportController.create);
router.put("/transport/:id", TransportController.update);
router.delete("/transport/:id", TransportController.delete);

export default router;
