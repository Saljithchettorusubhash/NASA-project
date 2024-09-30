import { EarthImageryRepository } from "../repository/earthimagery.repository.js";

class EarthController {
    constructor() {
        this.earthImageryRepository = new EarthImageryRepository();
    }

    async getImagery(req,res) {
        const { lon, lat, date, dim, cloud_score } = req.query || {};
        try {
            const response = await this.earthImageryRepository.getImagery({
                lon,
                lat,
                date,
                dim,
                cloud_score
            });
            res.status(200).send(response);
        }
        catch(err){
            console.log(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error fetching Earth Imagery" });
        }

    }
    async getAssets(req,res) {
        const { lon, lat, date, dim,cloud_score } = req.query || {};
        try {
            const response = await this.earthImageryRepository.getAssets({
                lon,
                lat,
                date,
                dim,
                cloud_score
        
            });
            res.status(200).send(response);

        }
        catch(err){
            console.log(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error fetching Earth Assets" });
        }
    }

}
export { EarthController };
