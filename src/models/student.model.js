import { poolPromise, sql } from "../config/db.js";

export const StudentModel = {

  async findByEmail(email) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("EmailAddress", sql.VarChar, email)
      .query(`
        SELECT * FROM Students
        WHERE EmailAddress = @EmailAddress
      `);
    return result.recordset[0];
  },

  async create(student) {
    const pool = await poolPromise;
    await pool.request()
      .input("FullName", sql.NVarChar, student.FullName)
      .input("EmailAddress", sql.VarChar, student.EmailAddress)
      .input("Password", sql.NVarChar, student.Password)
      .input("DOB", sql.Date, student.DOB)
      .input("Gender", sql.NVarChar, student.Gender)
      .input("ClassID", sql.VarChar, student.ClassID)
      .input("SectionID", sql.VarChar, student.SectionID)
      .query(`
        INSERT INTO Students
        (FullName, EmailAddress, Password, DOB, Gender, ClassID, SectionID)
        VALUES
        (@FullName, @EmailAddress, @Password, @DOB, @Gender, @ClassID, @SectionID)
      `);
  }

};
