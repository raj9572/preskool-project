import { poolPromise, sql } from "../config/db.js";

export const FeeStructureModel = {

  // CREATE
  async create(data) {
    const pool = await poolPromise;
    await pool.request()
      .input("structure_id", sql.VarChar(10), data.structure_id)
      .input("class", sql.VarChar(20), data.class)
      .input("academic_year", sql.VarChar(9), data.academic_year)

      .input("admission_fee", sql.Decimal(10,2), data.admission_fee || 0)
      .input("annual_fee", sql.Decimal(10,2), data.annual_fee || 0)
      .input("exam_fee", sql.Decimal(10,2), data.exam_fee || 0)
      .input("library_fee", sql.Decimal(10,2), data.library_fee || 0)
      .input("computer_fee", sql.Decimal(10,2), data.computer_fee || 0)
      .input("sports_fee", sql.Decimal(10,2), data.sports_fee || 0)
      .input("lab_fee", sql.Decimal(10,2), data.lab_fee || 0)
      .input("misc_fee", sql.Decimal(10,2), data.misc_fee || 0)

      .input("apr_tuition_fee", sql.Decimal(10,2), data.apr_tuition_fee || 0)
      .input("may_tuition_fee", sql.Decimal(10,2), data.may_tuition_fee || 0)
      .input("jun_tuition_fee", sql.Decimal(10,2), data.jun_tuition_fee || 0)
      .input("jul_tuition_fee", sql.Decimal(10,2), data.jul_tuition_fee || 0)
      .input("aug_tuition_fee", sql.Decimal(10,2), data.aug_tuition_fee || 0)
      .input("sep_tuition_fee", sql.Decimal(10,2), data.sep_tuition_fee || 0)
      .input("oct_tuition_fee", sql.Decimal(10,2), data.oct_tuition_fee || 0)
      .input("nov_tuition_fee", sql.Decimal(10,2), data.nov_tuition_fee || 0)
      .input("dec_tuition_fee", sql.Decimal(10,2), data.dec_tuition_fee || 0)
      .input("jan_tuition_fee", sql.Decimal(10,2), data.jan_tuition_fee || 0)
      .input("feb_tuition_fee", sql.Decimal(10,2), data.feb_tuition_fee || 0)
      .input("mar_tuition_fee", sql.Decimal(10,2), data.mar_tuition_fee || 0)
      .query(`
        INSERT INTO dbo.fee_structure VALUES (
          @structure_id,@class,@academic_year,
          @admission_fee,@annual_fee,@exam_fee,@library_fee,@computer_fee,
          @sports_fee,@lab_fee,@misc_fee,
          @apr_tuition_fee,@may_tuition_fee,@jun_tuition_fee,@jul_tuition_fee,
          @aug_tuition_fee,@sep_tuition_fee,@oct_tuition_fee,@nov_tuition_fee,
          @dec_tuition_fee,@jan_tuition_fee,@feb_tuition_fee,@mar_tuition_fee
        )
      `);
  },

  // READ ALL
  async getAll() {
    const pool = await poolPromise;
    const res = await pool.request()
      .query(`SELECT * FROM dbo.fee_structure`);
    return res.recordset;
  },

  // READ BY CLASS + YEAR
  async getByClass(className, academicYear) {
    const pool = await poolPromise;
    const res = await pool.request()
      .input("class", sql.VarChar(20), className)
      .input("academic_year", sql.VarChar(9), academicYear)
      .query(`
        SELECT * FROM dbo.fee_structure
        WHERE class=@class AND academic_year=@academic_year
      `);
    return res.recordset[0];
  },

  // UPDATE
  async update(id, data) {
    const pool = await poolPromise;
    await pool.request()
      .input("structure_id", sql.VarChar(10), id)
      .input("class", sql.VarChar(20), data.class)
      .input("academic_year", sql.VarChar(9), data.academic_year)
      .input("admission_fee", sql.Decimal(10,2), data.admission_fee || 0)
      .input("annual_fee", sql.Decimal(10,2), data.annual_fee || 0)
      .query(`
        UPDATE dbo.fee_structure
        SET class=@class,
            academic_year=@academic_year,
            admission_fee=@admission_fee,
            annual_fee=@annual_fee
        WHERE structure_id=@structure_id
      `);
  },

  // DELETE
  async delete(id) {
    const pool = await poolPromise;
    await pool.request()
      .input("structure_id", sql.VarChar(10), id)
      .query(`DELETE FROM dbo.fee_structure WHERE structure_id=@structure_id`);
  }
};
