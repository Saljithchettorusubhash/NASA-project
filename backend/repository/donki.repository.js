import axios from "axios";
import { InvalidEndpointException } from "../exceptions/api.exception.js";
import { strcutureResponse } from "../utils/common.utils.js";
import { Config } from "../Config/Config.js";

class DonkiRepository {
  async getCMEData(startDate, endDate) {
    const api_key = Config.NASA_API_KEY;
    let url = `https://api.nasa.gov/DONKI/CME?startDate=${startDate}&endDate=${endDate}&api_key=${api_key}`;
    try {
      const response = await axios.get(url);
      return strcutureResponse(response.data, 1, "Success");
    } catch (err) {
      throw new InvalidEndpointException("Error in fetching CME data");
    }
  }

  async getGST(startDate, endDate) {
    const api_key = Config.NASA_API_KEY;
    let url = `https://api.nasa.gov/DONKI/GST?api_key=${api_key}`;

    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;

    try {
      const response = await axios.get(url);
      return strcutureResponse(response.data, 1, "Success");
    } catch (err) {
      throw new InvalidEndpointException("Error in fetching GST data");
    }
  }

  async getIPS(startDate, endDate, location, catalog) {
    const api_key = Config.NASA_API_KEY;
    let url = `https://api.nasa.gov/DONKI/IPS?api_key=${api_key}`;
    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;
    if (location) url += `&location=${location}`;
    if (catalog) url += `&catalog=${catalog}`;

    try {
        const response = await axios.get(url);
        return strcutureResponse(response.data, 1, "Success");
    } catch (err) {
        console.error(`Error occurred during API call: ${err.response?.status} - ${err.response?.statusText}`);
        console.error(`Full error: `, err.response?.data);
        throw new InvalidEndpointException('Error in fetching IPS data');
    }
}


  async getFLR(startDate, endDate) {
    const api_key = Config.NASA_API_KEY;
    let url = `https://api.nasa.gov/DONKI/FLR?api_key=${api_key}`;
    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;

    try {
      const response = await axios.get(url);
      return strcutureResponse(response.data, 1, "Success");
    } catch (err) {
      throw new InvalidEndpointException("Error in fetching FLR data");
    }
  }

  async getSEP(startDate, endDate) {
    const api_key = Config.NASA_API_KEY;
    let url = `https://api.nasa.gov/DONKI/SEP?api_key=${api_key}`;
    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;

    try {
      const response = await axios.get(url);
      return strcutureResponse(response.data, 1, "Success");
    } catch (err) {
      throw new InvalidEndpointException("Error in fetching SEP data");
    }
  }

  async getMPC(startDate, endDate) {
    const api_key = Config.NASA_API_KEY;
    let url = `https://api.nasa.gov/DONKI/MPC?api_key=${api_key}`;
    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;

    try {
      const response = await axios.get(url);
      return strcutureResponse(response.data, 1, "Success");
    } catch (err) {
      throw new InvalidEndpointException("Error in fetching MPC data");
    }
  }
}
export { DonkiRepository };
