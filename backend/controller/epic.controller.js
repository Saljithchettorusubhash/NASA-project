import { EPICRepository } from "../repository/epic.repository.js";

class EPICController {
    constructor() {
        this.epicRepository = new EPICRepository();
    }

    // Get the latest available EPIC images with pagination and limit
    async getLatestImages(req, res) {
        const { page = 1, limit = 10 } = req.query;  // Default page 1 and limit 10
        try {
            const response = await this.epicRepository.getLatestImages(page, limit);
            res.status(200).send(response);
        } catch (err) {
            console.log(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error fetching the latest EPIC images" });
        }
    }

    // Get EPIC images by date with pagination and limit
    async getImagesByDate(req, res) {
        const { date } = req.params;
        const { page = 1, limit = 10 } = req.query;  // Default page 1 and limit 10
        try {
            const response = await this.epicRepository.getImagesByDate(date, page, limit);
            res.status(200).send(response);
        } catch (err) {
            console.log(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error fetching EPIC images by date" });
        }
    }

    // Get available dates for EPIC images
    async getAvailableDates(req, res) {
        try {
            const response = await this.epicRepository.getAvailableDates();
            res.status(200).send(response);
        } catch (err) {
            console.log(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error fetching available dates" });
        }
    }
}

export { EPICController };
