import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import studentRoutes from "./routes/studentAuth.routes.js";
import staffRoutes from "./routes/staff.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import userAuthRoutes from "./routes/userAuth.routes.js";
import noticeRoutes from "./routes/notice.routes.js";
import eventRoutes from "./routes/event.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import swaggerUi from "swagger-ui-express"
import { readFileSync } from "fs";
// import swaggerDocument  from "./swagger-output.json" assert { type: 'json' };
// import { connectDB } from "./config/db.js";
import { poolPromise } from "./config/db.js";
import { swaggerDocs } from "./swagger.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());



app.use("/api/student", studentRoutes);
app.use("/api/user", userAuthRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api", noticeRoutes);
app.use("/api", eventRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api", attendanceRoutes);




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


// Swagger
swaggerDocs(app);

// const swaggerDocument = JSON.parse(
//   readFileSync(new URL("./swagger-output.json", import.meta.url), "utf-8")
// );

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


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