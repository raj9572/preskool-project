import { FeeStructureModel } from "../models/feeStructure.model.js";

export const FeeStructureController = {

  async create(req, res) {
    await FeeStructureModel.create(req.body);
    res.status(201).json({ message: "Fee structure created" });
  },

  async getAll(req, res) {
    res.json(await FeeStructureModel.getAll());
  },

  async getByClass(req, res) {
    const { className, academicYear } = req.query;
    res.json(await FeeStructureModel.getByClass(className, academicYear));
  },

  async update(req, res) {
    await FeeStructureModel.update(req.params.id, req.body);
    res.json({ message: "Fee structure updated" });
  },

  async delete(req, res) {
    await FeeStructureModel.delete(req.params.id);
    res.json({ message: "Fee structure deleted" });
  }
};
