declare module 'react-plotly.js' {
    import { Component } from 'react';
  
    interface PlotParams {
      data: any[];
      layout: any;
      config?: any;
      frames?: any[];
      revision?: number;
      onInitialized?: (figure: any, graphDiv: HTMLElement) => void;
      onUpdate?: (figure: any, graphDiv: HTMLElement) => void;
      onPurge?: (graphDiv: HTMLElement) => void;
      onError?: (error: any) => void;
      useResizeHandler?: boolean;
      style?: React.CSSProperties;
      className?: string;
      divId?: string;
    }
  
    class Plot extends Component<PlotParams> {}
  
    export default Plot;
  }