import { StudentModel } from "../models/student.model.js";

export const StudentController = {

  // GET ALL STUDENTS
  async getAll(req, res) {
    try {
      const students = await StudentModel.getAll();
      res.json({ success: true, data: students });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // GET STUDENT BY ID
  async getById(req, res) {
    try {
      const student = await StudentModel.findById(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json({ success: true, data: student });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // CREATE OR UPDATE (SAME ENDPOINT)
  async createAndUpdateStudent(req, res) {
    try {
      const {studentID} = req.body;

      

      if (studentID) {
        const student = await StudentModel.findById(studentID);
        if (!student) {
          return res.status(404).json({ success: false, message: "Student not found" });
        }
        await StudentModel.updateById(studentID, req.body);
        return res.json({ success: true, message: "Student updated successfully" });
      }

      await StudentModel.create(req.body);
      res.status(201).json({ success: true, message: "Student created successfully" });

    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // DELETE STUDENT
  async delete(req, res) {
    try {
      await StudentModel.deleteById(req.params.id);
      res.json({ success: true, message: "Student deleted successfully" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

};
