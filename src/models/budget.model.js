import { poolPromise } from "../config/db.js";

const BudgetModel = {

  async getClasswiseBudget() {
    const pool = await poolPromise;

    const result = await pool.request()
      .execute("sp_ClasswiseBudget");

    return result.recordset;
  }

};

export default BudgetModel;