import { InventoryModel } from "../models/inventory.model.js";

export const InventoryController = {

  async create(req, res) {
    try {
      const result = await InventoryModel.create(req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const data = await InventoryModel.getAll();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await InventoryModel.getById(req.params.id);
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const result = await InventoryModel.update(req.params.id, req.body);
      res.json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const result = await InventoryModel.delete(req.params.id);
      res.json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

};
