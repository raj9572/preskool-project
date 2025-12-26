import { EventModel } from "../models/event.model.js";

export const EventController = {

  // CREATE event
  async create(req, res) {
    try {
      const { EventName, StartDate, EndDate, Description } = req.body;

      if (!EventName || !StartDate || !EndDate) {
        return res.status(400).json({
          success: false,
          message: "EventName, StartDate and EndDate are required"
        });
      }

      if (new Date(EndDate) < new Date(StartDate)) {
        return res.status(400).json({
          success: false,
          message: "EndDate cannot be before StartDate"
        });
      }

      const eventId = await EventModel.create({
        EventName,
        StartDate,
        EndDate,
        Description
      });

      res.status(201).json({
        success: true,
        message: "Event created successfully",
        EventID: eventId
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // GET all events
  async getAll(req, res) {
    try {
      const events = await EventModel.getAll();
      res.json({ success: true, data: events });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // GET event by ID
  async getById(req, res) {
    try {
      const event = await EventModel.getById(req.params.id);

      if (!event) {
        return res.status(404).json({
          success: false,
          message: "Event not found"
        });
      }

      res.json({ success: true, data: event });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // DELETE event
  async delete(req, res) {
    try {
      const deleted = await EventModel.deleteById(req.params.id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Event not found"
        });
      }

      res.json({
        success: true,
        message: "Event deleted successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};
