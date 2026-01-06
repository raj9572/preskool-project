import { TeacherAttendanceModel } from "../models/teacherAttendance.model.js";

export const TeacherAttendanceController = {

  // GET /api/getteacherattendance/today
  async getToday(req, res) {
    try {
      const rows = await TeacherAttendanceModel.getToday();
      res.json(rows);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};
