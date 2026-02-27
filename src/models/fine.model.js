import { poolPromise, sql } from "../config/db.js";

const FineModel = {

  async create(data) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("StudentID", sql.Int, data.studentID)
      .input("StudentName", sql.NVarChar(200), data.studentName)
      .input("Fine", sql.Decimal(10,2), data.fine)
      .input("Description", sql.NVarChar(500), data.description || null)
      .input("Status", sql.NVarChar(50), data.status || "Unpaid")
      .query(`
        INSERT INTO dbo.Fines
        (StudentID, StudentName, Fine, Description, Status)
        VALUES
        (@StudentID, @StudentName, @Fine, @Description, @Status);

        SELECT SCOPE_IDENTITY() AS FineId;
      `);

    return result.recordset[0];
  },

  async getAll() {
    const pool = await poolPromise;

    const result = await pool.request()
      .query(`SELECT * FROM dbo.Fines ORDER BY CreatedAt DESC`);

    return result.recordset;
  },

  async getByStudentId(studentId) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("StudentID", sql.Int, studentId)
      .query(`
        SELECT * FROM dbo.Fines
        WHERE StudentID = @StudentID
        ORDER BY CreatedAt DESC
      `);

    return result.recordset;
  },

  async update(id, data) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("FineId", sql.Int, id)
      .input("Fine", sql.Decimal(10,2), data.fine || null)
      .input("Description", sql.NVarChar(500), data.description || null)
      .input("Status", sql.NVarChar(50), data.status || null)
      .query(`
        UPDATE dbo.Fines
        SET
          Fine = COALESCE(@Fine, Fine),
          Description = COALESCE(@Description, Description),
          Status = COALESCE(@Status, Status)
        WHERE FineId = @FineId;

        SELECT @@ROWCOUNT AS affectedRows;
      `);

    return result.recordset[0];
  },

  async delete(id) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("FineId", sql.Int, id)
      .query(`
        DELETE FROM dbo.Fines
        WHERE FineId = @FineId;

        SELECT @@ROWCOUNT AS affectedRows;
      `);

    return result.recordset[0];
  }

};

export default FineModel;