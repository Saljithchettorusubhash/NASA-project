import axios from "axios";
import { InvalidEndpointException } from "../exceptions/api.exception.js";
import { strcutureResponse } from "../utils/common.utils.js";

class ExoplanetRepository {
    async getConfirmedExoplanets({ limit = 10, offset = 0, discoveryMethod, year }) {
        let query = `SELECT * FROM (SELECT a.*, ROWNUM rnum FROM pscomppars a WHERE 1=1`;

        // Append filters if available
        if (discoveryMethod) {
            query += ` AND a.discoverymethod = '${discoveryMethod}'`;
        }
        if (year) {
            query += ` AND a.disc_year = ${year}`;
        }

        query += ` AND ROWNUM <= ${offset + limit}) WHERE rnum > ${offset}`;
        const url = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${encodeURIComponent(query)}&format=json`;

        try {
            const response = await axios.get(url, { timeout: 30000 });
            return strcutureResponse(response.data, 1, "Success");
        } catch (err) {
            console.log('Error:', err.response ? err.response.data : err.message);
            throw new InvalidEndpointException("Error in fetching confirmed exoplanets");
        }
    }
    // Fetch planets in the habitable zone using the TAP API and correct table 'cumulative'
    async getHabitableZonePlanets({ limit = 10, offset = 0 }) {
        const query = `SELECT * FROM (SELECT a.*, ROWNUM rnum FROM cumulative a 
                      WHERE koi_teq > 180 AND koi_teq < 303 AND ROWNUM <= ${offset + limit}) 
                      WHERE rnum > ${offset}`;
    
        const url = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${encodeURIComponent(query)}&format=json`;
        
        try {
            const response = await axios.get(url, { timeout: 30000 });
            return strcutureResponse(response.data, 1, "Success");
        } catch (err) {
            console.error('Error fetching habitable zone planets:', err.message);
            throw new InvalidEndpointException("Error in fetching habitable zone planets");
        }
    }
    

    // Fetch host stars using the TAP API and correct table 'ps'
    async getHostStars() {
        const url = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+distinct+hostname+from+ps+order+by+hostname+asc&format=json`;
        try {
            const response = await axios.get(url);
            return strcutureResponse(response.data, 1, "Success");
        } catch (err) { 
            throw new InvalidEndpointException("Error in fetching host stars");
        }
    }

    // Fetch planetary candidates using the TAP API and correct table 'cumulative'
    async getPlanetaryCandidates() {
        const url = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+cumulative+where+koi_prad<2+and+koi_teq>180+and+koi_teq<303+and+koi_disposition+like+'CANDIDATE'&format=json`;
        try {
            const response = await axios.get(url);
            return strcutureResponse(response.data, 1, "Success");
        } catch (err) {
            throw new InvalidEndpointException("Error in fetching planetary candidates");
        }
    }

    // Fetch planets discovered by transit or radial velocity using the TAP API and correct table 'ps'
    async getTransitOrRVPlanets(limit = 10) {
        const url = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+TOP+${limit}+*+from+ps+where+tran_flag=1+or+rv_flag=1&format=json`;
        try {
            const response = await axios.get(url, { timeout: 30000 });
            return strcutureResponse(response.data, 1, "Success");
        } catch (err) {
            console.log('Error:', err.response ? err.response.data : err.message);
            throw new InvalidEndpointException("Error in fetching transit or RV planets");
        }
    }
    
    
}

export { ExoplanetRepository };
