import { FeeInventoryModel } from "../models/feeInventory.model.js";

export const FeeInventoryController = {

  async create(req, res) {
    try {
      await FeeInventoryModel.create(req.body);
      res.status(201).json({ message: "Fee inventory created successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getAll(req, res) {
    const data = await FeeInventoryModel.getAll();
    res.json(data);
  },

  async getById(req, res) {
    const data = await FeeInventoryModel.getById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Fee not found" });
    }
    res.json(data);
  },

  async update(req, res) {
    await FeeInventoryModel.update(req.params.id, req.body);
    res.json({ message: "Fee inventory updated successfully" });
  },

  async delete(req, res) {
    await FeeInventoryModel.delete(req.params.id);
    res.json({ message: "Fee inventory deleted successfully" });
  }
};
