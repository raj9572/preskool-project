import { PendingFeeModels } from "../models/pendingFee.model.js";

export const PendingFeeController = {

  async getPendingFees(req, res) {
    try {
      const { StudentID, ClassID, SectionID } = req.query;

      if (!StudentID && !ClassID) {
        return res.status(400).json({
          success: false,
          message: "Please provide StudentID or ClassID",
        });
      }

      const data = await PendingFeeModels.getPendingFees({
        StudentID,
        ClassID,
        SectionID,
      });

      res.status(200).json({
        success: true,
        count: data.length,
        data,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },

  async sendPendingFeeEmails(req, res) {
    try {
      const result = await PendingFeeModels.sendPendingFeeEmails();

      if (!result.success) {
        return res.status(500).json(result);
      }

      res.json(result);

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },
  async DefaulterStudentsList(req, res) {
    try {
      const result = await PendingFeeModels.getDefaulterStudents();

      if (!result.success) {
        return res.status(500).json(result);
      }

      res.json(result);

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },
};
