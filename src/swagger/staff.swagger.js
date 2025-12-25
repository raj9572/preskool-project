/**
 * @swagger
 * components:
 *   schemas:
 *     Staff:
 *       type: object
 *       properties:
 *         StaffID:
 *           type: integer
 *           example: 101
 *         FullName:
 *           type: string
 *           example: Nadeem Shahzad
 *         Role:
 *           type: string
 *           example: Software Engineer
 *         ContactNumber:
 *           type: string
 *           example: "9876543210"
 *         Email:
 *           type: string
 *           example: nadeem@test.com
 *         Gender:
 *           type: string
 *           example: Male
 *         DateOfBirth:
 *           type: string
 *           format: date
 *           example: 1995-06-10
 *         Qualification:
 *           type: string
 *           example: B.Tech
 *         DateOfJoining:
 *           type: string
 *           format: date
 *           example: 2023-01-15
 *         ExperienceYears:
 *           type: integer
 *           example: 5
 *         Address:
 *           type: string
 *           example: Riyadh Street
 *         City:
 *           type: string
 *           example: Riyadh
 *         State:
 *           type: string
 *           example: Riyadh Province
 *         PostalCode:
 *           type: string
 *           example: "11432"
 *         Nationality:
 *           type: string
 *           example: Indian
 *         MaritalStatus:
 *           type: string
 *           example: Married
 *         EmergencyContactName:
 *           type: string
 *           example: Ali Shahzad
 *         EmergencyContactNumber:
 *           type: string
 *           example: "9876500000"
 *         ProfilePictureUrl:
 *           type: string
 *           example: https://cdn.example.com/profile.jpg
 */

/**
 * @swagger
 * /staff:
 *   post:
 *     summary: Create or update staff
 *     tags: [Staff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Staff'
 *     responses:
 *       200:
 *         description: Staff saved successfully
 *
 *   get:
 *     summary: Get all staff
 *     tags: [Staff]
 *     responses:
 *       200:
 *         description: Staff list
 */

/**
 * @swagger
 * /staff/{id}:
 *   get:
 *     summary: Get staff by ID
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Staff data
 *
 *   delete:
 *     summary: Delete staff by ID
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Staff deleted
 */
