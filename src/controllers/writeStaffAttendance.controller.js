import { WriteStaffAttendanceModel } from "../models/writeStaffAttendance.model.js";

export const WriteStaffAttendanceController = {

  // POST /api/write-staff-attendence/today
  async writeToday(req, res) {
    if (!req.body?.length) {
      return res.status(400).json({ message: "Body required." });
    }

    const today = new Date();
    await WriteStaffAttendanceModel.writeForDate(today, req.body);

    res.json({
      message: "Staff attendance written.",
      date: today.toISOString().slice(0, 10),
      count: req.body.length
    });
  },

  // GET /api/write-staff-attendence/today
  async getToday(req, res) {
    const today = new Date();
    const rows = await WriteStaffAttendanceModel.getForDate(today);
    res.json(rows);
  },

  // POST /api/write-staff-attendence/:date
  async writeForDate(req, res) {
    const { date } = req.params;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        message: "Date must be in yyyy-MM-dd format."
      });
    }

    if (!req.body?.length) {
      return res.status(400).json({ message: "Body required." });
    }

    const dt = new Date(date);
    await WriteStaffAttendanceModel.writeForDate(dt, req.body);

    res.json({
      message: "Staff attendance written.",
      date,
      count: req.body.length
    });
  }
};
