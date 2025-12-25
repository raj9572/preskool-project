/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       properties:
 *         TeacherID:
 *           type: integer
 *           example: 501
 *         FullName:
 *           type: string
 *           example: Rahul Verma
 *         Subject:
 *           type: string
 *           example: Mathematics
 *         Email:
 *           type: string
 *           example: rahul.verma@test.com
 *         ContactNumber:
 *           type: string
 *           example: "9876543210"
 *         Gender:
 *           type: string
 *           example: Male
 *         DateOfBirth:
 *           type: string
 *           format: date
 *           example: 1990-04-15
 *         Qualification:
 *           type: string
 *           example: M.Sc Mathematics
 *         ExperienceYears:
 *           type: integer
 *           example: 8
 *         Address:
 *           type: string
 *           example: Sector 18
 *         City:
 *           type: string
 *           example: Noida
 *         State:
 *           type: string
 *           example: Uttar Pradesh
 *         PostalCode:
 *           type: string
 *           example: "201301"
 *         Nationality:
 *           type: string
 *           example: Indian
 *         DateOfJoining:
 *           type: string
 *           format: date
 *           example: 2022-06-01
 *         BloodGroup:
 *           type: string
 *           example: O+
 *         EmergencyContactName:
 *           type: string
 *           example: Suresh Verma
 *         EmergencyContactNumber:
 *           type: string
 *           example: "9876500000"
 *         MaritalStatus:
 *           type: string
 *           example: Married
 *         ProfilePictureUrl:
 *           type: string
 *           example: https://cdn.example.com/teacher.jpg
 */

/**
 * @swagger
 * /teacher:
 *   post:
 *     summary: Create or update teacher
 *     tags: [Teacher]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       200:
 *         description: Teacher saved successfully
 *
 *   get:
 *     summary: Get all teachers
 *     tags: [Teacher]
 *     responses:
 *       200:
 *         description: Teacher list
 */

/**
 * @swagger
 * /teacher/{id}:
 *   get:
 *     summary: Get teacher by ID
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Teacher data
 *
 *   delete:
 *     summary: Delete teacher by ID
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Teacher deleted
 */
