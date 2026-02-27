import FineModel from "../models/fine.model.js";

export const createFine = async (req, res) => {
  try {
    const fine = await FineModel.create(req.body);
    res.status(201).json({ success: true, data: fine });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllFines = async (req, res) => {
  try {
    const fines = await FineModel.getAll();
    res.json({ success: true, data: fines });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFinesByStudent = async (req, res) => {
  try {
    const fines = await FineModel.getByStudentId(req.params.studentId);
    res.json({ success: true, data: fines });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateFine = async (req, res) => {
  try {
    const result = await FineModel.update(req.params.id, req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteFine = async (req, res) => {
  try {
    const result = await FineModel.delete(req.params.id);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};