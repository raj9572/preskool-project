import cron from "node-cron";
import { AttendanceWriterModel } from "../models/attendanceWriter.model.js";
import { PendingFeeModels } from "../models/pendingFee.model.js";
// Run every day at 11 AM
cron.schedule("0 11 * * *", async () => {
  console.log("Running Attendance Email Cron...");
  await AttendanceWriterModel.sendTodayAbsentEmails();
  await PendingFeeModels.sendPendingFeeEmails();
  
});