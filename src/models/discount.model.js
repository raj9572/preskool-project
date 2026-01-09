import { poolPromise, sql } from "../config/db.js";

export const DiscountModel = {

  // CREATE
  async create(data) {
    const pool = await poolPromise;
    await pool.request()
      .input("discount_id", sql.VarChar(10), data.discount_id)
      .input("discount_type", sql.VarChar(50), data.discount_type)
      .input("discount_value", sql.Decimal(10, 2), data.discount_value)
      .query(`
        INSERT INTO dbo.discount_master
        (discount_id, discount_type, discount_value)
        VALUES (@discount_id, @discount_type, @discount_value)
      `);
  },

  // READ ALL
  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`SELECT * FROM dbo.discount_master`);
    return result.recordset;
  },

  // READ BY ID
  async getById(discountId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("discount_id", sql.VarChar(10), discountId)
      .query(`
        SELECT * FROM dbo.discount_master
        WHERE discount_id = @discount_id
      `);
    return result.recordset[0];
  },

  // UPDATE
  async update(discountId, data) {
    const pool = await poolPromise;
    await pool.request()
      .input("discount_id", sql.VarChar(10), discountId)
      .input("discount_type", sql.VarChar(50), data.discount_type)
      .input("discount_value", sql.Decimal(10, 2), data.discount_value)
      .query(`
        UPDATE dbo.discount_master
        SET discount_type = @discount_type,
            discount_value = @discount_value
        WHERE discount_id = @discount_id
      `);
  },

  // DELETE
  async delete(discountId) {
    const pool = await poolPromise;
    await pool.request()
      .input("discount_id", sql.VarChar(10), discountId)
      .query(`
        DELETE FROM dbo.discount_master
        WHERE discount_id = @discount_id
      `);
  }
};
