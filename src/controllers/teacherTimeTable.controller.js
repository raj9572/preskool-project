import { TeacherTimeTableModel } from "../models/teacherTimeTable.model.js";

export const TeacherTimeTableController = {

  async create(req, res) {
    try {
      const data = await TeacherTimeTableModel.create(req.body);
      res.json({ success: true, data });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async getAll(req, res) {
    const data = await TeacherTimeTableModel.getAll();
    res.json({ success: true, data });
  },

  async getById(req, res) {
    const data = await TeacherTimeTableModel.getById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data });
  },

  async getByTeacher(req, res) {
    const data = await TeacherTimeTableModel.getByTeacher(req.params.teacherId);
    res.json({ success: true, data });
  },

  async update(req, res) {
    const data = await TeacherTimeTableModel.update(req.params.id, req.body);
    res.json({ success: true, data });
  },

  async delete(req, res) {
    await TeacherTimeTableModel.delete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  }
};
