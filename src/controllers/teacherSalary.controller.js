import { TeacherSalaryModel } from "../models/teacherSalary.model.js";

export const TeacherSalaryController = {

  async create(req, res) {
    try {
      const data = req.body;

			if (!Array.isArray(data) || data.length === 0) {
				return res.status(400).json({
					success: false,
					message: "Request body must be a non-empty array",
				});
			}
      const results = await Promise.all(data.map((item) => TeacherSalaryModel.create(item)));
      // const res = await TeacherSalaryModel.create(data);
      res.status(201).json({ success: true, results });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getAll(req, res) {
    const data = await TeacherSalaryModel.getAll();
    res.json({ success: true, data });
  },

  async getById(req, res) {
    const data = await TeacherSalaryModel.getById(+req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data });
  },

  async getByTeacher(req, res) {
    const data = await TeacherSalaryModel.getByTeacher(+req.params.teacherId);
    res.json({ success: true, data });
  },

  async update(req, res) {
    await TeacherSalaryModel.update(+req.params.id, req.body);
    res.json({ success: true, message: "Salary updated" });
  },

  async delete(req, res) {
    const ok = await TeacherSalaryModel.delete(+req.params.id);
    if (!ok) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Salary deleted" });
  }
};
