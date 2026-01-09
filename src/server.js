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
import teacherAttendanceRoutes from "./routes/teacherAttendance.routes.js";
import staffAttendanceRoutes from "./routes/staffAttendance.routes.js";
import feeInventoryRoutes from "./routes/feeInventory.routes.js";
import discountRoutes from "./routes/discount.routes.js";
import feeStructureRoutes from "./routes/feeStructure.routes.js";
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
app.use("/api", teacherAttendanceRoutes);
app.use("/api", staffAttendanceRoutes);
app.use("/api", feeInventoryRoutes);
app.use("/api", discountRoutes);
app.use("/api", feeStructureRoutes);

// Swagger
swaggerDocs(app);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});