import { ExoplanetRepository } from "../repository/exoPlanet.repository.js";

ExoplanetRepository
class ExoplanetController {
    constructor() {
        this.exoplanetRepository = new ExoplanetRepository();
    }

    // Fetch confirmed exoplanets
    async getConfirmedExoplanets(req, res) {
        try {
            const response = await this.exoplanetRepository.getConfirmedExoplanets();
            res.status(200).send(response);
        } catch (err) {
            console.log(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error fetching confirmed exoplanets" });
        }
    }

    // Fetch planets in the habitable zone
    async getHabitableZonePlanets(req, res) {
        try {
            const response = await this.exoplanetRepository.getHabitableZonePlanets();
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
