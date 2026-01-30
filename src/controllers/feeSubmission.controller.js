// import { FeeSubmissionModel } from "../models/feeSubmission.model.js";


import { FeeSubmissionModel } from "../models/feeSubmission.model.js";

export const FeeSubmissionController = {

  async getAll(req, res) {
    try {
      const data = await FeeSubmissionModel.getAll();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getByStudent(req, res) {
    try {
      const studentId = parseInt(req.params.studentId);
      if (!studentId)
        return res.status(400).json({ success: false, message: "StudentID must be int" });

      const data = await FeeSubmissionModel.getByStudentId(studentId);
      res.json({ success: true, studentId, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async create(req, res) {
    try {
      const studentId = Number(req.body.studentId);
      if (!studentId)
        return res.status(400).json({ success: false, message: "studentId is required (int)" });

      const result = await FeeSubmissionModel.create({
        ...req.body,
        studentId
      });

      res.status(201).json({
        success: true,
        message: "Fee submitted successfully",
        submissionId: result.SubmissionID
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getByTransaction(req, res) {
  const data = await FeeSubmissionModel.getByTransaction(req.params.transactionId);
  if (!data) {
    return res.status(404).json({ message: "Transaction not found" });
  }
  res.json(data);
  },

  async delete(req, res) {
    try {
      const ok = await FeeSubmissionModel.delete(parseInt(req.params.id));
      if (!ok)
        return res.status(404).json({ success: false, message: "Submission not found" });

      res.json({ success: true, message: "Fee submission deleted" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};



