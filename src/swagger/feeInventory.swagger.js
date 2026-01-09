/**
 * @swagger
 * tags:
 *   - name: FeeInventory
 *     description: Fee inventory master
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FeeInventory:
 *       type: object
 *       required:
 *         - fee_id
 *         - class
 *         - fee_type
 *         - price
 *         - academic_year
 *       properties:
 *         fee_id:
 *           type: string
 *           example: FI001
 *         class:
 *           type: string
 *           example: "10"
 *         fee_type:
 *           type: string
 *           example: Tuition
 *         price:
 *           type: number
 *           example: 1500
 *         academic_year:
 *           type: string
 *           example: 2025-2026
 */

/**
 * @swagger
 * /fee-inventory:
 *   post:
 *     summary: Create fee inventory
 *     tags: [FeeInventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeeInventory'
 *     responses:
 *       201:
 *         description: Fee created
 *
 *   get:
 *     summary: Get all fee inventory
 *     tags: [FeeInventory]
 *     responses:
 *       200:
 *         description: Fee list
 */

/**
 * @swagger
 * /fee-inventory/{id}:
 *   get:
 *     summary: Get fee by ID
 *     tags: [FeeInventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: FI001
 *     responses:
 *       200:
 *         description: Fee details
 *
 *   put:
 *     summary: Update fee inventory
 *     tags: [FeeInventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeeInventory'
 *     responses:
 *       200:
 *         description: Fee updated
 *
 *   delete:
 *     summary: Delete fee inventory
 *     tags: [FeeInventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Fee deleted
 */
