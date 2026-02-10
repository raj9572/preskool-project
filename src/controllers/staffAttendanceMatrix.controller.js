import { StaffModel } from "../models/staff.model.js";
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
  },

  // GET /api/v1/staff-attendance/summary?staffId=1&month=YYYY-MM
    async getMonthlyStaffSummary(req, res) {
    try {
      const { staffId, month } = req.query;

      if (!staffId || !month) {
        return res.status(400).json({
          success: false,
          message: "staffId and month (YYYY-MM) are required"
        });
      }

      const staffDetails = await StaffModel.getById(parseInt(staffId));
      const data =
        await StaffAttendanceMatrixModel.getMonthlyStaffSummary(
          parseInt(staffId),
          month
        );

      res.json({
        success: true,
        staffId: Number(staffId),
        month,
        staffDetails:{
          fullName: staffDetails?.FullName || "N/A",
          role: staffDetails?.Role || "N/A",
          email: staffDetails?.Email || "N/A",
          profilePictureUrl: staffDetails?.ProfilePictureUrl || null,
          salary: staffDetails?.Salary || 0
        },
        summary: data || {
          PresentDays: 0,
          AbsentDays: 0,
          HalfDays: 0,
          LeaveDays: 0
        }
      });

    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  },

  async getAllStaffMonthlySummary(req, res) {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({
        success: false,
        message: "Month is required (YYYY-MM)"
      });
    }

    const data = await StaffAttendanceMatrixModel.getAllStaffMonthlySummary(month);

    const formatted = data.map(row => ({
      staffId: row.StaffID,
      month,
      staff: {
        fullName: row.FullName,
        email: row.Email,
        role: row.Role,
        profilePhoto: row.ProfilePhoto,
        salary: row.Salary
      },
      summary: {
        PresentDays: row.PresentDays,
        AbsentDays: row.AbsentDays,
        HalfDays: row.HalfDays,
        LeaveDays: row.LeaveDays
      }
    }));

    res.json({
      success: true,
      month,
      totalStaff: formatted.length,
      data: formatted
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

};
