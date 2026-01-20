import { SalaryModel } from "../models/salary.model.js";

export const SalaryController = {

 
  async getAll(req, res) {
    try {
      const data = await SalaryModel.getAllEmployeeSalaries();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  
  async updateTeacher(req, res) {
    try {
      const teacherId = parseInt(req.params.id);
      const { salary } = req.body;

      if (salary === undefined || salary === null) {
        return res.status(400).json({ success: false, message: "salary is required" });
      }

      const data = await SalaryModel.updateTeacherSalary(teacherId, salary);
      res.json({ success: true, message: "Teacher salary updated", data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  
  async updateStaff(req, res) {
    try {
      const staffId = parseInt(req.params.id);
      const { salary } = req.body;

      if (salary === undefined || salary === null) {
        return res.status(400).json({ success: false, message: "salary is required" });
      }

      const data = await SalaryModel.updateStaffSalary(staffId, salary);
      res.json({ success: true, message: "Staff salary updated", data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};
