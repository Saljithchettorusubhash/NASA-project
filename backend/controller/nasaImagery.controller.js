import { NASAImageRepository } from "../repository/nasaImagery.repository.js"; 
// Ensure axios is imported
import axios from "axios"; // <--- Add this line

class NASAImageController {
    constructor() {
        this.nasaImageRepository = new NASAImageRepository();
    }

    // Search the NASA image and video library
    async searchImages(req, res) {
        const { query } = req.params;
        try {
            const response = await this.nasaImageRepository.searchImages(query);
            res.status(200).send(response);
        } catch (err) {
            console.log(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error fetching NASA images and videos" });
        }
    }

    // Get media asset by NASA ID
    async getAssetById(req, res) {
        const { nasaId } = req.params;
        try {
            const response = await this.nasaImageRepository.getAssetById(nasaId);
            res.status(200).send(response);
        } catch (err) {
            console.log(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error fetching NASA media asset" });
        }
    }

    // Get metadata by NASA ID
    async getMetadataById(req, res) {
        const { nasaId } = req.params;
        try {
            const response = await this.nasaImageRepository.getMetadataById(nasaId);
            res.status(200).send(response);
        } catch (err) {
            console.log(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error fetching metadata for NASA media asset" });
        }
    }
}

export { NASAImageController };
