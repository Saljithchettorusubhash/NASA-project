import { MarsRoverRepository } from "../repository/marsRover.repository.js";

class  MarsRoverController {
    constructor() {
        this.marsRoverRepository = new MarsRoverRepository();

    }
    async getPhotosBySol(req,res) {
        const {rover_name, sol, camera,page} = req.query || {};
       
        if (!rover_name || rover_name === 'undefined') {
            return res.status(400).json({ message: 'Invalid Rover Name' });
          }




        try {
            const response = await this.marsRoverRepository.getPhotosBySol(rover_name,sol,camera,page);
            res.status(200).send(response);

        }
        catch(err){
            console.log(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error fetching Mars Rover Photos" });
        }
    }

    async getPhotosByEarthDate(req,res) {
        const {rover_name, earth_date, camera, page} = req.query || {};
        try {
            const response = await this.marsRoverRepository.getPhotosByEarthDate(rover_name,earth_date,camera,page);
            res.status(200).send(response);
        }
        catch(err){
            console.log(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error fetching Mars Rover Photos" });
        }
    }

    async getRoverManifest(req,res) {
        const {rover_name} = req.params || {};
        try {
            const response = await this.marsRoverRepository.getRoverManifest(rover_name);
            res.status(200).send(response);
        }
        catch(err){
            console.log(`Error occurred: ${err.message}`);
            res.status(500).json({ message: "Error fetching Mars Rover Manifest" });
        }
    }


    }
export { MarsRoverController };
