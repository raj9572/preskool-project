import { poolPromise, sql } from "../config/db.js";

export const StaffModel = {

  async getAll() {
  const pool = await poolPromise;

  const result = await pool.request().query(`
    DECLARE @TodayColumn NVARCHAR(50)
    DECLARE @SQL NVARCHAR(MAX)

    -- Get today's date in yyyy-mm-dd format
    SET @TodayColumn = QUOTENAME(CONVERT(VARCHAR(10), GETDATE(), 23))

    SET @SQL = '
      SELECT 
          s.*,
          ISNULL(a.' + @TodayColumn + ', ''Not Marked'') AS TodayStatus
      FROM dbo.Staffs s
      LEFT JOIN dbo.StaffAttendance a
          ON s.StaffID = a.StaffID
      ORDER BY s.StaffID DESC
    '

    EXEC sp_executesql @SQL
  `);

  return result.recordset;
},

  async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("StaffID", sql.Int, id)
      .query(`SELECT * FROM dbo.Staffs WHERE StaffID=@StaffID`);
    return result.recordset[0];
  },

  async upsert(staff) {
    const pool = await poolPromise;
    const req = pool.request();

    req.input("StaffID", sql.Int, staff.staffId || 0);

    req.input("FullName", sql.NVarChar(100), staff.fullName || null);
    req.input("Role", sql.NVarChar(50), staff.role || null);
    req.input("ContactNumber", sql.NVarChar(15), staff.contactNumber || null);
    req.input("Email", sql.NVarChar(100), staff.email || null);
    req.input("Gender", sql.NVarChar(10), staff.gender || null);
    req.input("DateOfBirth", sql.Date, staff.dateOfBirth || null);
    req.input("Qualification", sql.NVarChar(100), staff.qualification || null);
    req.input("DateOfJoining", sql.Date, staff.dateOfJoining || null);
    req.input("ExperienceYears", sql.Int, staff.experienceYears || null);
    req.input("Address", sql.NVarChar(255), staff.address || null);
    req.input("City", sql.NVarChar(100), staff.city || null);
    req.input("State", sql.NVarChar(100), staff.state || null);
    req.input("PostalCode", sql.NVarChar(20), staff.postalCode || null);
    req.input("Nationality", sql.NVarChar(50), staff.nationality || null);
    req.input("MaritalStatus", sql.NVarChar(20), staff.maritalStatus || null);
    req.input("EmergencyContactName", sql.NVarChar(100), staff.emergencyContactName || null);
    req.input("EmergencyContactNumber", sql.NVarChar(20), staff.emergencyContactNumber || null);
    req.input("ProfilePictureUrl", sql.NVarChar(255), staff.profilePictureUrl || null);
    req.input("VehicleNumber", sql.NVarChar(50), staff.vehicleNumber || null);
    req.input("TransportNumber", sql.NVarChar(50), staff.transportNumber || null);
    req.input("ProfilePhoto", sql.NVarChar(300), staff.profilePhoto || null);
    req.input("IDProofPhoto", sql.NVarChar(300), staff.idProofPhoto || null);
    req.input("Salary", sql.Decimal(10, 2), staff.salary || null);

    const result = await req.execute("dbo.UpsertStaff");
    return result.recordset?.[0];
  },

  async delete(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("StaffID", sql.Int, id)
      .query(`DELETE FROM dbo.Staffs WHERE StaffID=@StaffID`);

    return result.rowsAffected[0] > 0;
  }
};
