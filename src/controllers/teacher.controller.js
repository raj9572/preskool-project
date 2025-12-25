import { TeacherModel } from "../models/teacher.model.js";

export const TeacherController = {

  async createOrUpdate(req, res) {
    try {
      await TeacherModel.upsert(req.body);
      res.json({
        success: true,
        message: "Teacher created/updated successfully"
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
      const teachers = await TeacherModel.getAll();
      res.json({ success: true, data: teachers });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const teacher = await TeacherModel.getById(req.params.id);
      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: "Teacher not found"
        });
      }
      res.json({ success: true, data: teacher });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      await TeacherModel.deleteById(req.params.id);
      res.json({
        success: true,
        message: "Teacher deleted successfully"
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};
