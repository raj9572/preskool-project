import { StaffSalaryModel } from "../models/staffSalary.model.js";

export const StaffSalaryController = {

  async create(req, res) {
    try {
      const data = req.body;

			if (!Array.isArray(data) || data.length === 0) {
				return res.status(400).json({
					success: false,
					message: "Request body must be a non-empty array",
				});
			}
      const results = await Promise.all(data.map((item) => StaffSalaryModel.create(item)));
      res.json({ success: true, data: results });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async getAll(req, res) {
    const data = await StaffSalaryModel.getAll();
    res.json({ success: true, data });
  },

  async getById(req, res) {
    const data = await StaffSalaryModel.getById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data });
  },

  async getByStaff(req, res) {
    const data = await StaffSalaryModel.getByStaffId(req.params.staffId);
    res.json({ success: true, data });
  },

  async update(req, res) {
    const data = await StaffSalaryModel.update(req.params.id, req.body);
    res.json({ success: true, data });
  },

  async delete(req, res) {
    await StaffSalaryModel.delete(req.params.id);
    res.json({ success: true, message: "Salary deleted" });
  },
  async bulkMarkPaid(req, res) {
  try {
    const { staffIds } = req.body;

    if (!Array.isArray(staffIds) || staffIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "staffIds array required"
      });
    }

    const result = await StaffSalaryModel.bulkMarkPaidByStaffIds(staffIds);

    res.json({
      success: true,
      affectedRows: result.AffectedRows
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

};
