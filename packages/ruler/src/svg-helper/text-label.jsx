import React from 'react';

const TextLabel = ({textX, textY, tspanX, tspanY, label}) => (
    <text x={textX} y={textY} textAnchor="middle" stroke="none" fill="#000000" id="svg_4" style={{fontSize: "11px"}}>
      <tspan id="svg_5" x={tspanX} y={tspanY}>{label}</tspan>
    </text>    
  );

export default TextLabel;