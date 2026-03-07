import express from "express";
import { PaymentController } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/payments", PaymentController.createPayment);
router.get("/payments", PaymentController.getAllPayments);
router.get("/payments/:id", PaymentController.getPaymentById);
router.get("/payments/:personType/:personId", PaymentController.getPaymentsByPerson);
router.put("/payments/:id", PaymentController.updatePayment);
router.delete("/payments/:id", PaymentController.deletePayment);

export default router;