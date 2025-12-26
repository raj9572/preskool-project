/**
 * @swagger
 * components:
 *   schemas:
 *     NoticeCreate:
 *       type: object
 *       required:
 *         - Classes
 *         - Description
 *       properties:
 *         Classes:
 *           type: string
 *           example: "1A,1B,10C"
 *         Description:
 *           type: string
 *           example: "Tomorrow is a holiday due to maintenance work."
 *
 *     NoticeRead:
 *       type: object
 *       properties:
 *         NoticeID:
 *           type: integer
 *           example: 12
 *         Classes:
 *           type: string
 *           example: "1A,1B,10C"
 *         Description:
 *           type: string
 *           example: "Tomorrow is a holiday due to maintenance work."
 */

/**
 * @swagger
 * /notice:
 *   get:
 *     summary: Get all notices
 *     tags: [NoticeBoard]
 *     responses:
 *       200:
 *         description: List of notices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NoticeRead'
 *
 *   post:
 *     summary: Create a notice
 *     tags: [NoticeBoard]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoticeCreate'
 *     responses:
 *       201:
 *         description: Notice created successfully
 */

/**
 * @swagger
 * /notice/{id}:
 *   get:
 *     summary: Get notice by ID
 *     tags: [NoticeBoard]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notice data
 * 
 *   delete:
 *     summary: Delete notice by ID
 *     tags: [NoticeBoard]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 12
 *     responses:
 *       200:
 *         description: Notice deleted successfully
 *       404:
 *         description: Notice not found
 */
