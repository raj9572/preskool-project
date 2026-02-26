import { AttendanceWriterModel } from "../models/attendanceWriter.model.js";
import { StudentModel } from "../models/student.model.js";

import { sendEmail } from "../utils/sendEmail.js";


export const AttendanceWriterController = {

  async setToday(req, res) {
    if (!req.body?.length)
      return res.status(400).send("Send at least one { studentID, status } item.");

  //   for (const item of req.body) {
  //      if (item.status === "A") {

  //   const student = await StudentModel.getById(item.studentID); 
    
  //   // await sendAbsentMail({
  //   //   studentName: student.FullName,
  //   //   parentEmail: student.ParentEmail,
  //   //   date: new Date().toLocaleDateString()
  //   // });

  //   // await sendEmail(
  //   //   student.FullName,
  //   //   student.ParentEmail,
  //   //   `Attendance Alert - ${student.FullName}`,
  //   //   `
  //   //   <h2>Dear Parent,</h2>
  //   //   <p>Your child <b>${student.FullName}</b> was absent today.</p>
  //   //   <p>Please contact school if needed.</p>
  //   //   `
  //   // );
  // }
  //   }

    const today = new Date().toISOString().slice(0, 10);
    const result = await AttendanceWriterModel.setForDate(today, req.body);

    res.json({
      date: today,
      updatedCount: result.UpdatedCount,
      missingIds: result.MissingIDs
        ? result.MissingIDs.split(",").map(Number)
        : []
    });
  },

  async setForDate(req, res) {
    const date = req.params.date;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
      return res.status(400).send("Invalid date format");

    const result = await AttendanceWriterModel.setForDate(date, req.body);

    res.json({
      date,
      updatedCount: result.UpdatedCount,
      missingIds: result.MissingIDs
        ? result.MissingIDs.split(",").map(Number)
        : []
    });
  },


  async  sendAbsentEmail(req, res) {

   const result = await AttendanceWriterModel.sendTodayAbsentEmails();

    if (!result.success) {
      return res.status(500).json(result);
    }

    res.json(result);
    
    },

  
};
