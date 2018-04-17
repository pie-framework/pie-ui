import React from 'react';

const Tick = ({mvX, mvY, lineX, lineY, strokeWidth, stroke}) => {
  let d = `M${mvX},${mvY} L${lineX},${lineY}`;
  return (
    <path fill="none" stroke={stroke} d={d} strokeWidth={strokeWidth} />    
  );
}

export default Tick;