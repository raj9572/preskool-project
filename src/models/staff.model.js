import { poolPromise, sql } from "../config/db.js";

export const StaffModel = {

  async upsert(staff) {
    const pool = await poolPromise;

    await pool.request()
      .input("StaffID", sql.Int, staff.StaffID || null)
      .input("FullName", sql.NVarChar, staff.FullName)
      .input("Role", sql.NVarChar, staff.Role)
      .input("ContactNumber", sql.VarChar, staff.ContactNumber)
      .input("Email", sql.VarChar, staff.Email)
      .input("Gender", sql.NVarChar, staff.Gender)
      .input("DateOfBirth", sql.Date, staff.DateOfBirth)
      .input("Qualification", sql.NVarChar, staff.Qualification)
      .input("DateOfJoining", sql.Date, staff.DateOfJoining)
      .input("ExperienceYears", sql.Int, staff.ExperienceYears)
      .input("Address", sql.NVarChar, staff.Address)
      .input("City", sql.NVarChar, staff.City)
      .input("State", sql.NVarChar, staff.State)
      .input("PostalCode", sql.VarChar, staff.PostalCode)
      .input("Nationality", sql.NVarChar, staff.Nationality)
      .input("MaritalStatus", sql.NVarChar, staff.MaritalStatus)
      .input("EmergencyContactName", sql.NVarChar, staff.EmergencyContactName)
      .input("EmergencyContactNumber", sql.VarChar, staff.EmergencyContactNumber)
      .input("ProfilePictureUrl", sql.VarChar, staff.ProfilePictureUrl)
      .execute("dbo.UpsertStaff");
  },

  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Staffs");
    return result.recordset;
  },

  async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("StaffID", sql.Int, id)
      .query("SELECT * FROM Staffs WHERE StaffID = @StaffID");
    return result.recordset[0];
  },

  async deleteById(id) {
    const pool = await poolPromise;
    await pool.request()
      .input("StaffID", sql.Int, id)
      .query("DELETE FROM Staffs WHERE StaffID = @StaffID");
  }
};
