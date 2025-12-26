/**
 * @swagger
 * components:
 *   schemas:
 *     EventCreate:
 *       type: object
 *       required:
 *         - EventName
 *         - StartDate
 *         - EndDate
 *       properties:
 *         EventName:
 *           type: string
 *           example: Annual Sports Day
 *         StartDate:
 *           type: string
 *           format: date-time
 *           example: 2025-01-15T09:00:00
 *         EndDate:
 *           type: string
 *           format: date-time
 *           example: 2025-01-15T17:00:00
 *         Description:
 *           type: string
 *           example: Sports events and competitions for all classes
 *
 *     EventRead:
 *       type: object
 *       properties:
 *         EventID:
 *           type: integer
 *           example: 10
 *         EventName:
 *           type: string
 *           example: Annual Sports Day
 *         StartDate:
 *           type: string
 *           format: date-time
 *         EndDate:
 *           type: string
 *           format: date-time
 *         PublishedDate:
 *           type: string
 *           format: date-time
 *         Description:
 *           type: string
 */

/**
 * @swagger
 * /event:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventCreate'
 *     responses:
 *       201:
 *         description: Event created successfully
 *
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EventRead'
 */

/**
 * @swagger
 * /event/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Event data
 *       404:
 *         description: Event not found
 *
 *   delete:
 *     summary: Delete event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Event deleted successfully
 */
