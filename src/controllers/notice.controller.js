import { NoticeModel } from "../models/notice.model.js";

export const NoticeController = {

  // GET all notices
  async getAll(req, res) {
    try {
      const notices = await NoticeModel.getAll();
      res.json({ success: true, data: notices });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  async getById(req, res) {
      try {
        const notice = await NoticeModel.getById(req.params.id);
        if (!notice) {
          return res.status(404).json({ success: false, message: "Notice not found" });
        }
        res.json({ success: true, data: notice });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    },

  // CREATE notice
  async create(req, res) {
    try {
      const { Classes, Description } = req.body;

      if (!Classes || !Description) {
        return res.status(400).json({
          success: false,
          message: "Classes and Description are required"
        });
      }

      const noticeId = await NoticeModel.create({ Classes, Description });

      res.status(201).json({
        success: true,
        message: "Notice created successfully",
        NoticeID: noticeId
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // DELETE notice
  async delete(req, res) {
    try {
      const deleted = await NoticeModel.deleteById(req.params.id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Notice not found"
        });
      }

      res.json({
        success: true,
        message: "Notice deleted successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};
