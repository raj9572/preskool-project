import { poolPromise, sql } from "../config/db.js";

export const EventModel = {

  // CREATE event
  async create(event) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("EventName", sql.NVarChar, event.EventName)
      .input("StartDate", sql.DateTime, event.StartDate)
      .input("EndDate", sql.DateTime, event.EndDate)
      .input("Description", sql.NVarChar, event.Description || null)
      .query(`
        INSERT INTO dbo.Events (EventName, StartDate, EndDate, [Description])
        VALUES (@EventName, @StartDate, @EndDate, @Description);
        SELECT CAST(SCOPE_IDENTITY() AS INT) AS EventID;
      `);

    return result.recordset[0].EventID;
  },

  // GET all events
  async getAll() {
    const pool = await poolPromise;

    const result = await pool.request().query(`
      SELECT EventID, EventName, StartDate, EndDate, PublishedDate, [Description]
      FROM dbo.Events
      ORDER BY StartDate ASC, EventID ASC
    `);

    return result.recordset;
  },

  // GET event by ID
  async getById(id) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("EventID", sql.Int, id)
      .query(`
        SELECT EventID, EventName, StartDate, EndDate, PublishedDate, [Description]
        FROM dbo.Events
        WHERE EventID = @EventID
      `);

    return result.recordset[0] || null;
  },

  // DELETE event
  async deleteById(id) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("EventID", sql.Int, id)
      .query(`DELETE FROM dbo.Events WHERE EventID = @EventID`);

    return result.rowsAffected[0] > 0;
  }
};
