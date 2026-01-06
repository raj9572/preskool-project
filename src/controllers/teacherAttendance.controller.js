import { TeacherAttendanceModel } from "../models/teacherAttendance.model.js";

export const TeacherAttendanceController = {

  // GET /api/getteacherattendance/today
  async getToday(req, res) {
    try {
      const data = await TeacherAttendanceModel.getToday();
      res.json(data);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};
