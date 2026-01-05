import { poolPromise, sql } from "../config/db.js";

export const StudentAttendanceModel = {

  async getByClass(className) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("Class", sql.NVarChar, className)
      .query(`
DECLARE @colName sysname = CONVERT(varchar(10), CAST(GETDATE() AS date), 23);
DECLARE @hasCol bit = CASE WHEN COL_LENGTH('dbo.StudentAttendence', @colName) IS NULL THEN 0 ELSE 1 END;

DECLARE @sql nvarchar(max) =
N'SELECT StudentID, [Name], ' +
CASE WHEN @hasCol = 1
  THEN QUOTENAME(@colName) + ' AS Today '
  ELSE 'CAST(NULL AS CHAR(1)) AS Today '
END +
N'FROM dbo.StudentAttendence WHERE [Class] = @Class ORDER BY [Name];';

EXEC sp_executesql @sql, N'@Class nvarchar(50)', @Class=@Class;
`);
    return result.recordset;
  },

  async getByClassAndSection(className, section) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("Class", sql.NVarChar, className)
      .input("Section", sql.NVarChar, section)
      .query(`
DECLARE @colName sysname = CONVERT(varchar(10), CAST(GETDATE() AS date), 23);
DECLARE @hasCol bit = CASE WHEN COL_LENGTH('dbo.StudentAttendence', @colName) IS NULL THEN 0 ELSE 1 END;

DECLARE @sql nvarchar(max) =
N'SELECT StudentID, [Name], ' +
CASE WHEN @hasCol = 1
  THEN QUOTENAME(@colName) + ' AS Today '
  ELSE 'CAST(NULL AS CHAR(1)) AS Today '
END +
N'FROM dbo.StudentAttendence WHERE [Class]=@Class AND [Section]=@Section ORDER BY [Name];';

EXEC sp_executesql
@sql,
N'@Class nvarchar(50), @Section nvarchar(50)',
@Class=@Class, @Section=@Section;
`);
    return result.recordset;
  }
};
