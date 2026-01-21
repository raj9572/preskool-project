import { poolPromise, sql } from "../config/db.js";

export const StudentModel = {

  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`SELECT * FROM dbo.Students ORDER BY StudentID DESC`);
    return result.recordset;
  },

  async getById(studentId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("StudentID", sql.Int, studentId)
      .query(`SELECT * FROM dbo.Students WHERE StudentID = @StudentID`);
    return result.recordset[0];
  },

  async upsert(student) {
    const pool = await poolPromise;
    const req = pool.request();

    req.input("StudentID", sql.Int, student.studentId || 0);
    req.input("FatherPhoto", sql.NVarChar(300), student.fatherPhoto || null);
    req.input("MotherPhoto", sql.NVarChar(300), student.motherPhoto || null);
    req.input("GuardianPhoto", sql.NVarChar(300), student.guardianPhoto || null);
    req.input("PhotoUrl", sql.NVarChar(300), student.photo || null);
    req.input("Status", sql.NVarChar(30), student.status || null);
    req.input("RollNo", sql.NVarChar(20), student.rollNo || null);
    req.input("AdmissionNo", sql.NVarChar(50), student.admissionNo || null);
    req.input("JoiningDate", sql.Date, student.joiningDate || null);
    req.input("Program", sql.NVarChar(100), student.program || null);
    req.input("YearSemester", sql.NVarChar(50), student.yearSemester || null);
    req.input("PreviousRecord", sql.NVarChar(200), student.previousRecord || null);
    req.input("GPA", sql.NVarChar(20), student.gpa || null);
    req.input("Attendance", sql.NVarChar(20), student.attendance || null);
    req.input("Subjects", sql.NVarChar(200), student.subjects || null);
    req.input("FullName", sql.NVarChar(200), student.fullName || null);
    req.input("DOB", sql.Date, student.dob || null);
    req.input("Gender", sql.NVarChar(10), student.gender || null);
    req.input("ClassID", sql.VarChar(10), student.class || null);
    req.input("SectionID", sql.VarChar(10), student.section || null);
    req.input("Address", sql.NVarChar(500), student.address || null);
    req.input("ContactNumber", sql.NVarChar(50), student.contact || null);
    req.input("EmailAddress", sql.NVarChar(200), student.email || null);
    req.input("Nationality", sql.NVarChar(100), student.nationality || null);
    req.input("GuardianName", sql.NVarChar(200), student.guardianName || null);
    req.input("GuardianRelation", sql.NVarChar(100), student.guardianRelation || null);
    req.input("GuardianContact", sql.NVarChar(50), student.guardianContact || null);
    req.input("GuardianOccupation", sql.NVarChar(100), student.guardianOccupation || null);
    req.input("GuardianAddress", sql.NVarChar(500), student.guardianAddress || null);

    const result = await req.execute("dbo.UpsertStudent");
    return result.recordset?.[0];
  },

  async delete(studentId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("StudentID", sql.Int, studentId)
      .query(`DELETE FROM dbo.Students WHERE StudentID=@StudentID`);

    return result.rowsAffected[0] > 0;
  },

   async deleteStudentComplete(studentId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("StudentID", sql.Int, studentId)
      .execute("dbo.DeleteStudentComplete");

    return result.recordset?.[0];
  }
};
