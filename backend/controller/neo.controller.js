import { NeoWsRepository } from "../repository/neo.repository.js";

class NeoWsController {
  constructor() {
    this.neoWsRepository = new NeoWsRepository();
  }

  // Fetch NEOs for a given date range
  async getNEOsByDateRange(req, res) {
    const { startDate, endDate } = req.params;
    try {
      const response = await this.neoWsRepository.getNEOsByDateRange(startDate, endDate);
      res.status(200).send(response);
    } catch (err) {
      console.error("Error occurred:", err.message);
      res.status(500).json({ message: "Error fetching NEOs by date range" });
    }
  }

  // Fetch NEO details by ID
  async getNeoById(req, res) {
    const { neoId } = req.params;
    try {
      const response = await this.neoWsRepository.getNeoById(neoId);
      res.status(200).send(response);
    } catch (err) {
      console.error("Error occurred:", err.message);
      res.status(500).json({ message: "Error fetching NEO details" });
    }
  }

  // Fetch today's NEOs
  async getTodayNEOs(req, res) {
    try {
      const response = await this.neoWsRepository.getTodayNEOs();
      res.status(200).send(response);
    } catch (err) {
      console.error("Error occurred:", err.message);
      res.status(500).json({ message: "Error fetching today's NEOs" });
    }
  }
}

export { NeoWsController };
