import axios from "axios";
import { InvalidEndpointException } from "../exceptions/api.exception.js";
import { strcutureResponse } from "../utils/common.utils.js";
import { Config } from "../Config/Config.js";

class MarsRoverRepository {
  async getPhotosBySol(rover_name, sol, camera, page = 1) {
    const api_key = Config.NASA_API_KEY;
    let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover_name}/photos?sol=${sol}&page=${page}&api_key=${api_key}`;
    if (camera) url += `&camera=${camera}`;
    try {
      const response = await axios.get(url);
      return strcutureResponse(response.data, 1, "Success");
    } catch (err) {
      console.log(err);

      throw new InvalidEndpointException("Error in fetching Mars Rover Photos");
    }
  }
  async getPhotosByEarthDate(rover_name, earth_date, camera, page = 1) {
    const api_key = Config.NASA_API_KEY;
    let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover_name}/photos?earth_date=${earth_date}&page=${page}&api_key=${api_key}`;
    if (camera) url += `&camera=${camera}`;

    try {
      const response = await axios.get(url);
      return strcutureResponse(response.data, 1, "Success");
    } catch (err) {
      console.log(err);

      throw new InvalidEndpointException("Error in fetching Mars Rover Photos");
    }
  }

  async getRoverManifest(rover_name) {
    const api_key = Config.NASA_API_KEY;
    const url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover_name}?api_key=${api_key}`;

    try {
      const response = await axios.get(url);
      return strcutureResponse(response.data, 1, "Success");
    } catch (err) {
      console.log(err);
      throw new InvalidEndpointException(
        "Error in fetching Mars Rover Manifest"
      );
    }
  }
}
export { MarsRoverRepository };
