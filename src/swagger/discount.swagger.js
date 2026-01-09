/**
 * @swagger
 * tags:
 *   - name: Discount
 *     description: Discount master
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Discount:
 *       type: object
 *       required:
 *         - discount_id
 *         - discount_type
 *         - discount_value
 *       properties:
 *         discount_id:
 *           type: string
 *           example: DISC01
 *         discount_type:
 *           type: string
 *           example: Scholarship
 *         discount_value:
 *           type: number
 *           example: 500
 */

/**
 * @swagger
 * /discount:
 *   post:
 *     summary: Create discount
 *     tags: [Discount]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Discount'
 *     responses:
 *       201:
 *         description: Discount created
 *
 *   get:
 *     summary: Get all discounts
 *     tags: [Discount]
 *     responses:
 *       200:
 *         description: Discount list
 */

/**
 * @swagger
 * /discount/{id}:
 *   get:
 *     summary: Get discount by ID
 *     tags: [Discount]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: DISC01
 *     responses:
 *       200:
 *         description: Discount details
 *
 *   put:
 *     summary: Update discount
 *     tags: [Discount]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Discount'
 *     responses:
 *       200:
 *         description: Discount updated
 *
 *   delete:
 *     summary: Delete discount
 *     tags: [Discount]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Discount deleted
 */
