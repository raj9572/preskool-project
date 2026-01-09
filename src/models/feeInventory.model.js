// import sql from "mssql/msnodesqlv8.js";
import { poolPromise,sql } from "../config/db.js";

export const FeeInventoryModel = {

  async create(data) {
    const pool = await poolPromise;
    await pool.request()
      .input("fee_id", sql.VarChar(10), data.fee_id || null)
      .input("class", sql.VarChar(20), data.class)
      .input("fee_type", sql.VarChar(50), data.fee_type)
      .input("price", sql.Decimal(10, 2), data.price)
      .input("academic_year", sql.VarChar(9), data.academic_year)
      .query(`
        INSERT INTO dbo.fee_inventory
        (fee_id, [class], fee_type, price, academic_year)
        VALUES (@fee_id, @class, @fee_type, @price, @academic_year)
      `);
  },

  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`
        SELECT * FROM dbo.fee_inventory
      `);
    return result.recordset;
  },

  async getById(feeId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("fee_id", sql.VarChar(10), feeId)
      .query(`
        SELECT * FROM dbo.fee_inventory
        WHERE fee_id = @fee_id
      `);
    return result.recordset[0];
  },

  async update(feeId, data) {
    const pool = await poolPromise;
    await pool.request()
      .input("fee_id", sql.VarChar(10), feeId)
      .input("class", sql.VarChar(20), data.class)
      .input("fee_type", sql.VarChar(50), data.fee_type)
      .input("price", sql.Decimal(10, 2), data.price)
      .input("academic_year", sql.VarChar(9), data.academic_year)
      .query(`
        UPDATE dbo.fee_inventory
        SET [class] = @class,
            fee_type = @fee_type,
            price = @price,
            academic_year = @academic_year
        WHERE fee_id = @fee_id
      `);
  },

  async delete(feeId) {
    const pool = await poolPromise;
    await pool.request()
      .input("fee_id", sql.VarChar(10), feeId)
      .query(`
        DELETE FROM dbo.fee_inventory
        WHERE fee_id = @fee_id
      `);
  }
};