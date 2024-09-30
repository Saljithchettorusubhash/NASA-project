
import { asteroidRepository } from "../repository/asteroid.repository.js";

class AsteroidController {
    constructor() {
        this.AsteroidRepository = new asteroidRepository();

    }
    
    async getAsteroidFeed(req,res) {
        const { start_date, end_date } = req.query || {};
        try{
            const response = await this.AsteroidRepository.geAsteroidFeed(start_date, end_date);
            res.status(200).send(response);
        }
        catch(err){
            console.log(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error fetching Asteroid Feed" });
        }
    }

    async getAsteroidById(req,res) {
        const { asteroid_id } = req.params;
        if (!asteroid_id) {
            res.status(400).json({ message: "Invalid asteroid id" });
            return;
        }
        try {
            const response = await this.AsteroidRepository.getAsteroidById(asteroid_id);
            res.status(200).send(response);
        }
        catch(err){
            console.log(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error fetching asteroid details" });
        }
    }

    async browseAsteroids(req,res) {
        const { page, size } = req.query || {};
        try {
            const response = await this.AsteroidRepository.browseAsteroids(page, size);
            res.status(200).send(response);
        }
        catch(err){
            console.log(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error browsing asteroids" });
        }
    }

}
export { AsteroidController };