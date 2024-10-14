import axios from "axios";
import { InvalidEndpointException } from "../exceptions/api.exception.js";
import { strcutureResponse } from "../utils/common.utils.js";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

class EPICRepository {
    // Fetch the latest available images from EPIC with pagination
    async getLatestImages(page, limit) {
        const url = `https://epic.gsfc.nasa.gov/api/natural`;
        try {
            const response = await axios.get(url, { timeout: 30000 });
            // Implement pagination manually by slicing the result based on page and limit
            const paginatedData = response.data.slice((page - 1) * limit, page * limit);
            return strcutureResponse(paginatedData, 1, "Success");
        } catch (err) {
            console.error("Error in fetching the latest EPIC images", err);
            throw new InvalidEndpointException("Error in fetching the latest EPIC images");
        }
    }

    // Fetch images by date with pagination
    async getImagesByDate(date, page, limit) {
        const url = `https://epic.gsfc.nasa.gov/api/natural/date/${date}`;
        try {
            const response = await axios.get(url, { timeout: 30000 });
            // Implement pagination manually by slicing the result based on page and limit
            const paginatedData = response.data.slice((page - 1) * limit, page * limit);
            return strcutureResponse(paginatedData, 1, "Success");
        } catch (err) {
            console.error("Error in fetching EPIC images by date", err);
            throw new InvalidEndpointException("Error in fetching EPIC images by date");
        }
    }

    // Fetch available dates for images (no need for pagination here)
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
