import { PendingFeeModels } from "../models/pendingFee.model.js";

export const PendingFeeController = {

  async getPendingFees(req, res) {
    try {
    const { StudentID, ClassID, SectionID } = req.body;

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
  }

};
