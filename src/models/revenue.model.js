import { poolPromise, sql } from "../config/db.js";

export const RevenueModel = {
async getSessionRevenue() {
  const pool = await poolPromise;
  const result = await pool.request()
    .execute("dbo.GetSessionRevenueSummary");

  return {
    monthly: result.recordsets[0],
    total: result.recordsets[1][0]
  };
}

};



