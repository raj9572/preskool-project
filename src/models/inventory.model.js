import { poolPromise, sql } from "../config/db.js";

export const InventoryModel = {

  async create(data) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("ItemName", sql.NVarChar(200), data.itemName)
      .input("Category", sql.NVarChar(100), data.category)
      .input("Quantity", sql.Int, data.quantity || 1)
      .input("VendorName", sql.NVarChar(200), data.vendorName || null)
      .input("PurchaseDate", sql.Date, data.purchaseDate || null)
      .input("PurchasePrice", sql.Decimal(12,2), data.purchasePrice || null)
      .input("Location", sql.NVarChar(200), data.location || null)
      .input("Condition", sql.NVarChar(50), data.condition || null)
      .input("LastMaintenanceDate", sql.Date, data.lastMaintenanceDate || null)
      .input("Status", sql.NVarChar(50), data.status || "Active")
      .query(`
        INSERT INTO dbo.Inventory
        (ItemName, Category, Quantity, VendorName, PurchaseDate,
         PurchasePrice, Location, [Condition], LastMaintenanceDate, Status)
        VALUES
        (@ItemName, @Category, @Quantity, @VendorName, @PurchaseDate,
         @PurchasePrice, @Location, @Condition, @LastMaintenanceDate, @Status);

        SELECT SCOPE_IDENTITY() AS InventoryId;
      `);

    return result.recordset[0];
  },

  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`SELECT * FROM dbo.Inventory ORDER BY CreatedAt DESC`);
    return result.recordset;
  },

  async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("InventoryId", sql.Int, id)
      .query(`SELECT * FROM dbo.Inventory WHERE InventoryId = @InventoryId`);
    return result.recordset[0];
  },

  async update(id, data) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("InventoryId", sql.Int, id)
      .input("ItemName", sql.NVarChar(200), data.itemName || null)
      .input("Category", sql.NVarChar(100), data.category || null)
      .input("Quantity", sql.Int, data.quantity || null)
      .input("VendorName", sql.NVarChar(200), data.vendorName || null)
      .input("PurchaseDate", sql.Date, data.purchaseDate || null)
      .input("PurchasePrice", sql.Decimal(12,2), data.purchasePrice || null)
      .input("Location", sql.NVarChar(200), data.location || null)
      .input("Condition", sql.NVarChar(50), data.condition || null)
      .input("LastMaintenanceDate", sql.Date, data.lastMaintenanceDate || null)
      .input("Status", sql.NVarChar(50), data.status || null)
      .query(`
        UPDATE dbo.Inventory
        SET
          ItemName = COALESCE(@ItemName, ItemName),
          Category = COALESCE(@Category, Category),
          Quantity = COALESCE(@Quantity, Quantity),
          VendorName = COALESCE(@VendorName, VendorName),
          PurchaseDate = COALESCE(@PurchaseDate, PurchaseDate),
          PurchasePrice = COALESCE(@PurchasePrice, PurchasePrice),
          Location = COALESCE(@Location, Location),
          [Condition] = COALESCE(@Condition, [Condition]),
          LastMaintenanceDate = COALESCE(@LastMaintenanceDate, LastMaintenanceDate),
          Status = COALESCE(@Status, Status)
        WHERE InventoryId = @InventoryId;

        SELECT @@ROWCOUNT AS affectedRows;
      `);

    return result.recordset[0];
  },

  async delete(id) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("InventoryId", sql.Int, id)
      .query(`
        DELETE FROM dbo.Inventory WHERE InventoryId = @InventoryId;
        SELECT @@ROWCOUNT AS affectedRows;
      `);

    return result.recordset[0];
  }

};
