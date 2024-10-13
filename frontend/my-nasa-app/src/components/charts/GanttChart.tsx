import React from 'react';
import Plot from 'react-plotly.js';

interface GanttChartProps {
  flareEvents: { flrID: string; beginTime: string; peakTime: string; endTime: string }[];
}

export const GanttChart: React.FC<GanttChartProps> = ({ flareEvents }) => {
  const data = [
    {
      type: 'scatter',
      mode: 'markers+lines',
      x: flareEvents.map(event => [event.beginTime, event.peakTime, event.endTime]).flat(),
      y: flareEvents.map(event => [event.flrID, event.flrID, event.flrID]).flat(),
      line: { shape: 'linear', color: '#4a90e2' },
      marker: { color: '#ff4d4d' },
    }
  ];

  const layout = {
    title: "Solar Flares Duration (Begin, Peak, End)",
    xaxis: { title: 'Time' },
    yaxis: { title: 'Flare ID' },
    paper_bgcolor: 'black',
    plot_bgcolor: 'black',
    font: { color: 'white' },
    autosize: true, // Ensure the chart resizes
    responsive: true, // Make the chart responsive
  };

  return <Plot data={data} layout={layout} useResizeHandler style={{ width: '100%', height: '100%' }} />;
}
