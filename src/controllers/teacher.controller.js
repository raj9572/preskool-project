import { TeacherModel } from "../models/teacher.model.js";

export const TeacherController = {

  async getAll(req, res) {
    try {
      const data = await TeacherModel.getAll();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await TeacherModel.getById(req.params.id);
      if (!data) return res.status(404).json({ success: false, message: "Teacher not found" });
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async create(req, res) {
    try {
      const dto = req.body;

      if (!dto.fullName) {
        return res.status(400).json({ success: false, message: "fullName is required" });
      }

      const result = await TeacherModel.upsert(dto);

      res.status(201).json({
        success: true,
        message: "Teacher saved successfully",
        result
      });

    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async update(req, res) {
    try {
      const dto = req.body;
      dto.teacherId = parseInt(req.params.id);

      const result = await TeacherModel.upsert(dto);

      res.json({
        success: true,
        message: "Teacher updated successfully",
        result
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async delete(req, res) {
    try {
      const ok = await TeacherModel.delete(req.params.id);
      if (!ok) return res.status(404).json({ success: false, message: "Teacher not found" });

      res.json({ success: true, message: "Teacher deleted successfully" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};
