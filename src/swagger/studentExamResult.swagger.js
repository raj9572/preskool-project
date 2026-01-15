/**
 * @swagger
 * tags:
 *   - name: StudentExamResult
 *     description: Student Exam Result CRUD APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     StudentExamResult:
 *       type: object
 *       required:
 *         - StudentId
 *         - Class
 *         - Section
 *         - ExamType
 *         - Subject
 *         - MaxMarks
 *         - MinMarks
 *         - MarksObtained
 *       properties:
 *         StudentId:
 *           type: string
 *           example: ADM1001
 *         Class:
 *           type: string
 *           example: "10"
 *         Section:
 *           type: string
 *           example: "A"
 *         ExamType:
 *           type: string
 *           example: Midterm
 *         Subject:
 *           type: string
 *           example: Math
 *         MaxMarks:
 *           type: integer
 *           example: 100
 *         MinMarks:
 *           type: integer
 *           example: 33
 *         MarksObtained:
 *           type: integer
 *           example: 78
 */

/**
 * @swagger
 * /student-exam-result:
 *   post:
 *     summary: Create student exam result
 *     tags: [StudentExamResult]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentExamResult'
 *     responses:
 *       201:
 *         description: Created successfully
 *
 *   get:
 *     summary: Get all exam results
 *     tags: [StudentExamResult]
 *     responses:
 *       200:
 *         description: List of all exam results
 */

/**
 * @swagger
 * /student-exam-result/{id}:
 *   get:
 *     summary: Get exam result by ResultId
 *     tags: [StudentExamResult]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Exam result details
 *
 *   put:
 *     summary: Update exam result
 *     tags: [StudentExamResult]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentExamResult'
 *     responses:
 *       200:
 *         description: Updated successfully
 *
 *   delete:
 *     summary: Delete exam result
 *     tags: [StudentExamResult]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Deleted successfully
 */

/**
 * @swagger
 * /student-exam-result/student/{studentId}:
 *   get:
 *     summary: Get all exam results for a student
 *     tags: [StudentExamResult]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *           example: ADM1001
 *     responses:
 *       200:
 *         description: Student results list
 */
