/**
 * @swagger
 * tags:
 *   - name: FeeStructure
 *     description: Class-wise fee structure management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FeeStructure:
 *       type: object
 *       required:
 *         - structur_id
 *         - class
 *         - academic_year
 *       properties:
 *         structur_id:
 *           type: string
 *           example: FS001
 *         class:
 *           type: string
 *           example: "10"
 *         academic_year:
 *           type: string
 *           example: "2025-2026"
 *
 *         admission_fee:
 *           type: number
 *           example: 5000
 *         annual_fee:
 *           type: number
 *           example: 3000
 *         exam_fee:
 *           type: number
 *           example: 1500
 *         library_fee:
 *           type: number
 *           example: 800
 *         computer_fee:
 *           type: number
 *           example: 1200
 *         sports_fee:
 *           type: number
 *           example: 700
 *         lab_fee:
 *           type: number
 *           example: 900
 *         misc_fee:
 *           type: number
 *           example: 500
 *
 *         apr_tuition_fee:
 *           type: number
 *           example: 1200
 *         may_tuition_fee:
 *           type: number
 *           example: 1200
 *         jun_tuition_fee:
 *           type: number
 *           example: 1200
 *         jul_tuition_fee:
 *           type: number
 *           example: 1200
 *         aug_tuition_fee:
 *           type: number
 *           example: 1200
 *         sep_tuition_fee:
 *           type: number
 *           example: 1200
 *         oct_tuition_fee:
 *           type: number
 *           example: 1200
 *         nov_tuition_fee:
 *           type: number
 *           example: 1200
 *         dec_tuition_fee:
 *           type: number
 *           example: 1200
 *         jan_tuition_fee:
 *           type: number
 *           example: 1200
 *         feb_tuition_fee:
 *           type: number
 *           example: 1200
 *         mar_tuition_fee:
 *           type: number
 *           example: 1200
 */

/**
 * @swagger
 * /fee-structure:
 *   post:
 *     summary: Create fee structure
 *     tags: [FeeStructure]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeeStructure'
 *     responses:
 *       201:
 *         description: Fee structure created successfully
 *
 *   get:
 *     summary: Get all fee structures
 *     tags: [FeeStructure]
 *     responses:
 *       200:
 *         description: List of fee structures
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FeeStructure'
 */

/**
 * @swagger
 * /fee-structure/by-class:
 *   get:
 *     summary: Get fee structure by class and academic year
 *     tags: [FeeStructure]
 *     parameters:
 *       - in: query
 *         name: className
 *         required: true
 *         schema:
 *           type: string
 *           example: "10"
 *       - in: query
 *         name: academicYear
 *         required: true
 *         schema:
 *           type: string
 *           example: "2025-2026"
 *     responses:
 *       200:
 *         description: Fee structure details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeeStructure'
 */

/**
 * @swagger
 * /fee-structure/{id}:
 *   put:
 *     summary: Update fee structure
 *     tags: [FeeStructure]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: FS001
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeeStructure'
 *     responses:
 *       200:
 *         description: Fee structure updated successfully
 *
 *   delete:
 *     summary: Delete fee structure
 *     tags: [FeeStructure]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: FS001
 *     responses:
 *       200:
 *         description: Fee structure deleted successfully
 */
