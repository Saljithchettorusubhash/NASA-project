import React from 'react';
import EventSummaryCard from '../../common/Card/EventSummaryCard';
import useDonkiData from '../../../hooks/DONKI/useDonki';
import MapVisualization from '../MapVisualization/Mapvisulization';
import { format, addDays } from 'date-fns';

const DonkiDashboard: React.FC = () => {
  const startDate = format(new Date(), 'yyyy-MM-dd'); // Today's date
  const endDate = format(addDays(new Date(), 7), 'yyyy-MM-dd'); // One week from today

  // Fetch data for each DONKI event type
  const { data: cmeData = [] } = useDonkiData(startDate, endDate, 'cmeData');
  const { data: gstData = [] } = useDonkiData(startDate, endDate, 'gstData');
  const { data: flrData = [] } = useDonkiData(startDate, endDate, 'flrData');
  const { data: ipsData = [] } = useDonkiData(startDate, endDate, 'ipsData');
  const { data: mpcData = [] } = useDonkiData(startDate, endDate, 'mpcData');
  const { data: sepData = [] } = useDonkiData(startDate, endDate, 'sepData');

  // Dummy fallback data for each event type
  const dummyCmeData = [{ latitude: 51.505, longitude: -0.09, speed: 500 }];
  const dummyGstData = [{ latitude: 48.8566, longitude: 2.3522, kpIndex: 7 }];
  const dummyFlrData = [{ classType: 'X1.0' }];
  const dummyIpsData = [{ intensity: 10 }];
  const dummyMpcData = [{ distance: 5 }];
  const dummySepData = [{ energy: 300 }];

  // Ensure correct data structure for each event type
  const eventData = {
    cmeData: (cmeData.length > 0 ? cmeData : dummyCmeData).map((cme) => ({
      latitude: cme.latitude,
      longitude: cme.longitude,
      speed: cme.speed || 0,
    })),
    gstData: (gstData.length > 0 ? gstData : dummyGstData).map((gst) => ({
      latitude: gst.latitude,
      longitude: gst.longitude,
      kpIndex: gst.kpIndex || 0,
    })),
    flrData: flrData.length > 0 ? flrData : dummyFlrData,
    ipsData: ipsData.length > 0 ? ipsData : dummyIpsData,
    mpcData: mpcData.length > 0 ? mpcData : dummyMpcData,
    sepData: sepData.length > 0 ? sepData : dummySepData,
  };

  return (
    <div className="p-4 lg:p-8">
      <h1 className="text-3xl lg:text-4xl text-center mb-8 font-extrabold text-gradient">
        Space Weather Events
      </h1>

      <div className="text-center mb-6">
        <p className="text-lg lg:text-xl font-semibold text-gray-300">
          Date Range: {startDate} to {endDate}
        </p>
      </div>

      {/* Map Visualization */}
      <div className="mb-8">
        <MapVisualization data={eventData} />
      </div>

      {/* Event Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
        <EventSummaryCard
          title="Coronal Mass Ejections (CMEs)"
          totalEvents={eventData.cmeData.length}
          strongestMetric={`Fastest Speed: ${Math.max(...eventData.cmeData.map((cme) => cme.speed || 0), 0)} km/s`}
          onClick={() => {}}
        />
        <EventSummaryCard
          title="Geomagnetic Storms (GSTs)"
          totalEvents={eventData.gstData.length}
          strongestMetric={`Highest KP Index: ${Math.max(...eventData.gstData.map((gst) => gst.kpIndex || 0), 0)}`}
          onClick={() => {}}
        />
        <EventSummaryCard
          title="Solar Flares (FLRs)"
          totalEvents={eventData.flrData.length}
          strongestMetric={`Strongest Class: ${eventData.flrData.reduce((max, flare) => flare.classType > max ? flare.classType : max, 'C1.0')}`}
          onClick={() => {}}
        />
        <EventSummaryCard
          title="Interplanetary Shocks (IPS)"
          totalEvents={eventData.ipsData.length}
          strongestMetric={`Most Intense Shock: ${Math.max(...eventData.ipsData.map((ips) => ips.intensity || 0), 0)} nT`}
          onClick={() => {}}
        />
        <EventSummaryCard
          title="Magnetopause Crossings (MPCs)"
          totalEvents={eventData.mpcData.length}
          strongestMetric={`Most Extreme Distance: ${Math.max(...eventData.mpcData.map((mpc) => mpc.distance || 0), 0)} Re`}
          onClick={() => {}}
        />
        <EventSummaryCard
          title="Solar Energetic Particles (SEPs)"
          totalEvents={eventData.sepData.length}
          strongestMetric={`Highest Energy: ${Math.max(...eventData.sepData.map((sep) => sep.energy || 0), 0)} MeV`}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default DonkiDashboard;
