import { poolPromise, sql } from "../config/db.js";

export const TeacherModel = {

  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`SELECT * FROM dbo.Teachers ORDER BY TeacherID DESC`);
    return result.recordset;
  },

  async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("TeacherID", sql.Int, id)
      .query(`SELECT * FROM dbo.Teachers WHERE TeacherID=@TeacherID`);
    return result.recordset[0];
  },

  async upsert(teacher) {
    const pool = await poolPromise;
    const req = pool.request();

    req.input("TeacherID", sql.Int, teacher.teacherId || 0);
    req.input("FullName", sql.NVarChar(100), teacher.fullName || null);
    req.input("Subject", sql.NVarChar(100), teacher.subject || null);
    req.input("Email", sql.NVarChar(100), teacher.email || null);
    req.input("ContactNumber", sql.NVarChar(15), teacher.contactNumber || null);
    req.input("Gender", sql.NVarChar(10), teacher.gender || null);
    req.input("DateOfBirth", sql.Date, teacher.dateOfBirth || null);
    req.input("Qualification", sql.NVarChar(100), teacher.qualification || null);
    req.input("ExperienceYears", sql.Int, teacher.experienceYears || null);
    req.input("Address", sql.NVarChar(255), teacher.address || null);
    req.input("City", sql.NVarChar(100), teacher.city || null);
    req.input("State", sql.NVarChar(100), teacher.state || null);
    req.input("PostalCode", sql.NVarChar(20), teacher.postalCode || null);
    req.input("Nationality", sql.NVarChar(50), teacher.nationality || null);
    req.input("DateOfJoining", sql.Date, teacher.dateOfJoining || null);
    req.input("BloodGroup", sql.NVarChar(5), teacher.bloodGroup || null);
    req.input("EmergencyContactName", sql.NVarChar(100), teacher.emergencyContactName || null);
    req.input("EmergencyContactNumber", sql.NVarChar(20), teacher.emergencyContactNumber || null);
    req.input("MaritalStatus", sql.NVarChar(20), teacher.maritalStatus || null);
    req.input("ProfilePictureUrl", sql.NVarChar(255), teacher.profilePictureUrl || null);
    req.input("VehicleNumber", sql.NVarChar(50), teacher.vehicleNumber || null);
    req.input("TransportNumber", sql.NVarChar(50), teacher.transportNumber || null);
    req.input("ProfilePhoto", sql.NVarChar(300), teacher.profilePhoto || null);
    req.input("IDProofPhoto", sql.NVarChar(300), teacher.idProofPhoto || null);
    req.input("Salary", sql.Decimal(10, 2), teacher.salary || null);
    req.input("Class", sql.NVarChar(20), teacher.class || null);
    req.input("Section", sql.NVarChar(10), teacher.section || null);

    const result = await req.execute("dbo.UpsertTeacher");
    return result.recordset?.[0];
  },

  async delete(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("TeacherID", sql.Int, id)
      .query(`DELETE FROM dbo.Teachers WHERE TeacherID=@TeacherID`);

    return result.rowsAffected[0] > 0;
  }
};
