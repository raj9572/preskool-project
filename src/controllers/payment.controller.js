import {PaymentModel} from "../models/payment.model.js";

export const PaymentController = {
    
  async createPayment (req, res) {
  try {
    const result = await PaymentModel.create(req.body);

    res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
},

  async getPaymentById (req, res)  {
  try {

    const paymentId = req.params.id;

    const payment = await PaymentModel.getById(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found"
      });
    }

    res.json({
      success: true,
      data: payment
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
},

 async getAllPayments  (req, res){
  try {
    const result = await PaymentModel.getAll();

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
},

  async getPaymentsByPerson (req, res)  {
  try {
    const { personType, personId } = req.params;

    const result = await PaymentModel.getByPerson(personType, personId);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
},

  async updatePayment (req, res)  {
  try {
    const result = await PaymentModel.update(req.params.id, req.body);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
},

  async deletePayment (req, res)  {
  try {
    const result = await PaymentModel.deletePayment(req.params.id);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
}