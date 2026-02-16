import { ExpenseModel } from "../models/expense.model.js";

export const ExpenseController = {

  async create(req, res) {
    try {
      const result = await ExpenseModel.create(req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const data = await ExpenseModel.getAll();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },




  async update(req, res) {
    try {
      const result = await ExpenseModel.update(req.params.id, req.body);
      res.json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const result = await ExpenseModel.delete(req.params.id);
      res.json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

};
