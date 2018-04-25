import React from 'react';

const GreenArrow = (props) => {
  return (<svg onMouseDown={props.onMouseDown} onMouseUp={props.onMouseUp} xmlns="http://www.w3.org/2000/svg" version="1.1" width={26} height={68} style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}} {...props}>
<rect id="backgroundrect" width="100%" height="100%" x={0} y={0} fill="none" stroke="none" style={{}} />
    <desc style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}>Created with Raphaël</desc>
    <defs style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}} />
    <g className="currentLayer" style={{}}>
        <title>Layer 1</title>
        <path fill="#9ed343" stroke="none" d="M16.992623448371894,54.94375985103841 L22.655887229859836,54.94375985103841 L11.65882775485516,67.73165303057426 L2.6645352591003757e-15,54.94375985103841 L5.666095885396009,54.94375985103841 A269.75789724290456,269.75789724290456 0 0 1 9.47149950319529,11.560648152708978 L3.871486042320729,10.568467750251273 L17.58075702661276,-1.4210854715202004e-14 L26.196961149573323,14.497539905369266 L20.62243662387132,13.500639329731428 A269.75789724290456,269.75789724290456 0 0 0 16.992623448371884,54.943759851038436 z" transform="rotate(-3.640275716781616 13.098481178283937,33.86583328247072) " id="svg_1" style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', cursor: 'move'}} />
    </g>
    </svg>)
};

export default GreenArrow;