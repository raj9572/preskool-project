import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import swaggerUi from "swagger-ui-express"
import { readFileSync } from "fs";
// import swaggerDocument  from "./swagger-output.json" assert { type: 'json' };
// import { connectDB } from "./config/db.js";
import { poolPromise } from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


// app.use("/api/auth", authRouter);
app.get("/test-db", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT GETDATE() AS time");
    res.json({
      success: true,
      serverTime: result.recordset[0].time
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const swaggerDocument = JSON.parse(
  readFileSync(new URL("./swagger-output.json", import.meta.url), "utf-8")
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// connectDB()
// .then(()=>{
//     app.on("error",(error)=>{
//         console.log("server Error",error)
        
//     })
//     app.listen(process.env.PORT || 3000,()=>{
//         console.log(`server is listning on port ${process.env.PORT}`)
//     })
// })
// .catch((err)=>{
//     console.log('MONGODB Connection FAILED:',err)
// })

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});