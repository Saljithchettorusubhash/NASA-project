import { apiClient } from "./apiClient";
import { API_ENDPOINTS, DONKI_ENDPOINTS, EPIC_ENDPOINTS, EXO_PLANET_ENDPOINTS, MARS_ROVER_ENDPOINTS, NASA_IMAGE_ENDPOINTS } from "./endpoints";
import { fetchRetry } from '../utils/fetchRetry'; // Import fetchRetry for retry logic

export const fetchAstronomyPictureOfTheDay = async (params: { date?: string, start_date?: string, end_date?: string, count?: number, thumbs?: boolean }): Promise<any> => {
  try {
    const response = await fetchRetry(() => apiClient.get(API_ENDPOINTS.APOD, { params }));
    console.log('APOD Response:', response);
    return response.data.body;
  } catch (error) {
    console.error('Error fetching APOD:', error);
    throw new Error('Error fetching APOD');
  }
};

export const fetchMarsRoverPhotosByEarthDate = async ({ rover_name, sol, camera, page = 1 }: { rover_name: string, sol: number, camera?: string, page?: number }) => {
  try {
    const response = await fetchRetry(() => apiClient.get(MARS_ROVER_ENDPOINTS.PHOTOS, { params: { rover_name, sol, camera, page } }));
    console.log('Mars Rover Photos Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching Mars Rover Photos:', error);
    throw new Error('Error fetching Mars Rover Photos');
  }
};

export const exoPlanetConfirmed = async (limit = 10, offset = 0, filter = {}) => {
  try {
    const response = await fetchRetry(() => apiClient.get(EXO_PLANET_ENDPOINTS.CONFIRMED, {
      params: { limit, offset, ...filter },
    }));
    return response.data.body;
  } catch (error) {
    console.error('Error fetching Exo Planet Confirmed:', error);
    throw new Error('Error fetching Exo Planet Confirmed');
  }
};

export const exoPlanetHabitable = async ({ limit = 10, offset = 0 }) => {
  try {
    const response = await fetchRetry(() => apiClient.get(EXO_PLANET_ENDPOINTS.HABITABLE, {
      params: { limit, offset },
    }));
    console.log('Exo Planet Habitable Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching Exo Planet Habitable:', error);
    throw new Error('Error fetching Exo Planet Habitable');
  }
};

export const exoPlanetHostStars = async () => {
  try {
    const response = await fetchRetry(() => apiClient.get(EXO_PLANET_ENDPOINTS.HOST_STAR));
    console.log('Exo Planet Host Stars Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching Exo Planet Host Stars:', error);
    throw new Error('Error fetching Exo Planet Host Stars');
  }
};

export const exoPlanetPlanetaryCandidates = async () => {
  try {
    const response = await fetchRetry(() => apiClient.get(EXO_PLANET_ENDPOINTS.PLANETARY_CANDIDATES));
    console.log('Exo Planet Planetary Candidates Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching Exo Planet Planetary Candidates:', error);
    throw new Error('Error fetching Exo Planet Planetary Candidates');
  }
};

export const exoPlanetTransitOrVelocity = async () => {
  try {
    const response = await fetchRetry(() => apiClient.get(EXO_PLANET_ENDPOINTS.TRANSIT_OR_VeLOCITY));
    console.log('Exo Planet Transit or Velocity Response:', response);
    return response.data.body;
  } catch (error) {
    console.error('Error fetching Exo Planet Transit or Velocity:', error);
    throw new Error('Error fetching Exo Planet Transit or Velocity');
  }
};

export const fetchCMEData = async (startDate: string, endDate: string) => {
  try {
    const response = await fetchRetry(() => apiClient.get(DONKI_ENDPOINTS.CME, {
      params: { startDate, endDate },
    }));
    console.log('CME Data Response:', response);
    return response.data.body;
  } catch (error) {
    console.error('Error fetching CME Data:', error);
    throw new Error('Error fetching CME Data');
  }
};

export const fetchGSTData = async (startDate: string, endDate: string) => {
  try {
    const response = await fetchRetry(() => apiClient.get(DONKI_ENDPOINTS.GST, {
      params: { startDate, endDate },
    }));
    console.log('GST Data Response:', response);
    return response.data.body;
  } catch (error) {
    console.error('Error fetching GST Data:', error);
    throw new Error('Error fetching GST Data');
  }
};

export const fetchFLRData = async (startDate: string, endDate: string) => {
  try {
    const response = await fetchRetry(() => apiClient.get(DONKI_ENDPOINTS.FLR, {
      params: { startDate, endDate },
    }));
    console.log('FLR Data Response:', response);
    return response.data.body;
  } catch (error) {
    console.error('Error fetching FLR Data:', error);
    throw new Error('Error fetching FLR Data');
  }
};

export const fetchIPSData = async (startDate: string, endDate: string, location: string, catalog: 'ALL') => {
  try {
    const response = await fetchRetry(() => apiClient.get(DONKI_ENDPOINTS.IPS, {
      params: { startDate, endDate, location, catalog },
    }));
    console.log('IPS Data Response:', response);
    return response.data.body;
  } catch (error) {
    console.error('Error fetching IPS Data:', error);
    throw new Error('Error fetching IPS Data');
  }
};

export const fetchMPCData = async (startDate: string, endDate: string) => {
  try {
    const response = await fetchRetry(() => apiClient.get(DONKI_ENDPOINTS.MPC, {
      params: { startDate, endDate },
    }));
    console.log('MPC Data Response:', response);
    return response.data.body;
  } catch (error) {
    console.error('Error fetching MPC Data:', error);
    throw new Error('Error fetching MPC Data');
  }
};

export const fetchSEPData = async (startDate: string, endDate: string) => {
  try {
    const response = await fetchRetry(() => apiClient.get(DONKI_ENDPOINTS.SEP, {
      params: { startDate, endDate },
    }));
    console.log('SEP Data Response:', response);
    return response.data.body;
  } catch (error) {
    console.error('Error fetching SEP Data:', error);
    throw new Error('Error fetching SEP Data');
  }
};

export const fetchNasaImage = async (query: string): Promise<any> => {
  try {
    const response = await fetchRetry(() => apiClient.get(NASA_IMAGE_ENDPOINTS.IMAGEANDVIDEO_SEARCH(query)));
    console.log('NASA Image Response:', response);
    return response;
  } catch (error) {
    console.error('Error fetching NASA Image:', error);
    throw new Error('Error fetching NASA Image');
  }
};

export const fetchAssetBYId = async (nasaId: string): Promise<any> => {
  try {
    const response = await fetchRetry(() => apiClient.get(NASA_IMAGE_ENDPOINTS.MEDIA_ASSET_ID(nasaId)));
    console.log('NASA Asset Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching NASA Asset:', error);
    throw new Error('Error fetching NASA Asset');
  }
};

export const fetchMetaDataById = async (nasaId: string): Promise<any> => {
  try {
    const response = await fetchRetry(() => apiClient.get(NASA_IMAGE_ENDPOINTS.META_DATA_ID(nasaId)));
    console.log('NASA Meta Data Response:', response);
    return response.data.body;
  } catch (error) {
    console.error('Error fetching NASA Meta Data:', error);
    throw new Error('Error fetching NASA Meta Data');
  }
};

export const fetchLatestEpicImages = async (page = 1, limit = 10): Promise<any> => {
  try {
    const response = await fetchRetry(() => apiClient.get(EPIC_ENDPOINTS.EPIC_LATEST, {
      params: { page, limit },  // Add pagination parameters
    }));
    console.log('Latest EPIC Images Response:', response);
    return response.data.body;
  } catch (error) {
    console.error('Error fetching latest EPIC images:', error);
    throw new Error('Error fetching latest EPIC images');
  }
};

export const fetchEpicImagesByDate = async (date: string, page = 1, limit = 10): Promise<any> => {
  try {
    const response = await fetchRetry(() => apiClient.get(EPIC_ENDPOINTS.EPIC_DATE(date), {
      params: { page, limit },  // Add pagination parameters
    }));
    console.log(`EPIC Images for date ${date}:`, response);
    return response.data.body;
  } catch (error) {
    console.error(`Error fetching EPIC images for date ${date}:`, error);
    throw new Error('Error fetching EPIC images by date');
  }
};

export const fetchEpicAvailableDates = async (): Promise<any> => {
  try {
    const response = await fetchRetry(() => apiClient.get(EPIC_ENDPOINTS.EPIC_DATES));
    console.log('EPIC Available Dates:', response);
    return response.data.body;
  } catch (error) {
    console.error('Error fetching EPIC available dates:', error);
    throw new Error('Error fetching EPIC available dates');
  }
};
