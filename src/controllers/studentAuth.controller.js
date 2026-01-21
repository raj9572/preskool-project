import { StudentModel } from "../models/student.model.js";

export const studentController = {

  
  async getAll(req, res) {
    try {
      const data = await StudentModel.getAll();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  
  async getById(req, res) {
    try {
      const data = await StudentModel.getById(req.params.id);
      if (!data) {
        return res.status(404).json({ success: false, message: "Student not found" });
      }
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

 
 async createOrUpdate(req, res) {
       try {
         await StudentModel.upsert(req.body);
         res.json({
           success: true,
           message: "Student saved/updated successfully"
         });
       } catch (error) {
         res.status(500).json({
           success: false,
           message: error.message
         });
       }
     },
 
  async delete(req, res) {
    try {
      const ok = await StudentModel.delete(req.params.id);

      if (!ok) {
        return res.status(404).json({ success: false, message: "Student not found" });
      }

      res.json({ success: true, message: "Student deleted successfully" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async deleteStudentComplete(req, res) {
    try {
      const data = await StudentModel.getById(req.params.id);
      if (!data) {
        return res.status(404).json({ success: false, message: "Student not found" });
      }

      const result = await StudentModel.deleteStudentComplete(data.StudentID);

      res.json({
        success: true,
        message: "Student deleted successfully",
        result
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message
      });
    }
  }
};
