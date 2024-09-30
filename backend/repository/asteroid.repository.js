import axios from "axios";
import { InvalidEndpointException } from "../exceptions/api.exception.js";
import { strcutureResponse } from "../utils/common.utils.js";
import { Config } from "../Config/Config.js";

class asteroidRepository {
    async geAsteroidFeed(start_date, end_date) {

        const api_key = Config.NASA_API_KEY;

        const startDateObj = new Date(start_date);
        const endDateObj = new Date(end_date);
        const timeDiff = endDateObj - startDateObj;
        const daysDiff = timeDiff /(1000 * 60 * 60 * 24);
        
        if (daysDiff > 7) {
            throw new InvalidEndpointException('Date range should be within 7 days only');
        }

        let url = `https://api.nasa.gov/neo/rest/v1/feed?api_key=${api_key}`;
    
        if (start_date) url += `&start_date=${start_date}`;
        if (end_date) url += `&end_date=${end_date}`;
    
        try {
            const response = await axios.get(url);
            return strcutureResponse(response.data, 1, "Success");
    
        } catch (err) {
            console.log(`Error occurred during API call: ${err.response?.status} - ${err.response?.statusText}`);
            console.log(`Full error: `, err.response?.data);
            throw new InvalidEndpointException('Error in fetching Asteroid Feed');
        }
    }
    
    async getAsteroidById(asteroid_id) {
            const api_key = Config.NASA_API_KEY;
            let url = `https://api.nasa.gov/neo/rest/v1/neo/${asteroid_id}?api_key=${api_key}`;
            try{
                const response = await axios.get(url);
                return strcutureResponse(response.data, 1, "Success");
            }
            catch(err){
                console.log(`Error occurred during API call: ${err.response?.status} - ${err.response?.statusText}`);
                console.log(`Full error: `, err.response?.data);
                    throw new InvalidEndpointException('Error in fetching asteroid details');
            }
        }

        async browseAsteroids(page = 1, size = 20) {
            const api_key = Config.NASA_API_KEY;
            let url = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${api_key}&page=${page}&size=${size}`;

            try{
                const response = await axios.get(url);
                return strcutureResponse(response.data, 1, "Success");

            }
            catch(err){
                throw new InvalidEndpointException('Error in browsing asteroids');
            }


        }


}
export { asteroidRepository };