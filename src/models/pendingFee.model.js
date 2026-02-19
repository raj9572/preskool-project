import { sql, poolPromise } from "../config/db.js";

export const PendingFeeModels = {
    async getPendingFees(payload) {
        const { StudentID, ClassID, SectionID } = payload;

        const pool = await poolPromise;
        const request = pool.request();

        request.input("StudentID", sql.Int, StudentID || null);
        request.input("ClassID", sql.VarChar(50), ClassID || null);
        request.input("SectionID", sql.VarChar(50), SectionID || null);

        const result = await request.execute("PendingFeeReport");

        return result.recordset;
    }
}

