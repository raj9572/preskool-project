import { BookIssueModel } from "../models/bookIssue.model.js";

export const BookIssueController = {

  async create(req, res) {
    try {
      const result = await BookIssueModel.create(req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const month = req.query.month; // ?month=2026-02
      const data = await BookIssueModel.getAll(month);
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await BookIssueModel.getById(req.params.id);
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const result = await BookIssueModel.update(req.params.id, req.body);
      res.json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const result = await BookIssueModel.delete(req.params.id);
      res.json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

};
