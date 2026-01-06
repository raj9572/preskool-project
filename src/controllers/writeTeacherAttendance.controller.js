import { WriteTeacherAttendanceModel } from "../models/writeTeacherAttendance.model.js";

export const WriteTeacherAttendanceController = {

  // POST /api/writeteacherattendance/today
  async writeToday(req, res) {
    if (!req.body?.length) {
      return res.status(400).json({
        message: "Send at least one { teacherID, status } item."
      });
    }

    const today = new Date();
    await WriteTeacherAttendanceModel.writeForDate(today, req.body);

    res.json({
      date: today.toISOString().slice(0, 10),
      message: "Teacher attendance saved"
    });
  },

  // POST /api/writeteacherattendance/:date
  async writeForDate(req, res) {
    const { date } = req.params;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        message: "Invalid date format (yyyy-MM-dd)"
      });
    }

    if (!req.body?.length) {
      return res.status(400).json({
        message: "Send at least one { teacherID, status } item."
      });
    }

    const dt = new Date(date);
    await WriteTeacherAttendanceModel.writeForDate(dt, req.body);

    res.json({
      date,
      message: "Teacher attendance saved"
    });
  }
};
