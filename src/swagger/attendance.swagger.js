/**
 * @swagger
 * tags:
 *   - name: StudentAttendance
 *     description: Daily student attendance (today view)
 *   - name: StudentAttendanceMatrix
 *     description: Attendance matrix (session-wise)
 *   - name: AttendanceWrite
 *     description: Mark student attendance
 *   - name: AttendanceCount
 *     description: Attendance count summary
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AttendanceMark:
 *       type: object
 *       required:
 *         - StudentID
 *         - Status
 *       properties:
 *         studentID:
 *           type: integer
 *           example: 101
 *         status:
 *           type: string
 *           enum: [P, A, H]
 *           example: P
 *
 *     AttendanceMatrixResponse:
 *       type: object
 *       properties:
 *         FromDate:
 *           type: string
 *           example: session-start
 *         ToDate:
 *           type: string
 *           example: 2026-01-02
 *         Data:
 *           type: array
 *           items:
 *             type: object
 *
 *     AttendanceCount:
 *       type: object
 *       properties:
 *         Entity:
 *           type: string
 *           example: Class 10A
 *         Present:
 *           type: integer
 *           example: 25
 *         Absent:
 *           type: integer
 *           example: 3
 *         Holiday:
 *           type: integer
 *           example: 2
 */

/* =========================
   STUDENT ATTENDANCE (TODAY)
   ========================= */

/**
 * @swagger
 * /getstudentattendance:
 *   get:
 *     summary: Get today’s attendance by class (section optional)
 *     tags: [StudentAttendance]
 *     parameters:
 *       - in: query
 *         name: className
 *         required: true
 *         schema:
 *           type: string
 *           example: "10"
 *       - in: query
 *         name: section
 *         required: false
 *         schema:
 *           type: string
 *           example: "A"
 *     responses:
 *       200:
 *         description: Attendance list for today
 *       400:
 *         description: Invalid parameters
 */

/* =========================
   ATTENDANCE MATRIX
   ========================= */

/**
 * @swagger
 * /v1/student-attendance/all:
 *   get:
 *     summary: Get attendance matrix for all students
 *     tags: [AttendanceMatrix]
 *     responses:
 *       200:
 *         description: Attendance matrix
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttendanceMatrixResponse'
 */

/**
 * @swagger
 * /v1/student-attendance/by-class/{class}:
 *   get:
 *     summary: Get attendance matrix by class (section optional)
 *     tags: [AttendanceMatrix]
 *     parameters:
 *       - in: path
 *         name: class
 *         required: true
 *         schema:
 *           type: string
 *           example: "10"
 *       - in: query
 *         name: section
 *         required: false
 *         schema:
 *           type: string
 *           example: "A"
 *     responses:
 *       200:
 *         description: Attendance matrix by class
 */

/**
 * @swagger
 * /v1/student-attendance/by-id/{studentId}:
 *   get:
 *     summary: Get attendance matrix for a single student
 *     tags: [AttendanceMatrix]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 101
 *     responses:
 *       200:
 *         description: Attendance matrix for student
 */

/* =========================
   WRITE ATTENDANCE
   ========================= */

/**
 * @swagger
 * /writestudentattendance/today:
 *   post:
 *     summary: Mark attendance for today
 *     tags: [AttendanceWrite]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/AttendanceMark'
 *     responses:
 *       200:
 *         description: Attendance marked successfully
 */

/**
 * @swagger
 * /writestudentattendance/{date}:
 *   post:
 *     summary: Mark attendance for a specific date
 *     tags: [AttendanceWrite]
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
 *               $ref: '#/components/schemas/AttendanceMark'
 *     responses:
 *       200:
 *         description: Attendance marked successfully
 */

/* =========================
   ATTENDANCE COUNT
   ========================= */

/**
 * @swagger
 * /v1/attendance-count/today:
 *   get:
 *     summary: Get today’s attendance count (IST)
 *     tags: [AttendanceCount]
 *     responses:
 *       200:
 *         description: Attendance count summary
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AttendanceCount'
 */

/**
 * @swagger
 * /v1/attendance-count/by-date:
 *   get:
 *     summary: Get attendance count by date
 *     tags: [AttendanceCount]
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           example: 2025-09-02
 *     responses:
 *       200:
 *         description: Attendance count summary
 */
