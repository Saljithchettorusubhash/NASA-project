import React from 'react';
import Plot from 'react-plotly.js';

interface HeatMapProps {
  flareData: { time: string; classType: string; intensity: number }[];
}

const HeatMap: React.FC<HeatMapProps> = ({ flareData }) => {
  const data = [
    {
      z: flareData.map(flare => flare.intensity),
      x: flareData.map(flare => flare.time),
      y: flareData.map(flare => flare.classType),
      type: 'heatmap',
      colorscale: 'Viridis',
    }
  ];

  const layout = {
    title: "Solar Flare Intensity Heatmap",
    xaxis: { title: 'Time' },
    yaxis: { title: 'Class Type' },
    paper_bgcolor: 'black',
    plot_bgcolor: 'black',
    font: { color: 'white' },
    autosize: true, // Ensure the chart resizes
    responsive: true, // Make the chart responsive
  };

  return <Plot data={data} layout={layout} useResizeHandler style={{ width: '100%', height: '100%' }} />;
};

export default HeatMap;
