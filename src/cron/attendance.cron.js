import cron from "node-cron";
import { AttendanceWriterModel } from "../models/attendanceWriter.model.js";

// Run every day at 8 AM
cron.schedule("0 17 * * *", async () => {
  console.log("Running Attendance Email Cron...");
  await AttendanceWriterModel.sendTodayAbsentEmails();
});