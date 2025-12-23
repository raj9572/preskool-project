import { poolPromise, sql } from "../config/db.js";

export const UserModel = {

  async findByUsername(username) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("Username", sql.NVarChar, username)
      .query(`
        SELECT * FROM Users
        WHERE Username = @Username
      `);

    return result.recordset[0];
  },

  async create(user) {
    const pool = await poolPromise;
    await pool.request()
      .input("Username", sql.NVarChar, user.Username)
      .input("Password", sql.NVarChar, user.Password)
      .input("Role", sql.NVarChar, user.Role)
      .input("LinkedID", sql.Int, user.LinkedID)
      .input("isActive", sql.Bit, user.isActive)
      .query(`
        INSERT INTO Users
        (Username, Password, Role, LinkedID, isActive, createdAt)
        VALUES
        (@Username, @Password, @Role, @LinkedID, @isActive, GETDATE())
      `);
  }

};
