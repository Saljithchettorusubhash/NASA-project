import { EONETRepository } from "../repository/eonet.repository.js";

class EONETController {
    constructor() {
        this.eonetRepository = new EONETRepository();
    }

    // Controller function to fetch all events
    async getAllEvents(req, res) {
        try {
            const response = await this.eonetRepository.getEvents();
            res.status(200).send(response);
        } catch (err) {
            console.error(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error fetching events" });
        }
    }

    // Controller function to fetch a specific event by ID
    async getEventById(req, res) {
        const { eventId } = req.params;
        try {
            const response = await this.eonetRepository.getEventById(eventId);
            res.status(200).send(response);
        } catch (err) {
            console.error(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error fetching event by ID" });
        }
    }
}

export { EONETController };
