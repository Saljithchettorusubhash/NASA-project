import { MarsWeatherRepository } from "../repository/marsWeather.repository.js";

class MarsWeatherController {
    constructor() {
        this.marsWeatherRepository = new MarsWeatherRepository
    }


    // Fetch latest Mars weather data
    async getLatestWeather(req, res) {
        try {
            const response = await this.marsWeatherRepository.getLatestWeather();
            res.status(200).send(response);
        } catch (err) {
            console.error(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error fetching Mars weather data" });
        }
    }

    // Fetch Mars weather data for a specific sol (Martian day)
    async getWeatherBySol(req, res) {
        const { sol } = req.params;
        try {
            const response = await this.marsWeatherRepository.getWeatherBySol(sol);
            res.status(200).send(response);
        } catch (err) {
            console.error(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error fetching Mars weather data by sol" });
        }
    }
}

export { MarsWeatherController };
