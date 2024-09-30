import { NasaRepository } from "../repository/apod.repository.js";
class NasaController {
    constructor() {
    this.nasaRepository = new NasaRepository();
    }

    
    async getApod(req, res) {
        const { date, start_date, end_date, count, thumbs } = req.query || {};
        
        console.log("date", date, "start_date", start_date, "end_date", end_date, "count", count, "thumbs", thumbs);
    
        try {
            const response = await this.nasaRepository.getApod({
                date,
                start_date,
                end_date,
                count,
                thumbs
            });
            res.status(200).send(response);
        } catch (error) {
            console.log(`Error occurred: ${error.message}`);
            res.status(500).json({ message: "Error fetching APOD data" });
        }
    }

}
export { NasaController };