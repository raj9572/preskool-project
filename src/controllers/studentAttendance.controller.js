import { StudentAttendanceModel } from "../models/studentAttendance.model.js";

export const StudentAttendanceController = {

  // GET /api/getstudentattendance?className=10&section=A
  async get(req, res) {
    try {
      const { className, section } = req.query;

      if (!className || !className.trim()) {
        return res.status(400).json({
          success: false,
          message: "Provide className. If you include section, className is required."
        });
      }

      const data = section
        ? await StudentAttendanceModel.getByClassAndSection(className, section)
        : await StudentAttendanceModel.getByClass(className);

      res.json(data);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};
