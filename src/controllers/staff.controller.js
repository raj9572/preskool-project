import { StaffModel } from "../models/staff.model.js";

export const StaffController = {

  async getAll(req, res) {
    try {
      const data = await StaffModel.getAll();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await StaffModel.getById(req.params.id);
      if (!data) return res.status(404).json({ success: false, message: "Staff not found" });
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async createOrUpdate(req, res) {
    try {
      await StaffModel.upsert(req.body);
      res.json({
        success: true,
        message: "staff saved/updated successfully"
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
      const ok = await StaffModel.delete(req.params.id);
      if (!ok) return res.status(404).json({ success: false, message: "Staff not found" });

      res.json({ success: true, message: "Staff deleted successfully" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};






// async createOrUpdate(req, res) {
//     try {
//       await StaffModel.upsert(req.body);
//       res.json({
//         success: true,
//         message: "staff saved/updated successfully"
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error.message
//       });
//     }
//   },





  // async create(req, res) {
  //   try {
  //     const dto = req.body;

  //     if (!dto.fullName) {
  //       return res.status(400).json({ success: false, message: "fullName is required" });
  //     }

  //     const result = await StaffModel.upsert(dto);

  //     res.status(201).json({
  //       success: true,
  //       message: "Staff saved successfully",
  //       result
  //     });
  //   } catch (err) {
  //     res.status(500).json({ success: false, message: err.message });
  //   }
  // },

  // async update(req, res) {
  //   try {
  //     const dto = req.body;
  //     dto.staffId = parseInt(req.params.id);

  //     const result = await StaffModel.upsert(dto);

  //     res.json({
  //       success: true,
  //       message: "Staff updated successfully",
  //       result
  //     });
  //   } catch (err) {
  //     res.status(500).json({ success: false, message: err.message });
  //   }
  // },
