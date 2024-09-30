import axios  from "axios";
import { InvalidEndpointException } from "../exceptions/api.exception.js";
import { strcutureResponse } from "../utils/common.utils.js";
import { Config } from "../Config/Config.js";

class EarthImageryRepository {
    async getImagery({lat, lon, date, dim, cloud_score}) {
        const api_key = Config.NASA_API_KEY;
        let url = `https://api.nasa.gov/planetary/earth/imagery?lat=${lat}&lon=${lon}&api_key=${api_key}`;
        if (dim) url += `&dim=${dim}`;
        if (date) url += `&date=${date}`;
        if (cloud_score) url += `&cloud_score=${cloud_score}`;

        try{
            const response = await axios.get(url);
            return strcutureResponse(response.data, 1, "Success");
        }
        catch(err){
            throw new InvalidEndpointException('Error in fetching Earth Imagery');
        }
    }


    async getAssets({lat, lon, date, dim, cloud_score}) {
        const api_key = Config.NASA_API_KEY;
        let url = `https://api.nasa.gov/planetary/earth/assets?lat=${lat}&lon=${lon}&api_key=${api_key}`;
        
        if (dim) url += `&dim=${dim}`;
        if (date) url += `&date=${date}`;
        if (cloud_score) url += `&cloud_score=${cloud_score}`; 
        
        try {
            const response = await axios.get(url);
            return strcutureResponse(response.data, 1, "Success");
        } catch (err) {
            throw new InvalidEndpointException('Error in fetching Earth Assets');
        }
    }

}

export { EarthImageryRepository };