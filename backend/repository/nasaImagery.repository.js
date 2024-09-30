import axios from "axios";
import { InvalidEndpointException } from "../exceptions/api.exception.js";
import { strcutureResponse } from "../utils/common.utils.js";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

class NASAImageRepository {
    // Search the NASA image and video library
    async searchImages(query) {
        const url = `https://images-api.nasa.gov/search?q=${query}`;
        try {
            const response = await axios.get(url, { timeout: 30000 });
            return strcutureResponse(response.data, 1, "Success");
        } catch (err) {
            console.error("Error in fetching NASA images and videos", err);
            throw new InvalidEndpointException("Error in fetching NASA images and videos");
        }
    }

    // Get media asset by NASA ID
    async getAssetById(nasaId) {
        const url = `https://images-api.nasa.gov/asset/${nasaId}`;
        try {
            const response = await axios.get(url, { timeout: 30000 });
            return strcutureResponse(response.data, 1, "Success");
        } catch (err) {
            console.error("Error in fetching NASA media asset", err);
            throw new InvalidEndpointException("Error in fetching NASA media asset");
        }
    }

    // Get metadata for a specific media asset by NASA ID
    async getMetadataById(nasaId) {
        const url = `https://images-api.nasa.gov/metadata/${nasaId}`;
        try {
            const response = await axios.get(url, { timeout: 30000 });
            return strcutureResponse(response.data, 1, "Success");
        } catch (err) {
            console.error("Error in fetching metadata for NASA media asset", err);
            throw new InvalidEndpointException("Error in fetching metadata for NASA media asset");
        }
    }
}

export { NASAImageRepository };
