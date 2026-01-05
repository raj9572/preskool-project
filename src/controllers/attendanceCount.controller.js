import { AttendanceCountModel } from "../models/attendanceCount.model.js";

export const AttendanceCountController = {

  // GET /api/v1/attendance-count/today
  async getToday(req, res) {
    try {
      const istDate = new Date(Date.now() + 330 * 60000)
        .toISOString()
        .slice(0, 10);

      const rows = await AttendanceCountModel.getToday();

      res.json({
        Result: true,
        Date: istDate,
        Data: rows,
        Message: "Success"
      });
    } catch (error) {
      res.status(500).json({
        Result: false,
        Message: error.message
      });
    }
  },

  // GET /api/v1/attendance-count/by-date?date=YYYY-MM-DD
  async getByDate(req, res) {
    try {
      const { date } = req.query;

      if (!date || isNaN(Date.parse(date))) {
        return res.status(400).json({
          result: false,
          message: "Invalid date. Use YYYY-MM-DD."
        });
      }

      const rows = await AttendanceCountModel.getByDate(date);

      res.json({
        Result: true,
        Date: date,
        Data: rows,
        Message: "Success"
      });
    } catch (error) {
      res.status(500).json({
        Result: false,
        Message: error.message
      });
    }
  }
};
