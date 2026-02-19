import express from "express";
import { StaffSalaryController } from "../controllers/staffSalary.controller.js";

const router = express.Router();

router.post("/staff-salary", StaffSalaryController.create);
router.post("/staff-salary/bulk-mark-paid", StaffSalaryController.bulkMarkPaid);
router.get("/staff-salary", StaffSalaryController.getAll);
router.get("/staff-salary/:id", StaffSalaryController.getById);
router.put("/staff-salary/:id", StaffSalaryController.update);
router.delete("/staff-salary/:id", StaffSalaryController.delete);
// router.get("/staff-salary/staff/:staffId", StaffSalaryController.getByStaff);

export default router;
