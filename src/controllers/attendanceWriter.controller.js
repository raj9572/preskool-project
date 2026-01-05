import { AttendanceWriterModel } from "../models/attendanceWriter.model.js";

export const AttendanceWriterController = {

  async setToday(req, res) {
    if (!req.body?.length)
      return res.status(400).send("Send at least one { studentID, status } item.");

    const today = new Date().toISOString().slice(0, 10);
    const result = await AttendanceWriterModel.setForDate(today, req.body);

    res.json({
      date: today,
      updatedCount: result.UpdatedCount,
      missingIds: result.MissingIDs
        ? result.MissingIDs.split(",").map(Number)
        : []
    });
  },

  async setForDate(req, res) {
    const date = req.params.date;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
      return res.status(400).send("Invalid date format");

    const result = await AttendanceWriterModel.setForDate(date, req.body);

    res.json({
      date,
      updatedCount: result.UpdatedCount,
      missingIds: result.MissingIDs
        ? result.MissingIDs.split(",").map(Number)
        : []
    });
  }
};
