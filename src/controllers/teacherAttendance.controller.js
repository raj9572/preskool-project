import { TeacherModel } from "../models/teacher.model.js";
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
  },

  // GET /api/getteacherattendance/monthly-summary?teacherId=1&month=YYYY-MM
  async getMonthlyAttendanceSummary(req, res) {
    try {
      const { teacherId, month } = req.query;

      if (!teacherId || !month) {
        return res.status(400).json({
          success: false,
          message: "teacherId and month (YYYY-MM) are required"
        });
      }

      const teacherDetails = await TeacherModel.getById(parseInt(teacherId));
      const data =
        await TeacherAttendanceModel.getMonthlyAttendanceSummary(
          parseInt(teacherId),
          month
        );

      return res.json({
        success: true,
        teacherId: Number(teacherId),
        teacherDetails:{
          fullName: teacherDetails?.FullName || "N/A",
          email: teacherDetails?.Email || "N/A",
          profilePictureUrl: teacherDetails?.ProfilePictureUrl || null,
          salary: teacherDetails?.Salary || 0
        },
        month,
        summary: data || {
          PresentDays: 0,
          AbsentDays: 0,
          HalfDays: 0,
          LeaveDays: 0
        }
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

};
