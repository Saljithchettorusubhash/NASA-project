import React from 'react';
import Plot from 'react-plotly.js';

interface GuageChartProps {
  kpIndex: number;
}

const GuageChart: React.FC<GuageChartProps> = ({ kpIndex }) => {
  const normalizedValue = kpIndex;

  return (
    <div
      className="w-full"
      style={{
        maxWidth: '500px', // Max width for larger screens
        minWidth: '200px', // Min width for smaller screens
        height: 'auto',
        margin: 'auto', // Centering the chart
      }}
    >
      <Plot
        data={[
          {
            type: 'indicator',
            mode: 'gauge+number',
            value: normalizedValue,
            title: { text: 'KP Index', font: { size: 20, color: 'white' } }, // Reduce font size for smaller screens
            gauge: {
              axis: { range: [null, 9], tickwidth: 1, tickcolor: 'darkblue' },
              bar: { color: 'darkblue' },
              borderwidth: 2,
              bordercolor: 'gray',
              steps: [
                { range: [0, 3], color: 'green' },
                { range: [3, 6], color: 'yellow' },
                { range: [6, 9], color: 'red' },
              ],
              threshold: {
                line: { color: 'red', width: 4 },
                thickness: 0.75,
                value: normalizedValue,
              },
            },
          },
        ]}
        layout={{
          autosize: true, // Let Plotly auto adjust size
          margin: { t: 40, r: 20, l: 20, b: 20 }, // Adjust margins to prevent clipping
          paper_bgcolor: 'transparent',
          font: { color: 'white', family: 'Arial' },
        }}
        useResizeHandler={true} // Ensure resizing on window size change
        style={{ width: '100%', height: '100%' }} // Responsive style
        config={{ displayModeBar: false }} // Disable the Plotly toolbar
      />
    </div>
  );
};

export default GuageChart;
