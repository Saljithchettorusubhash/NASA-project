import { ExoplanetRepository } from "../repository/exoPlanet.repository.js";

ExoplanetRepository
class ExoplanetController {
    constructor() {
        this.exoplanetRepository = new ExoplanetRepository();
    }

    // Fetch confirmed exoplanets
    async getConfirmedExoplanets(req, res) {
        const { limit, offset, discoveryMethod, year } = req.query; // Extract query parameters

        try {
            const response = await this.exoplanetRepository.getConfirmedExoplanets({
                limit: parseInt(limit) || 10,
                offset: parseInt(offset) || 0,
                discoveryMethod,
                year: year ? parseInt(year) : null
            });

            res.status(200).send(response);
        } catch (err) {
            console.log(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error fetching confirmed exoplanets" });
        }
    }
    // Fetch planets in the habitable zone
    async getHabitableZonePlanets(req, res) {
        const { limit, offset } = req.query; 
        try {
            const response = await this.exoplanetRepository.getHabitableZonePlanets({
                limit: parseInt(limit) || 10,
                offset: parseInt(offset) || 0
            });
            res.status(200).send(response);
        } catch (err) {
            console.log(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error fetching habitable zone planets" });
        }
    }

    // Fetch host stars within a specific temperature range
    async getHostStars(req, res) {
        try {
            const response = await this.exoplanetRepository.getHostStars();
            res.status(200).send(response);
        } catch (err) {
            console.log(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error fetching host stars" });
        }
    }

    // Fetch planetary candidates
    async getPlanetaryCandidates(req, res) {
        try {
            const response = await this.exoplanetRepository.getPlanetaryCandidates();
            res.status(200).send(response);
        } catch (err) {
            console.log(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error fetching planetary candidates" });
        }
    }

    // Fetch planets discovered by Transit or Radial Velocity methods
    async getTransitOrRVPlanets(req, res) {
        try {
            const response = await this.exoplanetRepository.getTransitOrRVPlanets();
            res.status(200).send(response);
        } catch (err) {
            console.log(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error fetching transit or RV planets" });
        }
    }
}

export { ExoplanetController };
