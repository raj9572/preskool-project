import { poolPromise, sql } from "../config/db.js";

export const TeacherModel = {

  async getAll() {
  const pool = await poolPromise;

  const result = await pool.request().query(`
    DECLARE @TodayColumn NVARCHAR(50)
    DECLARE @SQL NVARCHAR(MAX)

    -- Get today's date in yyyy-mm-dd format
    SET @TodayColumn = QUOTENAME(CONVERT(VARCHAR(10), GETDATE(), 23))

    SET @SQL = '
      SELECT 
          t.*,
          ISNULL(a.' + @TodayColumn + ', ''Not Marked'') AS TodayStatus
      FROM dbo.Teachers t
      LEFT JOIN dbo.TeacherAttendance a
          ON t.TeacherID = a.TeacherID
      ORDER BY t.TeacherID DESC
    '

    EXEC sp_executesql @SQL
  `);

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

  const addInput = (name, type, value) => {
    if (value !== undefined) {
      req.input(name, type, value);
    }
  };

  addInput("TeacherID", sql.Int, teacher.teacherId || 0);
  addInput("FullName", sql.NVarChar(100), teacher.fullName);
  addInput("Subject", sql.NVarChar(100), teacher.subject);
  addInput("Email", sql.NVarChar(100), teacher.email);
  addInput("ContactNumber", sql.NVarChar(15), teacher.contactNumber);
  addInput("Gender", sql.NVarChar(10), teacher.gender);
  addInput("DateOfBirth", sql.Date, teacher.dateOfBirth);
  addInput("Qualification", sql.NVarChar(100), teacher.qualification);
  addInput("ExperienceYears", sql.Int, teacher.experienceYears);
  addInput("Address", sql.NVarChar(255), teacher.address);
  addInput("City", sql.NVarChar(100), teacher.city);
  addInput("State", sql.NVarChar(100), teacher.state);
  addInput("PostalCode", sql.NVarChar(20), teacher.postalCode);
  addInput("Nationality", sql.NVarChar(50), teacher.nationality);
  addInput("DateOfJoining", sql.Date, teacher.dateOfJoining);
  addInput("BloodGroup", sql.NVarChar(5), teacher.bloodGroup);
  addInput("EmergencyContactName", sql.NVarChar(100), teacher.emergencyContactName);
  addInput("EmergencyContactNumber", sql.NVarChar(20), teacher.emergencyContactNumber);
  addInput("MaritalStatus", sql.NVarChar(20), teacher.maritalStatus);
  addInput("ProfilePictureUrl", sql.NVarChar(255), teacher.profilePictureUrl);

  addInput("VehicleNumber", sql.NVarChar(50), teacher.vehicleNumber);
  addInput("TransportNumber", sql.NVarChar(50), teacher.transportNumber);
  addInput("ProfilePhoto", sql.NVarChar(300), teacher.profilePhoto);
  addInput("IDProofPhoto", sql.NVarChar(300), teacher.idProofPhoto);

  addInput("Salary", sql.Decimal(10,2), teacher.salary);
  addInput("Class", sql.NVarChar(20), teacher.class);
  addInput("Section", sql.NVarChar(10), teacher.section);

  // ✅ NEW FIELDS
  addInput("PreviousSalary", sql.Decimal(10,2), teacher.previousSalary);
  addInput("Position", sql.NVarChar(100), teacher.position);
  addInput("Caste", sql.NVarChar(100), teacher.caste);

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
