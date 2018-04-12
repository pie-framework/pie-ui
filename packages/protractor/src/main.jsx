import React from 'react';
import proImage from '../public/protractor.png';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: '0px', left: '0px', zIndex: '3', transform: 'rotate(0deg)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="37.68421050980477" height="68.42105254902413" style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}><rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none" className=""/><desc style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}>Created with Raphaël</desc><defs style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}/><g className="currentLayer"><title>Layer 1</title><path fill="#9ed343" stroke="none" d="M11.421054371954,102.27994433862631 L17.420054371953995,102.27994433862631 L5.771054371953995,115.8259443386263 L-6.578945628046007,102.27994433862631 L-0.576945628046005,102.27994433862631 A285.7500000000009,285.7500000000009 0 0 1 3.454054371953994,56.324944338626324 L-2.47794562804601,55.273944338626336 L12.04405437195399,44.07894433862634 L21.171054371953986,59.43594433862634 L15.266054371953985,58.37994433862633 A285.7500000000009,285.7500000000009 0 0 0 11.421054371953986,102.27994433862634 z" style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', cursor: 'move'}} transform="rotate(16.345787048339844 178.5470733642579,94.83988189697271) " id="svg_1" className=""/></g></svg>
        </div>
        <div style={{ position: 'absolute', top: '0px', left: '0px', zIndex: '1' }}>
          <img className="proImage" src={proImage} width="500" alt="proImage" />
        </div>
      </div>
    )
  }
}

export default Main;