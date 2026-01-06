/**
 * @swagger
 * tags:
 *   - name: TeacherAttendance
 *     description: Daily teacher attendance
 *   - name: TeacherAttendanceMatrix
 *     description: Teacher attendance matrix (session-wise)
 *   - name: TeacherAttendanceWrite
 *     description: Write / update teacher attendance
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TeacherAttendanceMark:
 *       type: object
 *       required:
 *         - teacherID
 *         - status
 *       properties:
 *         teacherID:
 *           type: integer
 *           example: 12
 *         status:
 *           type: string
 *           enum: [P, A]
 *           example: P
 *
 *     TeacherAttendanceMatrixResponse:
 *       type: object
 *       properties:
 *         ToDate:
 *           type: string
 *           example: 2025-09-02
 *         Data:
 *           type: array
 *           items:
 *             type: object
 */

/* =========================
   TODAY ATTENDANCE (READ)
   ========================= */

/**
 * @swagger
 * /getteacherattendance/today:
 *   get:
 *     summary: Get today’s teacher attendance
 *     tags: [TeacherAttendance]
 *     responses:
 *       200:
 *         description: Teacher attendance for today
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   TeacherID:
 *                     type: integer
 *                     example: 12
 *                   Name:
 *                     type: string
 *                     example: Ramesh Kumar
 *                   Status:
 *                     type: string
 *                     example: P
 */

/* =========================
   ATTENDANCE MATRIX
   ========================= */

/**
 * @swagger
 * /v1/teacher-attendance/all:
 *   get:
 *     summary: Get teacher attendance matrix for all teachers
 *     tags: [TeacherAttendanceMatrix]
 *     responses:
 *       200:
 *         description: Attendance matrix
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeacherAttendanceMatrixResponse'
 */

/**
 * @swagger
 * /v1/teacher-attendance/by-id/{teacherId}:
 *   get:
 *     summary: Get attendance matrix for a single teacher
 *     tags: [TeacherAttendanceMatrix]
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 12
 *     responses:
 *       200:
 *         description: Attendance matrix for teacher
 */

/* =========================
   WRITE ATTENDANCE
   ========================= */

/**
 * @swagger
 * /writeteacherattendance/today:
 *   post:
 *     summary: Mark teacher attendance for today
 *     tags: [TeacherAttendanceWrite]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/TeacherAttendanceMark'
 *     responses:
 *       200:
 *         description: Attendance saved successfully
 */

/**
 * @swagger
 * /writeteacherattendance/{date}:
 *   post:
 *     summary: Mark teacher attendance for a specific date
 *     tags: [TeacherAttendanceWrite]
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: 2025-09-02
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/TeacherAttendanceMark'
 *     responses:
 *       200:
 *         description: Attendance saved successfully
 */
