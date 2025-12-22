// import mongoose from "mongoose";

// export const connectDB = async () => {
  //   try {
    //      const connectionInstant = await mongoose.connect(`${process.env.MONGO_URI}`);
    //       console.log(`/n Mongodb connected !! DB HOST : ${connectionInstant.connection.host}`)
    //   } catch (error) {
      //     console.log('mongodb connection error',error)
      //         process.exit(1)
      //   }
      // };
      
      
import sql from "mssql/msnodesqlv8.js";

const config = {
  server: "RAJALI1432\\SQLEXPRESS",
  database: "erpdb", // replace
  driver: "ODBC Driver 18 for SQL Server",
  options: {
    trustedConnection: true,
    encrypt: false,
    trustServerCertificate: true
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("✅ MSSQL Connected");
    return pool;
  })
  .catch(err => {
    console.error("❌ DB Connection Failed:", err);
  });

export { sql, poolPromise };

