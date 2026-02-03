import { StaffSalaryModel } from "../models/staffSalary.model.js";

export const StaffSalaryController = {

  async create(req, res) {
    try {
      const data = await StaffSalaryModel.create(req.body);
      res.json({ success: true, data });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async getAll(req, res) {
    const data = await StaffSalaryModel.getAll();
    res.json({ success: true, data });
  },

  async getById(req, res) {
    const data = await StaffSalaryModel.getById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data });
  },

  async getByStaff(req, res) {
    const data = await StaffSalaryModel.getByStaffId(req.params.staffId);
    res.json({ success: true, data });
  },

  async update(req, res) {
    const data = await StaffSalaryModel.update(req.params.id, req.body);
    res.json({ success: true, data });
  },

  async delete(req, res) {
    await StaffSalaryModel.delete(req.params.id);
    res.json({ success: true, message: "Salary deleted" });
  }
};
