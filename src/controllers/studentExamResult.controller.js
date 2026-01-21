import { StudentExamResultModel } from "../models/studentExamResult.model.js";

export const StudentExamResultController = {

  async getAll(req, res) {
    try {
      const data = await StudentExamResultModel.getAll();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await StudentExamResultModel.getById(req.params.id);
      if (!data) {
        return res.status(404).json({ success: false, message: "Result not found" });
      }
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  
  async getByStudentId(req, res) {
  try {
    const studentId = parseInt(req.params.studentId);

    if (!studentId || Number.isNaN(studentId)) {
      return res.status(400).json({
        success: false,
        message: "studentId must be a valid integer"
      });
    }

    const data = await StudentExamResultModel.getByStudentId(studentId);

    res.json({
      success: true,
      studentId,
      totalResults: data.length,
      data
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
},

  async create(req, res) {
    try {
      const dto = req.body;

      const studentId = Number(dto.studentId);
      if (!studentId || Number.isNaN(studentId)) {
        return res.status(400).json({
          success: false,
          message: "studentId must be integer"
        });
      }

      if (!dto.subject || !dto.examType) {
        return res.status(400).json({
          success: false,
          message: "subject and examType are required"
        });
      }

      const result = await StudentExamResultModel.create({
        ...dto,
        studentId
      });

      res.status(201).json({
        success: true,
        message: "Exam result created",
        result
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async update(req, res) {
    try {
      const dto = req.body;
      const resultId = parseInt(req.params.id);

      const studentId = Number(dto.studentId);
      if (!studentId || Number.isNaN(studentId)) {
        return res.status(400).json({
          success: false,
          message: "studentId must be integer"
        });
      }

      const updated = await StudentExamResultModel.update(resultId, {
        ...dto,
        studentId
      });

      if (updated.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Result not found" });
      }

      res.json({ success: true, message: "Exam result updated" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },


  async delete(req, res) {
    try {
      const resultId = parseInt(req.params.id);

      const ok = await StudentExamResultModel.delete(resultId);
      if (!ok) return res.status(404).json({ success: false, message: "Result not found" });

      res.json({ success: true, message: "Result deleted" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};
