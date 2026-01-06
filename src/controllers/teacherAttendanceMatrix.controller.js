import { TeacherAttendanceMatrixModel } from "../models/teacherAttendanceMatrix.model.js";

export const TeacherAttendanceMatrixController = {

  // GET /api/v1/teacher-attendance/all
  async getAll(req, res) {
    try {
      const data = await TeacherAttendanceMatrixModel.getAll();

      res.json({
        ToDate: new Date(Date.now() + 330 * 60000)
          .toISOString()
          .slice(0, 10),
        Data: data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // GET /api/v1/teacher-attendance/by-id/:teacherId
  async getById(req, res) {
    try {
      const teacherId = parseInt(req.params.teacherId, 10);

      if (isNaN(teacherId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid teacherId"
        });
      }

      const data = await TeacherAttendanceMatrixModel.getById(teacherId);

      res.json({
        ToDate: new Date(Date.now() + 330 * 60000)
          .toISOString()
          .slice(0, 10),
        Data: data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};
