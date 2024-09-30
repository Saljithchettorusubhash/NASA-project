import axios from "axios";
import { InvalidEndpointException } from "../exceptions/api.exception.js";
import { strcutureResponse } from "../utils/common.utils.js";
import { Config } from "../Config/Config.js";

class MarsWeatherRepository {
  // Fetch the latest Mars weather data
  async getLatestWeather() {
    const api_key = Config.NASA_API_KEY;
    const url = `https://api.nasa.gov/insight_weather/?api_key=${api_key}&feedtype=json&ver=1.0`;
    
    try {
      const response = await axios.get(url, { timeout: 30000 });
      return strcutureResponse(response.data, 1, "Success");
    } catch (err) {
      throw new InvalidEndpointException("Error in fetching Mars weather data");
    }
  }

  // Fetch Mars weather data by sol (Martian day)
  async getWeatherBySol(sol) {
    const api_key = Config.NASA_API_KEY;
    const url = `https://api.nasa.gov/insight_weather/?api_key=${api_key}&feedtype=json&ver=1.0&sol=${sol}`;
    
    try {
      const response = await axios.get(url, { timeout: 30000 });
      return strcutureResponse(response.data, 1, "Success");
    } catch (err) {
      throw new InvalidEndpointException("Error in fetching Mars weather data by sol");
    }
  }
}

export { MarsWeatherRepository };
