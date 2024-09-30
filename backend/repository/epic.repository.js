import axios from "axios";
import { InvalidEndpointException } from "../exceptions/api.exception.js";
import { strcutureResponse } from "../utils/common.utils.js";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

class EPICRepository {
    // Fetch the latest available images from EPIC
    async getLatestImages() {
        const url = `https://epic.gsfc.nasa.gov/api/natural`;
        try {
            const response = await axios.get(url, { timeout: 30000 });
            return strcutureResponse(response.data, 1, "Success");
        } catch (err) {
            console.error("Error in fetching the latest EPIC images", err);
            throw new InvalidEndpointException("Error in fetching the latest EPIC images");
        }
    }

    // Fetch images by date
    async getImagesByDate(date) {
        const url = `https://epic.gsfc.nasa.gov/api/natural/date/${date}`;
        try {
            const response = await axios.get(url, { timeout: 30000 });
            return strcutureResponse(response.data, 1, "Success");
        } catch (err) {
            console.error("Error in fetching EPIC images by date", err);
            throw new InvalidEndpointException("Error in fetching EPIC images by date");
        }
    }

    // Fetch available dates for images
    async getAvailableDates() {
        const url = `https://epic.gsfc.nasa.gov/api/natural/all`;
        try {
            const response = await axios.get(url, { timeout: 30000 });
            return strcutureResponse(response.data, 1, "Success");
        } catch (err) {
            console.error("Error in fetching available dates from EPIC API", err);
            throw new InvalidEndpointException("Error in fetching available dates");
        }
    }
}

export { EPICRepository };
