import axios from "axios";
import axiosRetry from "axios-retry";
import { InvalidEndpointException } from "../exceptions/api.exception.js";
import { strcutureResponse } from "../utils/common.utils.js";

axiosRetry(axios,{retries: 5,
    retryDelay:(retryCount)=>{
        return retryCount * 1000;
    },
shouldResetTimeout:true});

class EONETRepository {
    // Fetch all events from EONET API
    async getEvents() {
        const url = `https://eonet.gsfc.nasa.gov/api/v3/events`;
        try {
            const response = await axios.get(url, { timeout: 20000 });
            return strcutureResponse(response.data, 1, "Success");
        } catch (err) {
            console.error("Error in fetching events from EONET API", err);
            throw new InvalidEndpointException("Error in fetching events");
        }
    }

    // Fetch a specific event by ID
    async getEventById(eventId) {
        const url = `https://eonet.gsfc.nasa.gov/api/v3/events/${eventId}?limit=1`;
        try {
            const response = await axios.get(url, { timeout: 30000 });
            return strcutureResponse(response.data, 1, "Success");
        } catch (err) {
            if(err.response && err.response.status === 500) {
                console.log("server error while fetching event by ID",err);
                throw new InvalidEndpointException("Error in fetching event by ID");
            }
            else {
                console.log("Error in fetching event by ID",err);
                throw new InvalidEndpointException("Error in fetching event by ID");
            }


        }
    }
}

export { EONETRepository };
