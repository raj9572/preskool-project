import express from "express";
import { RevenueController } from "../controllers/revenue.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { poolPromise, sql } from "../config/db.js";

const router = express.Router();

router.use(protect);

router.get("/revenue/session-revenue", RevenueController.getRevenueSummary);

router.get("/revenue/daily-collection", async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;

    const pool = await poolPromise;

    const result = await pool.request()
  .input("FromDate", sql.Date, fromDate)
  .input("ToDate", sql.Date, toDate)
  .query(`
    WITH FeeData AS (
        SELECT 
            CAST(CreatedAt AS DATE) AS CollectionDate,
            SUM(PaidAmount) AS FeeCollection
        FROM fee_submission
        WHERE PaymentStatus = 'SUCCESS'
        AND CreatedAt >= @FromDate
        AND CreatedAt < DATEADD(DAY,1,@ToDate)
        GROUP BY CAST(CreatedAt AS DATE)
    ),
    FineData AS (
        SELECT 
            CAST(CreatedAt AS DATE) AS CollectionDate,
            SUM(Fine) AS FineCollection
        FROM Fines
        WHERE Status = 'Paid'
        AND CreatedAt >= @FromDate
        AND CreatedAt < DATEADD(DAY,1,@ToDate)
        GROUP BY CAST(CreatedAt AS DATE)
    )

    SELECT 
        COALESCE(f.CollectionDate, fi.CollectionDate) AS Date,
        ISNULL(f.FeeCollection,0) AS FeeCollection,
        ISNULL(fi.FineCollection,0) AS FineCollection,
        ISNULL(f.FeeCollection,0) + ISNULL(fi.FineCollection,0) AS TotalCollection
    FROM FeeData f
    FULL OUTER JOIN FineData fi
    ON f.CollectionDate = fi.CollectionDate
    ORDER BY Date
  `);

    res.json({
      success: true,
      data: result.recordset
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
