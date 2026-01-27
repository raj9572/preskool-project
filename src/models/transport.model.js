import { poolPromise, sql } from "../config/db.js";

export const TransportModel = {

  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT * FROM dbo.Transport ORDER BY TransportID DESC
    `);
    return result.recordset;
  },

  async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("TransportID", sql.Int, id)
      .query(`
        SELECT * FROM dbo.Transport WHERE TransportID = @TransportID
      `);
    return result.recordset[0];
  },

  async create(data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("TransportNumber", sql.NVarChar, data.transportNumber)
      .input("TransportType", sql.NVarChar, data.transportType)
      .input("TransporterName", sql.NVarChar, data.transporterName)
      .input("OwnerName", sql.NVarChar, data.ownerName)
      .input("JoiningDate", sql.Date, data.joiningDate)
      .input("GPSNumber", sql.NVarChar, data.gpsNumber)
      .input("Route", sql.NVarChar, data.route)
      .input("Description", sql.NVarChar, data.description)
      .input("Status", sql.NVarChar, data.status || "Active")
      .query(`
        INSERT INTO dbo.Transport
        (TransportNumber, TransportType, TransporterName, OwnerName,
         JoiningDate, GPSNumber, Route, Description, Status)
        VALUES
        (@TransportNumber, @TransportType, @TransporterName, @OwnerName,
         @JoiningDate, @GPSNumber, @Route, @Description, @Status);

        SELECT SCOPE_IDENTITY() AS TransportID;
      `);

    return result.recordset[0];
  },

  async update(id, data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("TransportID", sql.Int, id)
      .input("TransportNumber", sql.NVarChar, data.transportNumber)
      .input("TransportType", sql.NVarChar, data.transportType)
      .input("TransporterName", sql.NVarChar, data.transporterName)
      .input("OwnerName", sql.NVarChar, data.ownerName)
      .input("JoiningDate", sql.Date, data.joiningDate)
      .input("GPSNumber", sql.NVarChar, data.gpsNumber)
      .input("Route", sql.NVarChar, data.route)
      .input("Description", sql.NVarChar, data.description)
      .input("Status", sql.NVarChar, data.status)
      .query(`
        UPDATE dbo.Transport
        SET
          TransportNumber = COALESCE(@TransportNumber, TransportNumber),
          TransportType   = COALESCE(@TransportType, TransportType),
          TransporterName = COALESCE(@TransporterName, TransporterName),
          OwnerName       = COALESCE(@OwnerName, OwnerName),
          JoiningDate     = COALESCE(@JoiningDate, JoiningDate),
          GPSNumber       = COALESCE(@GPSNumber, GPSNumber),
          Route           = COALESCE(@Route, Route),
          Description     = COALESCE(@Description, Description),
          Status          = COALESCE(@Status, Status)
        WHERE TransportID = @TransportID;

        SELECT @@ROWCOUNT AS affected;
      `);

    return result.recordset[0].affected > 0;
  },

  async delete(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("TransportID", sql.Int, id)
      .query(`
        DELETE FROM dbo.Transport WHERE TransportID = @TransportID
      `);
    return result.rowsAffected[0] > 0;
  }
};
