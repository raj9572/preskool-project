// import { poolPromise, sql } from "../config/db.js";

// export const StudentModel = {

//   async findByEmail(email) {
//     const pool = await poolPromise;
//     const result = await pool.request()
//       .input("EmailAddress", sql.VarChar, email)
//       .query(`
//         SELECT * FROM Students
//         WHERE EmailAddress = @EmailAddress
//       `);
//     return result.recordset[0];
//   },

//   async create(student) {
//     const pool = await poolPromise;
//     await pool.request()
//       .input("FullName", sql.NVarChar, student.FullName)
//       .input("DOB", sql.Date, student.DOB)
//       .input("Gender", sql.NVarChar, student.Gender)
//       .input("ClassID", sql.VarChar, student.ClassID)
//       .input("SectionID", sql.VarChar, student.SectionID)
//       .input("Address", sql.VarChar, student.Address)
//       .input("ContactNumber", sql.VarChar, student.ContactNumber)
//       .input("EmailAddress", sql.VarChar, student.EmailAddress)
//       .input("Password", sql.VarChar, student.Password)
//       .input("Nationality", sql.VarChar, student.Nationality)
//       .input("IdentificationNumber", sql.VarChar, student.IdentificationNumber)
//       .input("EnrollmentNumber", sql.VarChar, student.EnrollmentNumber)
//       .input("AddmissionDate", sql.Date, student.AddmissionDate)
//       .input("ProgramName", sql.NVarChar, student.ProgramName)
//       .input("YearOrSamester", sql.VarChar, student.YearOrSamester)
//       .input("PreviousAcedemicRecord", sql.NVarChar, student.PreviousAcedemicRecord)
//       .input("GPAOrMarks", sql.VarChar, student.GPAOrMarks)
//       .input("AttendancePercentage", sql.Decimal, student.AttendancePercentage)
//       .input("SubjectsTaken", sql.NVarChar, student.SubjectsTaken)
//       .input("AcademicStatus", sql.VarChar, student.AcademicStatus)
//       .input("GuardianName", sql.NVarChar, student.GuardianName)
//       .input("GuardianRelation", sql.VarChar, student.GuardianRelation)
//       .input("GuardianContact", sql.VarChar, student.GuardianContact)
//       .input("GuardianOccupation", sql.VarChar, student.GuardianOccupation)
//       .input("GuardianAddress", sql.NVarChar, student.GuardianAddress)
//       .query(`
//         INSERT INTO Students
//         (FullName, EmailAddress, Password, DOB, Gender, ClassID, SectionID, Address, ContactNumber, Nationality, IdentificationNumber, EnrollmentNumber, AddmissionDate, ProgramName, YearOrSamester, PreviousAcedemicRecord, GPAOrMarks, AttendancePercentage, SubjectsTaken, AcademicStatus, GuardianName, GuardianRelation, GuardianContact, GuardianOccupation, GuardianAddress)
//         VALUES
//         (@FullName, @EmailAddress, @Password, @DOB, @Gender, @ClassID, @SectionID, @Address, @ContactNumber, @Nationality, @IdentificationNumber, @EnrollmentNumber, @AddmissionDate, @ProgramName, @YearOrSamester, @PreviousAcedemicRecord, @GPAOrMarks, @AttendancePercentage, @SubjectsTaken, @AcademicStatus, @GuardianName, @GuardianRelation, @GuardianContact, @GuardianOccupation, @GuardianAddress)
//       `);
//   }

// };


import { poolPromise, sql } from "../config/db.js";

export const StudentModel = {

  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query(`SELECT * FROM Students`);
    return result.recordset;
  },

  async findById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("StudentID", sql.Int, id)
      .query(`SELECT * FROM Students WHERE StudentID = @StudentID`);
    return result.recordset[0];
  },

  async create(student) {
    const pool = await poolPromise;
    await pool.request()
      .input("FullName", sql.NVarChar, student.FullName)
      .input("EmailAddress", sql.VarChar, student.EmailAddress)
      .input("DOB", sql.Date, student.DOB)
      .input("Gender", sql.NVarChar, student.Gender)
      .input("ClassID", sql.VarChar, student.ClassID)
      .input("SectionID", sql.VarChar, student.SectionID)
      .input("Address", sql.VarChar, student.Address)
      .input("ContactNumber", sql.VarChar, student.ContactNumber)
      .input("Nationality", sql.VarChar, student.Nationality)
      .input("IdentificationNumber", sql.VarChar, student.IdentificationNumber)
      .input("EnrollmentNumber", sql.VarChar, student.EnrollmentNumber)
      .input("AdmissionDate", sql.Date, student.AdmissionDate)
      .input("ProgramName", sql.NVarChar, student.ProgramName)
      .input("YearOrSemester", sql.VarChar, student.YearOrSemester)
      .input("PreviousAcademicRecord", sql.NVarChar, student.PreviousAcademicRecord)
      .input("GPAOrMarks", sql.VarChar, student.GPAOrMarks)
      .input("AttendancePercentage", sql.Decimal, student.AttendancePercentage)
      .input("SubjectsTaken", sql.NVarChar, student.SubjectsTaken)
      .input("AcademicStatus", sql.VarChar, student.AcademicStatus)
      .input("GuardianName", sql.NVarChar, student.GuardianName)
      .input("GuardianRelation", sql.VarChar, student.GuardianRelation)
      .input("GuardianContact", sql.VarChar, student.GuardianContact)
      .input("GuardianOccupation", sql.VarChar, student.GuardianOccupation)
      .input("GuardianAddress", sql.NVarChar, student.GuardianAddress)
      .query(`
        INSERT INTO Students (
          FullName, EmailAddress, DOB, Gender, ClassID, SectionID,
          Address, ContactNumber, Nationality, IdentificationNumber,
          EnrollmentNumber, AdmissionDate, ProgramName, YearOrSemester,
          PreviousAcademicRecord, GPAOrMarks, AttendancePercentage,
          SubjectsTaken, AcademicStatus, GuardianName, GuardianRelation,
          GuardianContact, GuardianOccupation, GuardianAddress
        )
        VALUES (
          @FullName, @EmailAddress, @DOB, @Gender, @ClassID,
          @SectionID, @Address, @ContactNumber, @Nationality,
          @IdentificationNumber, @EnrollmentNumber, @AdmissionDate,
          @ProgramName, @YearOrSemester, @PreviousAcademicRecord,
          @GPAOrMarks, @AttendancePercentage, @SubjectsTaken,
          @AcademicStatus, @GuardianName, @GuardianRelation,
          @GuardianContact, @GuardianOccupation, @GuardianAddress
        )
      `);
  },

  async updateById(id, student) {
  const pool = await poolPromise;
  const request = pool.request();

  request.input("StudentID", sql.Int, id);

  const fields = [];

  const addField = (key, type) => {
    if (student[key] !== undefined) {
      fields.push(`${key} = @${key}`);
      request.input(key, type, student[key]);
    }
  };

  addField("FullName", sql.NVarChar);
  addField("EmailAddress", sql.VarChar);
  addField("DOB", sql.Date);
  addField("Gender", sql.NVarChar);
  addField("ClassID", sql.VarChar);
  addField("SectionID", sql.VarChar);
  addField("Address", sql.VarChar);
  addField("ContactNumber", sql.VarChar);
  addField("Nationality", sql.VarChar);
  addField("IdentificationNumber", sql.VarChar);
  addField("EnrollmentNumber", sql.VarChar);
  addField("AdmissionDate", sql.Date);
  addField("ProgramName", sql.NVarChar);
  addField("YearOrSemester", sql.VarChar);
  addField("PreviousAcademicRecord", sql.NVarChar);
  addField("GPAOrMarks", sql.VarChar);
  addField("AttendancePercentage", sql.Decimal(5, 2));
  addField("SubjectsTaken", sql.NVarChar);
  addField("AcademicStatus", sql.VarChar);
  addField("GuardianName", sql.NVarChar);
  addField("GuardianRelation", sql.VarChar);
  addField("GuardianContact", sql.VarChar);
  addField("GuardianOccupation", sql.VarChar);
  addField("GuardianAddress", sql.NVarChar);

  if (!fields.length) {
    throw new Error("No fields provided to update");
  }

  const query = `
    UPDATE Students
    SET ${fields.join(", ")}
    WHERE StudentID = @StudentID
  `;

  await request.query(query);
}
,



  async deleteById(id) {
    const pool = await poolPromise;
    await pool.request()
      .input("StudentID", sql.Int, id)
      .query(`DELETE FROM Students WHERE StudentID = @StudentID`);
  }

};
