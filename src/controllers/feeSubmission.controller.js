import { FeeSubmissionModel } from "../models/feeSubmission.model.js";

export const FeeSubmissionController = {

  // POST /api/fee-submission
  async create(req, res) {
    try {
      await FeeSubmissionModel.create(req.body);
      res.status(201).json({
        message: "Fee submitted successfully"
      });
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  },

  // GET /api/fee-submission
  async getAll(req, res) {
    const data = await FeeSubmissionModel.getAll();
    console.log(data)
    res.status(200).json({result:true, data});
  },

  // GET /api/fee-submission/student/:studentId
  async getByStudent(req, res) {
    res.json(await FeeSubmissionModel.getByStudent(req.params.studentId));
  },

  // GET /api/fee-submission/transaction/:transactionId
  async getByTransaction(req, res) {
    const data = await FeeSubmissionModel.getByTransaction(req.params.transactionId);
    if (!data) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json(data);
  },

  // DELETE /api/fee-submission/:id
  async delete(req, res) {
    await FeeSubmissionModel.delete(req.params.id);
    res.json({ message: "Fee submission deleted" });
  }
};
