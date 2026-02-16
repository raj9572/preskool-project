import { poolPromise, sql } from "../config/db.js";

export const BookIssueModel = {

  async create(data) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("BookId", sql.Int, data.bookId)
      .input("IssuedToId", sql.Int, data.issuedToId)
      .input("IssuedToType", sql.NVarChar(20), data.issuedToType)
      .input("IssueDate", sql.Date, data.issueDate)
      .input("DueDate", sql.Date, data.dueDate)
      .input("ReturnDate", sql.Date, data.returnDate || null)
      .input("FineAmount", sql.Decimal(10,2), data.fineAmount || 0)
      .input("FinePaid", sql.Bit, data.finePaid || false)
      .input("IssueStatus", sql.NVarChar(20), data.issueStatus || "Issued")
      .input("Remarks", sql.NVarChar(500), data.remarks || null)
      .input("CreatedBy", sql.NVarChar(100), data.createdBy || null)
      .query(`
        INSERT INTO dbo.BookIssues
        (BookId, IssuedToId, IssuedToType, IssueDate, DueDate,
         ReturnDate, FineAmount, FinePaid, IssueStatus,
         Remarks, CreatedBy)
        VALUES
        (@BookId, @IssuedToId, @IssuedToType, @IssueDate, @DueDate,
         @ReturnDate, @FineAmount, @FinePaid, @IssueStatus,
         @Remarks, @CreatedBy);

        SELECT SCOPE_IDENTITY() AS IssueId;
      `);

    return result.recordset[0];
  },

  async getAll(month) {
    const pool = await poolPromise;

    if (month) {
      const result = await pool.request()
        .input("Month", sql.VarChar(7), month)
        .query(`
          SELECT bi.*, b.BookTitle
          FROM dbo.BookIssues bi
          INNER JOIN dbo.Books b ON bi.BookId = b.BookId
          WHERE FORMAT(bi.IssueDate, 'yyyy-MM') = @Month
          ORDER BY bi.IssueDate DESC
        `);

      return result.recordset;
    }

    const result = await pool.request()
      .query(`
        SELECT bi.*, b.BookTitle
        FROM dbo.BookIssues bi
        INNER JOIN dbo.Books b ON bi.BookId = b.BookId
        ORDER BY bi.IssueDate DESC
      `);

    return result.recordset;
  },

  async getById(id) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("IssueId", sql.Int, id)
      .query(`
        SELECT bi.*, b.BookTitle
        FROM dbo.BookIssues bi
        INNER JOIN dbo.Books b ON bi.BookId = b.BookId
        WHERE bi.IssueId = @IssueId
      `);

    return result.recordset[0];
  },

  async update(id, data) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("IssueId", sql.Int, id)
      .input("ReturnDate", sql.Date, data.returnDate || null)
      .input("FineAmount", sql.Decimal(10,2), data.fineAmount || null)
      .input("FinePaid", sql.Bit, data.finePaid || null)
      .input("IssueStatus", sql.NVarChar(20), data.issueStatus || null)
      .input("Remarks", sql.NVarChar(500), data.remarks || null)
      .query(`
        UPDATE dbo.BookIssues
        SET
          ReturnDate = COALESCE(@ReturnDate, ReturnDate),
          FineAmount = COALESCE(@FineAmount, FineAmount),
          FinePaid = COALESCE(@FinePaid, FinePaid),
          IssueStatus = COALESCE(@IssueStatus, IssueStatus),
          Remarks = COALESCE(@Remarks, Remarks),
          UpdatedAt = GETDATE()
        WHERE IssueId = @IssueId;

        SELECT @@ROWCOUNT AS affectedRows;
      `);

    return result.recordset[0];
  },

  async delete(id) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("IssueId", sql.Int, id)
      .query(`
        DELETE FROM dbo.BookIssues
        WHERE IssueId = @IssueId;

        SELECT @@ROWCOUNT AS affectedRows;
      `);

    return result.recordset[0];
  }

};
