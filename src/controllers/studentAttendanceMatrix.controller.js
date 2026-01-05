import { StudentAttendanceMatrixModel } from "../models/studentAttendanceMatrix.model.js";

export const StudentAttendanceMatrixController = {

  // GET /api/v1/student-attendance/all
  async getAll(req, res) {
    try {
      const data = await StudentAttendanceMatrixModel.getAll();

      res.json({
        FromDate: "session-start (auto)",
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

  // GET /api/v1/student-attendance/by-class/:class?section=A
  async getByClass(req, res) {
    try {
      const className = req.params.class;
      const { section } = req.query;

      if (!className || !className.trim()) {
        return res.status(400).json({
          success: false,
          message: "class is required"
        });
      }

      const data = await StudentAttendanceMatrixModel.getByClass(className, section);

      res.json({
        FromDate: "session-start (auto)",
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

  // GET /api/v1/student-attendance/by-id/:studentId
  async getById(req, res) {
    try {
      const studentId = parseInt(req.params.studentId, 10);

      if (isNaN(studentId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid studentId"
        });
      }

      const data = await StudentAttendanceMatrixModel.getById(studentId);

      res.json({
        FromDate: "session-start (auto)",
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
