import express from "express";
import { EventController } from "../controllers/event.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.use(protect);

router.get("/event", EventController.getAll);
router.get("/event/:id", EventController.getById);
router.post("/event", EventController.create);
router.delete("/event/:id", EventController.delete);

export default router;
