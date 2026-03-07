import BudgetModel from "../models/budget.model.js";

export const getClasswiseBudget = async (req, res) => {
  try {

    const data = await BudgetModel.getClasswiseBudget();

    res.json({
      success: true,
      data: data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};