import { poolPromise, sql } from "../config/db.js";

export const NoticeModel = {

  // Get all notices
  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT NoticeID, Classes, [Description]
      FROM dbo.NoticeBoard
      ORDER BY NoticeID DESC
    `);
    return result.recordset;
  },

  // Create notice
  async create(notice) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("Classes", sql.NVarChar, notice.Classes)
      .input("Description", sql.NVarChar, notice.Description)
      .query(`
        INSERT INTO dbo.NoticeBoard (Classes, [Description])
        VALUES (@Classes, @Description);
        SELECT CAST(SCOPE_IDENTITY() AS INT) AS NoticeID;
      `);

    return result.recordset[0].NoticeID;
  },

  //Get notice by ID
  async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("NoticeID", sql.Int, id)
      .query(`
        SELECT NoticeID, Classes, [Description]
        FROM dbo.NoticeBoard
        WHERE NoticeID = @NoticeID
      `);
    return result.recordset[0];
  },    

  // Delete notice
  async deleteById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("NoticeID", sql.Int, id)
      .query(`DELETE FROM dbo.NoticeBoard WHERE NoticeID = @NoticeID`);

    return result.rowsAffected[0] > 0;
  }
};
