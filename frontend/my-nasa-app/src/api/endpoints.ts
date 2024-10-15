const BASE_URL = '/';

export const API_ENDPOINTS = {
    APOD: `${BASE_URL}apod`,
    NEO_FEED: `${BASE_URL}neo`,
};
export const MARS_ROVER_ENDPOINTS = {
  PHOTOS: `${BASE_URL}marsRover/photos/sol`,  // Updated to match backend route
  MANIFEST: `${BASE_URL}marsRover/manifest`,
}
export const EXO_PLANET_ENDPOINTS = {
    CONFIRMED: `${BASE_URL}exoplanets/confirmed`,
    HABITABLE: `${BASE_URL}exoplanets/habitable-zone`,
    HOST_STAR: `${BASE_URL}exoplanets/host-stars`,
    PLANETARY_CANDIDATES: `${BASE_URL}exoplanets/planetary-candidates`,
    TRANSIT_OR_VeLOCITY: `${BASE_URL}exoplanets/transit-rv-planets`,
    
}

export const DONKI_ENDPOINTS = {
  CME: `${BASE_URL}donki/cme`,
  GST: `${BASE_URL}donki/gst`,
  FLR: `${BASE_URL}donki/flr`,
  IPS: `${BASE_URL}donki/ips`,
  MPC: `${BASE_URL}donki/mpc`,
  SEP: `${BASE_URL}donki/sep`,
}

export const EPIC_ENDPOINTS = {
  EPIC_LATEST: `${BASE_URL}epic/latest`,
  EPIC_DATE: (date: string) => `${BASE_URL}epic/date/${date}`,
  EPIC_DATES: `${BASE_URL}epic/dates`,  
}

export const ASTEROID_ENDPOINTS = {
  FEED: `${BASE_URL}asteroid/feed`,
  BROWSE: (asteroidId: string) => `/asteroids/${asteroidId}/browse`,
};



export const NASA_IMAGE_ENDPOINTS = {
  IMAGEANDVIDEO_SEARCH: (query: string) => `${BASE_URL}nasaImage/search/${query}`,
  MEDIA_ASSET_ID: (nasaId: string) => `${BASE_URL}nasaImage/asset/${nasaId}`,
  META_DATA_ID: (nasaId: string) => `${BASE_URL}nasaImage/metadata/${nasaId}`,
};
  
  export const NEO_ENDPOINTS = {
    FEED: `${BASE_URL}neo/feed`,
    LOOKUP: `${BASE_URL}neo/lookup`,
  };