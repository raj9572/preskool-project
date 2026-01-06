/**
 * @swagger
 * tags:
 *   - name: TeacherAttendance
 *     description: Daily teacher attendance
 *   - name: TeacherAttendanceMatrix
 *     description: Teacher attendance matrix (session-wise)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TeacherTodayAttendance:
 *       type: object
 *       properties:
 *         TeacherID:
 *           type: integer
 *           example: 201
 *         Name:
 *           type: string
 *           example: Nadeem Shahzad
 *         Status:
 *           type: string
 *           enum: [P, A, H]
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

/* ================================
   TEACHER TODAY ATTENDANCE
   ================================ */

/**
 * @swagger
 * /getteacherattendance/today:
 *   get:
 *     summary: Get today’s teacher attendance
 *     tags: [TeacherAttendance]
 *     responses:
 *       200:
 *         description: List of teachers with today’s attendance status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TeacherTodayAttendance'
 */

/* ================================
   TEACHER ATTENDANCE MATRIX
   ================================ */

/**
 * @swagger
 * /v1/teacher-attendance/all:
 *   get:
 *     summary: Get attendance matrix for all teachers
 *     tags: [TeacherAttendanceMatrix]
 *     responses:
 *       200:
 *         description: Attendance matrix for all teachers
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
 *           example: 201
 *     responses:
 *       200:
 *         description: Attendance matrix for the teacher
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeacherAttendanceMatrixResponse'
 */
