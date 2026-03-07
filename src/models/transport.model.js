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
    .input("TransportID", sql.VarChar(50), data.transportId)
    .input("TransportNumber", sql.NVarChar(100), data.transportNumber)
    .input("TransportType", sql.NVarChar(100), data.transportType || null)
    .input("TransporterName", sql.NVarChar(200), data.transporterName || null)
    .input("OwnerName", sql.NVarChar(200), data.ownerName || null)
    .input("JoiningDate", sql.Date, data.joiningDate || null)
    .input("GPSNumber", sql.NVarChar(100), data.gpsNumber || null)
    .input("Route", sql.NVarChar(200), data.route || null)
    .input("RouteName", sql.NVarChar(200), data.routeName || null)
    .input("Price", sql.Decimal(10,2), data.price || null)
    .input("Description", sql.NVarChar(500), data.description || null)
    .input("Status", sql.NVarChar(50), data.status || "Active")
    .query(`
      INSERT INTO dbo.Transport
      (
      TransportID,
        TransportNumber,
        TransportType,
        TransporterName,
        OwnerName,
        JoiningDate,
        GPSNumber,
        Route,
        RouteName,
        Price,
        Description,
        Status
      )
      VALUES
      (
        @TransportID,
        @TransportNumber,
        @TransportType,
        @TransporterName,
        @OwnerName,
        @JoiningDate,
        @GPSNumber,
        @Route,
        @RouteName,
        @Price,
        @Description,
        @Status
      );

      SELECT SCOPE_IDENTITY() AS TransportID;
    `);

  return result.recordset[0];
},

// .input("TransportID", sql.VarChar(50), id)
 async update(id, data) {
  const pool = await poolPromise;

  const result = await pool.request()
    .input("TransportID", sql.VarChar(50), id)
    .input("TransportNumber", sql.NVarChar(100), data.transportNumber || null)
    .input("TransportType", sql.NVarChar(100), data.transportType || null)
    .input("TransporterName", sql.NVarChar(200), data.transporterName || null)
    .input("OwnerName", sql.NVarChar(200), data.ownerName || null)
    .input("JoiningDate", sql.Date, data.joiningDate || null)
    .input("GPSNumber", sql.NVarChar(100), data.gpsNumber || null)
    .input("Route", sql.NVarChar(200), data.route || null)
    .input("RouteName", sql.NVarChar(200), data.routeName || null)
    .input("Price", sql.Decimal(10,2), data.price || null)
    .input("Description", sql.NVarChar(500), data.description || null)
    .input("Status", sql.NVarChar(50), data.status || null)
    .query(`
      UPDATE dbo.Transport
      SET
        TransportNumber = COALESCE(@TransportNumber, TransportNumber),
        TransportType = COALESCE(@TransportType, TransportType),
        TransporterName = COALESCE(@TransporterName, TransporterName),
        OwnerName = COALESCE(@OwnerName, OwnerName),
        JoiningDate = COALESCE(@JoiningDate, JoiningDate),
        GPSNumber = COALESCE(@GPSNumber, GPSNumber),
        Route = COALESCE(@Route, Route),
        RouteName = COALESCE(@RouteName, RouteName),
        Price = COALESCE(@Price, Price),
        Description = COALESCE(@Description, Description),
        Status = COALESCE(@Status, Status)
      WHERE TransportID = @TransportID;

      SELECT @@ROWCOUNT AS affectedRows;
    `);

  return result.recordset[0];
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
