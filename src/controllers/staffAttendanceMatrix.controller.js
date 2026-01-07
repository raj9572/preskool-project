import { StaffAttendanceMatrixModel } from "../models/staffAttendanceMatrix.model.js";

export const StaffAttendanceMatrixController = {

  // GET /api/v1/staff-attendance/all
  async getAll(req, res) {
    try {
      const data = await StaffAttendanceMatrixModel.getAll();

      res.json({
        Result: true,
        FromDate: "session-start (auto)",
        ToDate: new Date(Date.now() + 330 * 60000)
          .toISOString()
          .slice(0, 10),
        Data: data,
        Message: "Success"
      });
    } catch (error) {
      res.status(500).json({
        Result: false,
        Message: error.message
      });
    }
  },

  // GET /api/v1/staff-attendance/by-id/:staffId
  async getById(req, res) {
    try {
      const staffId = parseInt(req.params.staffId, 10);

      if (isNaN(staffId)) {
        return res.status(400).json({
          Result: false,
          Message: "Invalid staffId"
        });
      }

      const data = await StaffAttendanceMatrixModel.getById(staffId);

      res.json({
        Result: true,
        FromDate: "session-start (auto)",
        ToDate: new Date(Date.now() + 330 * 60000)
          .toISOString()
          .slice(0, 10),
        Data: data,
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
