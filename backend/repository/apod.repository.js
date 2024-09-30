import axios from "axios";
import { InvalidEndpointException } from "../exceptions/api.exception.js";
import { strcutureResponse } from "../utils/common.utils.js";
import { Config } from "../Config/Config.js";
 
class NasaRepository {
    async getApod({date, start_date, end_date, count, thumbs}) {
        const api_key = Config.NASA_API_KEY;
        let url = `https://api.nasa.gov/planetary/apod?api_key=${api_key}`;
        
        if (date) url += `&date=${date}`;
        if (start_date && end_date) url += `&start_date=${start_date}&end_date=${end_date}`;
        if (count) url += `&count=${count}`;
        if (thumbs) url += `&thumbs=${thumbs}`;
        


            try {
                const response = await axios.get(url);
                return strcutureResponse(response.data, 1, "Success");  
            } catch (err) {
                throw new InvalidEndpointException('Error in fetching APOD');
            }
        }
   
}

export { NasaRepository };