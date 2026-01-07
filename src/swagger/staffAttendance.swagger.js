/**
 * @swagger
 * tags:
 *   - name: StaffAttendanceMatrix
 *     description: Staff attendance matrix (session-wise)
 *   - name: StaffAttendanceWrite
 *     description: Write and read staff attendance
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     StaffAttendanceMark:
 *       type: object
 *       required:
 *         - staffID
 *         - status
 *       properties:
 *         staffID:
 *           type: integer
 *           example: 5
 *         status:
 *           type: string
 *           enum: [P, A]
 *           example: P
 *
 *     StaffAttendanceMatrixResponse:
 *       type: object
 *       properties:
 *         Result:
 *           type: boolean
 *           example: true
 *         FromDate:
 *           type: string
 *           example: session-start (auto)
 *         ToDate:
 *           type: string
 *           example: 2025-09-05
 *         Data:
 *           type: array
 *           items:
 *             type: object
 *         Message:
 *           type: string
 *           example: Success
 */

/* =========================
   STAFF ATTENDANCE MATRIX
   ========================= */

/**
 * @swagger
 * /v1/staff-attendance/all:
 *   get:
 *     summary: Get staff attendance matrix for all staff
 *     tags: [StaffAttendanceMatrix]
 *     responses:
 *       200:
 *         description: Attendance matrix for all staff
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StaffAttendanceMatrixResponse'
 */

/**
 * @swagger
 * /v1/staff-attendance/by-id/{staffId}:
 *   get:
 *     summary: Get attendance matrix for a single staff member
 *     tags: [StaffAttendanceMatrix]
 *     parameters:
 *       - in: path
 *         name: staffId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Attendance matrix for staff
 */

/* =========================
   WRITE / READ DAILY ATTENDANCE
   ========================= */

/**
 * @swagger
 * /write-staff-attendence/today:
 *   post:
 *     summary: Write staff attendance for today
 *     tags: [StaffAttendanceWrite]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/StaffAttendanceMark'
 *     responses:
 *       200:
 *         description: Staff attendance written successfully
 *
 *   get:
 *     summary: Get staff attendance for today
 *     tags: [StaffAttendanceWrite]
 *     responses:
 *       200:
 *         description: Today’s staff attendance
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   StaffID:
 *                     type: integer
 *                     example: 5
 *                   Name:
 *                     type: string
 *                     example: Suresh Kumar
 *                   Status:
 *                     type: string
 *                     example: P
 */

/**
 * @swagger
 * /write-staff-attendence/{date}:
 *   post:
 *     summary: Write staff attendance for a specific date
 *     tags: [StaffAttendanceWrite]
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: 2025-09-05
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/StaffAttendanceMark'
 *     responses:
 *       200:
 *         description: Staff attendance written successfully
 */
