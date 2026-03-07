import { poolPromise, sql } from "../config/db.js";

export const PaymentModel = {

  // Get all payments
 async getAll() {
  const pool = await poolPromise;

  const result = await pool.request().query(`
    SELECT *
    FROM Payments
    ORDER BY PaymentDate DESC
  `);

  return result.recordset;
},

// Get payment by ID
async getById(id) {
  const pool = await poolPromise;

  const result = await pool.request()
    .input("PaymentID", sql.Int, id)
    .query(`
      SELECT *
      FROM Payments
      WHERE PaymentID = @PaymentID
    `);

  return result.recordset[0];
},

  // Create payment
  async create(data) {
  const pool = await poolPromise;

  const result = await pool.request()
    .input("PersonType", sql.VarChar(20), data.personType)
    .input("PersonID", sql.Int, data.personId)
    .input("PaymentCategory", sql.VarChar(30), data.paymentCategory)
    .input("TotalAmount", sql.Decimal(10,2), data.totalAmount)
    .input("PaymentMethod", sql.VarChar(20), data.paymentMethod)
    .input("PaymentDate", sql.DateTime, data.paymentDate)
    .input("ReferenceNo", sql.VarChar(100), data.referenceNo || null)
    .input("Remarks", sql.VarChar(255), data.remarks || null)
    .query(`
      INSERT INTO Payments
      (PersonType, PersonID, PaymentCategory, TotalAmount,
       PaymentMethod, PaymentDate, ReferenceNo, Remarks)
      VALUES
      (@PersonType, @PersonID, @PaymentCategory, @TotalAmount,
       @PaymentMethod, @PaymentDate, @ReferenceNo, @Remarks)

      SELECT SCOPE_IDENTITY() AS PaymentID
    `);

  return result.recordset[0];
},

async update(id, data) {
  const pool = await poolPromise;

  const result = await pool.request()
    .input("PaymentID", sql.Int, id)
    .input("TotalAmount", sql.Decimal(10,2), data.totalAmount || null)
    .input("PaymentMethod", sql.VarChar(20), data.paymentMethod || null)
    .input("ReferenceNo", sql.VarChar(100), data.referenceNo || null)
    .input("Remarks", sql.VarChar(255), data.remarks || null)
    .query(`
      UPDATE Payments
      SET
        TotalAmount = COALESCE(@TotalAmount, TotalAmount),
        PaymentMethod = COALESCE(@PaymentMethod, PaymentMethod),
        ReferenceNo = COALESCE(@ReferenceNo, ReferenceNo),
        Remarks = COALESCE(@Remarks, Remarks)
      WHERE PaymentID = @PaymentID

      SELECT @@ROWCOUNT AS affectedRows
    `);

  return result.recordset[0];
},

  
  
  async getByPerson(personType, personId) {
  const pool = await poolPromise;

  const result = await pool.request()
    .input("PersonType", sql.VarChar(20), personType)
    .input("PersonID", sql.Int, personId)
    .query(`
      SELECT *
      FROM Payments
      WHERE PersonType = @PersonType
      AND PersonID = @PersonID
      ORDER BY PaymentDate DESC
    `);

  return result.recordset;
},

  // Delete payment
  async deletePayment(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("PaymentID", sql.Int, id)
      .query(`DELETE FROM Payments WHERE PaymentID = @PaymentID`);

    return result.rowsAffected[0] > 0;
  }
};
