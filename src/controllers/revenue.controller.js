import { RevenueModel } from "../models/revenue.model.js";

export const RevenueController = {

  async getRevenueSummary(req, res) {
    try {
      const data = await RevenueModel.getSessionRevenue();

      res.json({
        success: true,
        sessionStart: "April",
        monthlyRevenue: data.monthly,
        totalRevenue: data.total.TotalRevenueFromSessionStart
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

};
