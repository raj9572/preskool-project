import express from "express";
import { createMeeting, getMeetingsByClass } from "../controllers/meetingController.js";

const router = express.Router();

// Define your endpoints
router.post("/online-meetings/schedule", createMeeting);
router.get("/online-meetings/list/:classId/:sectionId", getMeetingsByClass);

// This 'default' export fixes your "SyntaxError: does not provide an export named default"
export default router;