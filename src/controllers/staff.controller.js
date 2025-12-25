import { StaffModel } from "../models/staff.model.js";

export const StaffController = {

  async createOrUpdate(req, res) {
    try {
      await StaffModel.upsert(req.body);
      res.json({
        success: true,
        message: "staff saved/updated successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  async getAll(req, res) {
    try {
      const staff = await StaffModel.getAll();
      res.json({ success: true, data: staff });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const staff = await StaffModel.getById(req.params.id);
      if (!staff) {
        return res.status(404).json({ success: false, message: "Staff not found" });
      }
      res.json({ success: true, data: staff });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      await StaffModel.deleteById(req.params.id);
      res.json({ success: true, message: "Staff deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};
