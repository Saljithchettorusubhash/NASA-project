import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, AttributionControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Updated marker with a blue fill for better visibility
const LocationIconSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" fill="#007bff"/>
  </svg>
`;

interface EventLocation {
  lat: number;
  lng: number;
  type: string;
  details: string;
}

interface MapVisualizationProps {
  data: {
    cmeData: Array<{ latitude: number; longitude: number; speed: number }>;
    gstData: Array<{ latitude: number; longitude: number; kpIndex: number }>;
    flrData: any[];
    ipsData: any[];
    mpcData: any[];
    sepData: any[];
  };
}

const getIcon = () => {
  return L.divIcon({
    html: LocationIconSVG, // Use the updated SVG with a blue marker
    className: 'custom-svg-icon',
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40],
    shadowUrl: markerShadow,
  });
};

const MapVisualization: React.FC<MapVisualizationProps> = ({ data }) => {
  const eventLocations: EventLocation[] = data.cmeData.length || data.gstData.length
    ? [
        ...data.cmeData.map(cme => ({
          lat: cme.latitude || 0,
          lng: cme.longitude || 0,
          type: 'CME',
          details: `Speed: ${cme.speed} km/s`
        })),
        ...data.gstData.map(gst => ({
          lat: gst.latitude || 0,
          lng: gst.longitude || 0,
          type: 'GST',
          details: `KP Index: ${gst.kpIndex}`
        }))
      ]
    : [
        { lat: 51.505, lng: -0.09, type: 'CME', details: 'Fastest Speed: 500 km/s' },
        { lat: 48.8566, lng: 2.3522, type: 'GST', details: 'KP Index: 7' },
      ];

  return (
    <div className="rounded-lg shadow-lg overflow-hidden">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={false}
        dragging={false}
        style={{ height: '400px', width: '100%' }}
        className="rounded-lg shadow-md"
      >
        <AttributionControl position="bottomright" prefix={false} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {eventLocations.map((event, index) => (
          <Marker key={index} position={[event.lat, event.lng]} icon={getIcon()}>
            <Popup>
              <div>
                <strong>{event.type}</strong><br />
                {event.details}
              </div>
            </Popup>
            <Tooltip direction="top" offset={[0, -20]} opacity={1}>
              {event.type}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapVisualization;
