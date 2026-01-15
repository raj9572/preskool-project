import { StudentExamResultModel } from "../models/studentExamResult.model.js";

export const StudentExamResultController = {

  // POST /api/student-exam-result
  async create(req, res) {
    try {
      const inserted = await StudentExamResultModel.create(req.body);
      res.status(201).json({
        message: "Exam result created successfully",
        ResultId: inserted.ResultId
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // GET /api/student-exam-result
  async getAll(req, res) {
    const data = await StudentExamResultModel.getAll();
    res.json(data);
  },

  // GET /api/student-exam-result/:id
  async getById(req, res) {
    const data = await StudentExamResultModel.getById(req.params.id);
    if (!data) return res.status(404).json({ message: "Result not found" });
    res.json(data);
  },

  // GET /api/student-exam-result/student/:studentId
  async getByStudent(req, res) {
    const data = await StudentExamResultModel.getByStudent(req.params.studentId);
    res.json(data);
  },

  // PUT /api/student-exam-result/:id
  async update(req, res) {
    await StudentExamResultModel.update(req.params.id, req.body);
    res.json({ message: "Exam result updated successfully" });
  },

  // DELETE /api/student-exam-result/:id
  async delete(req, res) {
    await StudentExamResultModel.delete(req.params.id);
    res.json({ message: "Exam result deleted successfully" });
  }
};
