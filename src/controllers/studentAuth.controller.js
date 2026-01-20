import { StudentModel } from "../models/student.model.js";

export const studentController = {

  
  async getAll(req, res) {
    try {
      const data = await StudentModel.getAll();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  
  async getById(req, res) {
    try {
      const data = await StudentModel.getById(req.params.id);
      if (!data) {
        return res.status(404).json({ success: false, message: "Student not found" });
      }
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

      const result = await StudentModel.upsert(dto);

      res.status(201).json({
        success: true,
        message: "Student saved successfully",
        result
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  
  async update(req, res) {
    try {
      const dto = req.body;
      dto.studentId = parseInt(req.params.id);

      const result = await StudentModel.upsert(dto);

      res.json({
        success: true,
        message: "Student updated successfully",
        result
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

 
  async delete(req, res) {
    try {
      const ok = await StudentModel.delete(req.params.id);

      if (!ok) {
        return res.status(404).json({ success: false, message: "Student not found" });
      }

      res.json({ success: true, message: "Student deleted successfully" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};
