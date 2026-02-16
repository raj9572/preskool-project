import { poolPromise, sql } from "../config/db.js";

export const BookModel = {

  async create(data) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("ISBN", sql.NVarChar(50), data.isbn)
      .input("BookTitle", sql.NVarChar(200), data.bookTitle)
      .input("AuthorName", sql.NVarChar(200), data.authorName)
      .input("PublisherName", sql.NVarChar(200), data.publisherName || null)
      .input("Category", sql.NVarChar(100), data.category || null)
      .input("Language", sql.NVarChar(100), data.language || null)
      .input("Edition", sql.NVarChar(50), data.edition || null)
      .input("PublishYear", sql.Int, data.publishYear || null)
      .input("TotalCopies", sql.Int, data.totalCopies)
      .input("AvailableCopies", sql.Int, data.availableCopies)
      .input("IssuedCopies", sql.Int, data.issuedCopies || 0)
      .input("RackLocation", sql.NVarChar(100), data.rackLocation || null)
      .input("PurchaseDate", sql.Date, data.purchaseDate || null)
      .input("PurchasePrice", sql.Decimal(12,2), data.purchasePrice || null)
      .input("VendorName", sql.NVarChar(200), data.vendorName || null)
      .input("Status", sql.NVarChar(50), data.status || "Available")
      .query(`
        INSERT INTO dbo.Books
        (ISBN, BookTitle, AuthorName, PublisherName, Category, Language,
         Edition, PublishYear, TotalCopies, AvailableCopies, IssuedCopies,
         RackLocation, PurchaseDate, PurchasePrice, VendorName, Status)
        VALUES
        (@ISBN, @BookTitle, @AuthorName, @PublisherName, @Category, @Language,
         @Edition, @PublishYear, @TotalCopies, @AvailableCopies, @IssuedCopies,
         @RackLocation, @PurchaseDate, @PurchasePrice, @VendorName, @Status);

        SELECT SCOPE_IDENTITY() AS BookId;
      `);

    return result.recordset[0];
  },

  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`SELECT * FROM dbo.Books ORDER BY CreatedAt DESC`);
    return result.recordset;
  },

  async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("BookId", sql.Int, id)
      .query(`SELECT * FROM dbo.Books WHERE BookId = @BookId`);
    return result.recordset[0];
  },

  async update(id, data) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("BookId", sql.Int, id)
      .input("ISBN", sql.NVarChar(50), data.isbn || null)
      .input("BookTitle", sql.NVarChar(200), data.bookTitle || null)
      .input("AuthorName", sql.NVarChar(200), data.authorName || null)
      .input("PublisherName", sql.NVarChar(200), data.publisherName || null)
      .input("Category", sql.NVarChar(100), data.category || null)
      .input("Language", sql.NVarChar(100), data.language || null)
      .input("Edition", sql.NVarChar(50), data.edition || null)
      .input("PublishYear", sql.Int, data.publishYear || null)
      .input("TotalCopies", sql.Int, data.totalCopies || null)
      .input("AvailableCopies", sql.Int, data.availableCopies || null)
      .input("IssuedCopies", sql.Int, data.issuedCopies || null)
      .input("RackLocation", sql.NVarChar(100), data.rackLocation || null)
      .input("PurchaseDate", sql.Date, data.purchaseDate || null)
      .input("PurchasePrice", sql.Decimal(12,2), data.purchasePrice || null)
      .input("VendorName", sql.NVarChar(200), data.vendorName || null)
      .input("Status", sql.NVarChar(50), data.status || null)
      .query(`
        UPDATE dbo.Books
        SET
          ISBN = COALESCE(@ISBN, ISBN),
          BookTitle = COALESCE(@BookTitle, BookTitle),
          AuthorName = COALESCE(@AuthorName, AuthorName),
          PublisherName = COALESCE(@PublisherName, PublisherName),
          Category = COALESCE(@Category, Category),
          Language = COALESCE(@Language, Language),
          Edition = COALESCE(@Edition, Edition),
          PublishYear = COALESCE(@PublishYear, PublishYear),
          TotalCopies = COALESCE(@TotalCopies, TotalCopies),
          AvailableCopies = COALESCE(@AvailableCopies, AvailableCopies),
          IssuedCopies = COALESCE(@IssuedCopies, IssuedCopies),
          RackLocation = COALESCE(@RackLocation, RackLocation),
          PurchaseDate = COALESCE(@PurchaseDate, PurchaseDate),
          PurchasePrice = COALESCE(@PurchasePrice, PurchasePrice),
          VendorName = COALESCE(@VendorName, VendorName),
          Status = COALESCE(@Status, Status),
          UpdatedAt = GETDATE()
        WHERE BookId = @BookId;

        SELECT @@ROWCOUNT AS affectedRows;
      `);

    return result.recordset[0];
  },

  async delete(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("BookId", sql.Int, id)
      .query(`
        DELETE FROM dbo.Books WHERE BookId = @BookId;
        SELECT @@ROWCOUNT AS affectedRows;
      `);

    return result.recordset[0];
  }

};
