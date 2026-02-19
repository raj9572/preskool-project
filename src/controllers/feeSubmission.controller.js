import { FeeSubmissionModel } from "../models/feeSubmission.model.js";

export const FeeSubmissionController = {

  async create(req, res) {
    try {
      const data = await FeeSubmissionModel.create(req.body);
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const data = await FeeSubmissionModel.getAll();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await FeeSubmissionModel.getById(req.params.id);
      if (!data) {
        return res.status(404).json({ success: false, message: "Not found" });
      }
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getByStudent(req, res) {
    try {
      const studentId = parseInt(req.params.studentId);
      if (!studentId)
        return res.status(400).json({ success: false, message: "StudentID must be int" });

      const data = await FeeSubmissionModel.getByStudentId(studentId);
      res.json({ success: true, studentId, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async update(req, res) {
    try {
      const data = await FeeSubmissionModel.update(req.params.id, req.body);
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async delete(req, res) {
    try {
      const result = await FeeSubmissionModel.delete(req.params.id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Not found" });
      }
      res.json({ success: true, message: "Deleted successfully" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};
