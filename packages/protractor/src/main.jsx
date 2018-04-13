import React from 'react';
import proImage from '../public/protractor.png';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ position: 'relative' ,border:'1px solid green' }}>
        <div style={{ position: 'absolute', top: '137px',width:"502", height:"180", left: '0px', zIndex: '3', transform: 'rotate(0deg)', border:'1px solid' }}>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="35" height="180.6842105098047" style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}><rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none" className=""/><desc style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}>Created with Raphaël</desc><defs style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}/><g className="currentLayer"><title>Layer 1</title><path fill="#9ed343" stroke="none" d="M18.53460866277966,110.8445443391567 L24.197872444267603,110.8445443391567 L13.200812969262927,123.63243751869256 L1.5419852144077693,110.8445443391567 L7.208081099803776,110.8445443391567 A269.75789724290456,269.75789724290456 0 0 1 11.013484717603056,67.46143264082727 L5.413471256728496,66.46925223836956 L19.122742241020525,55.900784488118276 L27.73894636398109,70.39832439348756 L22.164421838279086,69.40142381784972 A269.75789724290456,269.75789724290456 0 0 0 18.53460866277965,110.84454433915673 z" style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', cursor: 'move'}} transform="rotate(-3.640275716781616 14.640466690063217,89.76661682128903) " id="svg_1" className=""/></g></svg>
        </div>
        <div style={{ position: 'absolute', top: '0px', left: '0px', zIndex: '1', border:'1px solid red'}}>
          <img className="proImage" src={proImage} width="500" alt="proImage" />
        </div>
      </div>
    )
  }
}

export default Main;
