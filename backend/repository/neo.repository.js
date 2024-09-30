import axios from "axios";
import { InvalidEndpointException } from "../exceptions/api.exception.js";
import { strcutureResponse } from "../utils/common.utils.js";
import { Config } from "../Config/Config.js";
import moment from "moment"; 

class NeoWsRepository {
  // Fetch NEOs for a given date range

  createDateRanges(startDate, endDate) {
    const ranges = [];
    let currentStart = moment(startDate);
    const finalEnd = moment(endDate);

    while (currentStart.isBefore(finalEnd)) {
      let currentEnd = moment.min(currentStart.clone().add(7, 'days'), finalEnd);
      ranges.push({ start: currentStart.format('YYYY-MM-DD'), end: currentEnd.format('YYYY-MM-DD') });
      currentStart = currentEnd.add(1, 'days');
    }

    return ranges;
  }

  async getNEOsByDateRange(startDate, endDate) {
    const api_key = Config.NASA_API_KEY;
    const dateRanges = this.createDateRanges(startDate, endDate);

    try {
      let allResults = [];
      
      for (const range of dateRanges) {
        const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${range.start}&end_date=${range.end}&api_key=${api_key}`;
        const response = await axios.get(url, { timeout: 30000 });
        const formattedResponse = strcutureResponse(response.data, 1, "Success");

        allResults.push(formattedResponse.body); // Assuming strcutureResponse has a 'body' attribute
      }

      // Combine all results into one response
      const combinedResults = { headers: { success: 1, code: 200, message: "Success" }, body: allResults.flat() };
      return combinedResults;

    } catch (err) {
      console.error("Error in fetching NEOs by date range", err);
      throw new InvalidEndpointException("Error in fetching NEOs by date range");
    }
  }

  // Fetch NEO details by ID
  async getNeoById(neoId) {
    const api_key = Config.NASA_API_KEY;
    const url = `https://api.nasa.gov/neo/rest/v1/neo/${neoId}?api_key=${api_key}`;

    try {
      const response = await axios.get(url, { timeout: 30000 });
      return strcutureResponse(response.data, 1, "Success");
    } catch (err) {
      throw new InvalidEndpointException("Error in fetching NEO details");
    }
  }

  // Fetch NEOs today
  async getTodayNEOs() {
    const api_key = Config.NASA_API_KEY;
    const url = `https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=${api_key}`;

    try {
      const response = await axios.get(url, { timeout: 30000 });
      return strcutureResponse(response.data, 1, "Success");
    } catch (err) {
      throw new InvalidEndpointException("Error in fetching today's NEOs");
    }
  }
}

export { NeoWsRepository };
