/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         studentID:
 *           type: integer
 *           example: 12003
 *         FullName:
 *           type: string
 *           example: safi sharma
 *         EmailAddress:
 *           type: string
 *           example: amit@test.com
 *         DOB:
 *           type: string
 *           format: date
 *           example: 2002-05-10
 *         Gender:
 *           type: string
 *           example: Male
 *         ClassID:
 *           type: string
 *           example: "10"
 *         SectionID:
 *           type: string
 *           example: A
 *         Address:
 *           type: string
 *           example: Noida
 *         ContactNumber:
 *           type: string
 *           example: "9876543210"
 *         Nationality:
 *           type: string
 *           example: Indian
 *         IdentificationNumber:
 *           type: string
 *           example: ID12345
 *         EnrollmentNumber:
 *           type: string
 *           example: ENR2024
 *         AddmissionDate:
 *           type: string
 *           format: date
 *           example: 2024-06-01
 *         ProgramName:
 *           type: string
 *           example: Science
 *         YearOrSamester:
 *           type: string
 *           example: "1"
 *         PreviousAcademicRecord:
 *           type: string
 *           example: Good
 *         GPAOrMarks:
 *           type: string
 *           example: "8.2"
 *         AttendancePercentage:
 *           type: number
 *           example: 92
 *         SubjectsTaken:
 *           type: string
 *           example: Maths, Physics
 *         AcademicStatus:
 *           type: string
 *           example: Active
 *         GuardianName:
 *           type: string
 *           example: Raj Sharma
 *         GuardianRelation:
 *           type: string
 *           example: Father
 *         GuardianContact:
 *           type: string
 *           example: "9876500000"
 *         GuardianOccupation:
 *           type: string
 *           example: Business
 *         GuardianAddress:
 *           type: string
 *           example: Noida
 */

/**
 * @swagger
 * /student/students:
 *   post:
 *     summary: Create or update student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Student created or updated successfully
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Student list
 */

/**
 * @swagger
 * /student/students/{id}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 12003
 *     responses:
 *       200:
 *         description: Student fetched successfully
 *
 *   delete:
 *     summary: Delete student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 12003
 *     responses:
 *       200:
 *         description: Student deleted successfully
 */
