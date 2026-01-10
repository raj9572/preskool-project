/**
 * @swagger
 * tags:
 *   - name: FeeSubmission
 *     description: Student fee payments & transactions
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FeeSubmission:
 *       type: object
 *       required:
 *         - submission_id
 *         - student_id
 *         - transaction_id
 *         - fee_type
 *         - original_amount
 *         - paid_amount
 *         - payment_mode
 *       properties:
 *         submission_id:
 *           type: string
 *           example: SUB202509001
 *         student_id:
 *           type: string
 *           example: STU1001
 *         transaction_id:
 *           type: string
 *           example: TXN998877
 *         fee_type:
 *           type: string
 *           example: Tuition
 *         original_amount:
 *           type: number
 *           example: 12000
 *         discount_id:
 *           type: integer
 *           nullable: true
 *           example: 1
 *         discount_amount:
 *           type: number
 *           example: 2000
 *         paid_amount:
 *           type: number
 *           example: 10000
 *         payment_mode:
 *           type: string
 *           example: UPI
 *         payment_status:
 *           type: string
 *           example: SUCCESS
 *         submitted_by:
 *           type: string
 *           example: Accountant
 *         submitted_date:
 *           type: string
 *           format: date
 *           example: 2025-09-10
 *         remarks:
 *           type: string
 *           example: April & May fees
 */

/* =========================
   CREATE + GET ALL
   ========================= */

/**
 * @swagger
 * /fee-submission:
 *   post:
 *     summary: Submit student fee
 *     tags: [FeeSubmission]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeeSubmission'
 *     responses:
 *       201:
 *         description: Fee submitted successfully
 *
 *   get:
 *     summary: Get all fee submissions
 *     tags: [FeeSubmission]
 *     responses:
 *       200:
 *         description: List of all fee submissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FeeSubmission'
 */

/* =========================
   FILTERED READS
   ========================= */

/**
 * @swagger
 * /fee-submission/student/{studentId}:
 *   get:
 *     summary: Get fee submissions by student ID
 *     tags: [FeeSubmission]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *           example: STU1001
 *     responses:
 *       200:
 *         description: Student fee history
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FeeSubmission'
 */


