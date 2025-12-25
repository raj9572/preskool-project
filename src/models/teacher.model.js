import { poolPromise, sql } from "../config/db.js";

export const TeacherModel = {

  async upsert(teacher) {
    const pool = await poolPromise;

    await pool.request()
      .input("TeacherID", sql.Int, teacher.TeacherID || null)
      .input("FullName", sql.NVarChar, teacher.FullName)
      .input("Subject", sql.NVarChar, teacher.Subject)
      .input("Email", sql.VarChar, teacher.Email)
      .input("ContactNumber", sql.VarChar, teacher.ContactNumber)
      .input("Gender", sql.NVarChar, teacher.Gender)
      .input("DateOfBirth", sql.Date, teacher.DateOfBirth)
      .input("Qualification", sql.NVarChar, teacher.Qualification)
      .input("ExperienceYears", sql.Int, teacher.ExperienceYears)
      .input("Address", sql.NVarChar, teacher.Address)
      .input("City", sql.NVarChar, teacher.City)
      .input("State", sql.NVarChar, teacher.State)
      .input("PostalCode", sql.VarChar, teacher.PostalCode)
      .input("Nationality", sql.NVarChar, teacher.Nationality)
      .input("DateOfJoining", sql.Date, teacher.DateOfJoining)
      .input("BloodGroup", sql.NVarChar, teacher.BloodGroup)
      .input("EmergencyContactName", sql.NVarChar, teacher.EmergencyContactName)
      .input("EmergencyContactNumber", sql.VarChar, teacher.EmergencyContactNumber)
      .input("MaritalStatus", sql.NVarChar, teacher.MaritalStatus)
      .input("ProfilePictureUrl", sql.VarChar, teacher.ProfilePictureUrl)
      .execute("dbo.UpsertTeacher");
  },

  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Teachers");
    return result.recordset;
  },

  async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("TeacherID", sql.Int, id)
      .query("SELECT * FROM Teachers WHERE TeacherID = @TeacherID");
    return result.recordset[0];
  },

  async deleteById(id) {
    const pool = await poolPromise;
    await pool.request()
      .input("TeacherID", sql.Int, id)
      .query("DELETE FROM Teachers WHERE TeacherID = @TeacherID");
  }
};
