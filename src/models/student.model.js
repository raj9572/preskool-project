import { poolPromise, sql } from "../config/db.js";

export const StudentModel = {

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
      FROM dbo.Students s
      LEFT JOIN dbo.StudentAttendence a 
          ON s.StudentID = a.StudentID
      ORDER BY s.StudentID DESC
    '

    EXEC sp_executesql @SQL
  `);

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

  // photos
  req.input("FatherPhoto", sql.NVarChar(300), student.fatherPhoto );
  req.input("MotherPhoto", sql.NVarChar(300), student.motherPhoto );
  req.input("GuardianPhoto", sql.NVarChar(300), student.guardianPhoto );

  // basic info
  req.input("PhotoUrl", sql.NVarChar(300), student.photo );
  req.input("Status", sql.NVarChar(30), student.status);
  req.input("RollNo", sql.NVarChar(20), student.rollNo );
  req.input("AdmissionNo", sql.NVarChar(50), student.admissionNo );
  req.input("JoiningDate", sql.Date, student.joiningDate );
  req.input("Program", sql.NVarChar(100), student.program );
  req.input("YearSemester", sql.NVarChar(50), student.yearSemester );
  req.input("PreviousRecord", sql.NVarChar(200), student.previousRecord );
  req.input("GPA", sql.NVarChar(20), student.gpa );
  req.input("Attendance", sql.NVarChar(20), student.attendance );
  req.input("Subjects", sql.NVarChar(200), student.subjects );

  // student details
  req.input("FullName", sql.NVarChar(200), student.fullName );
  req.input("DOB", sql.Date, student.dob );
  req.input("Gender", sql.NVarChar(10), student.gender );
  req.input("ClassID", sql.VarChar(10), student.class );
  req.input("SectionID", sql.VarChar(10), student.section );
  req.input("Address", sql.NVarChar(500), student.address );
  req.input("ContactNumber", sql.NVarChar(50), student.contact );
  req.input("EmailAddress", sql.NVarChar(200), student.email );
  req.input("Nationality", sql.NVarChar(100), student.nationality );

  req.input("IdentificationNumber", sql.NVarChar(100), student.identificationNumber );
  req.input("EnrollmentNumber", sql.NVarChar(100), student.enrollmentNumber );
  req.input("AdmissionDate", sql.Date, student.admissionDate );
  req.input("ProgramName", sql.NVarChar(200), student.programName );
  req.input("YearOrSemester", sql.NVarChar(100), student.yearOrSemester );
  req.input("PreviousAcademicRecord", sql.NVarChar(sql.MAX), student.previousAcademicRecord );
  req.input("GPAOrMarks", sql.NVarChar(50), student.gpaOrMarks );
  req.input("AttendancePercentage", sql.Decimal(5,2), student.attendancePercentage );
  req.input("SubjectsTaken", sql.NVarChar(sql.MAX), student.subjectsTaken );
  req.input("AcademicStatus", sql.NVarChar(100), student.academicStatus );

  // guardian
  req.input("GuardianName", sql.NVarChar(200), student.guardianName );
  req.input("GuardianRelation", sql.NVarChar(100), student.guardianRelation );
  req.input("GuardianContact", sql.NVarChar(50), student.guardianContact );
  req.input("GuardianOccupation", sql.NVarChar(100), student.guardianOccupation );
  req.input("GuardianAddress", sql.NVarChar(500), student.guardianAddress );
  req.input("ParentEmail", sql.NVarChar(500), student.parentEmail );

  // NEW TRANSPORT + HOUSE
  req.input("HouseName", sql.NVarChar(100), student.houseName );
  req.input("Cast", sql.NVarChar(100), student.cast );
  req.input("PendingFee", sql.Decimal(10,2), student.pendingFee );
  req.input("Route", sql.NVarChar(100), student.route );
  req.input("TransportStatus", sql.NVarChar(10), student.transportStatus );
  req.input("VehicleNo", sql.NVarChar(50), student.vehicleNo );

  const result = await req.execute("dbo.UpsertStudent");

  return result.recordset?.[0];
},

async getStudentClassStrength(payload) {
        const {  ClassID, SectionID } = payload;

        const pool = await poolPromise;
        const request = pool.request();

        request.input("ClassID", sql.VarChar(50), ClassID || null)
        request.input("SectionID", sql.VarChar(50), SectionID || null)
        

        const result = await request.execute("GetStudentStrength");;

        return result.recordset;
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
