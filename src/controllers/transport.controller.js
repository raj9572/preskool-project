import { TransportModel } from "../models/transport.model.js";

export const TransportController = {

  async getAll(req, res) {
    try {
      const data = await TransportModel.getAll();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await TransportModel.getById(parseInt(req.params.id));
      if (!data) return res.status(404).json({ success: false, message: "Transport not found" });
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async create(req, res) {
    try {
      if (!req.body.transportNumber) {
        return res.status(400).json({ success: false, message: "transportNumber is required" });
      }

      const result = await TransportModel.create(req.body);
      res.status(201).json({
        success: true,
        message: "Transport created",
        transportId: result.TransportID
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async update(req, res) {
    try {
      const ok = await TransportModel.update(parseInt(req.params.id), req.body);
      if (!ok) return res.status(404).json({ success: false, message: "Transport not found" });
      res.json({ success: true, message: "Transport updated" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async delete(req, res) {
    try {
      const ok = await TransportModel.delete(parseInt(req.params.id));
      if (!ok) return res.status(404).json({ success: false, message: "Transport not found" });
      res.json({ success: true, message: "Transport deleted" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};
