import { DiscountModel } from "../models/discount.model.js";

export const DiscountController = {

  async create(req, res) {
    try {
      await DiscountModel.create(req.body);
      res.status(201).json({ message: "Discount created successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getAll(req, res) {
    const data = await DiscountModel.getAll();
    res.json(data);
  },

  async getById(req, res) {
    const data = await DiscountModel.getById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Discount not found" });
    }
    res.json(data);
  },

  async update(req, res) {
    await DiscountModel.update(req.params.id, req.body);
    res.json({ message: "Discount updated successfully" });
  },

  async delete(req, res) {
    await DiscountModel.delete(req.params.id);
    res.json({ message: "Discount deleted successfully" });
  }
};
