import React from 'react';
import proImage from '../public/protractor.png';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-48px', left: '0px', zIndex: '3', transform: 'rotate(28deg)' }}>
          <svg height="260" width="500">
            <path fill="#9ed343" stroke="none" d="M128.50001404928582,208.99881807537156L132.50001404928582,208.99881807537156L124.7394371262089,218.02862576767924L116.50001404928582,208.99881807537156L120.50001404928582,208.99881807537156A190.4999999999998,190.4999999999998,0,0,1,123.18462943390121,178.34881807537155L119.25001404928582,177.64881807537157L128.9144371262089,170.19497192152542L134.99905251082427,180.43824115229467L131.05386020313196,179.74497192152543A190.4999999999998,190.4999999999998,0,0,0,128.5000140492858,208.9988180753716Z" style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0', cursor: 'move' }} transform="rotate(55.368463321796085 297.00000000000006 209.00000000000003)"></path>
          </svg>
        </div>
        <div style={{ position: 'absolute', top: '0px', left: '0px', zIndex: '1' }}>
          <img className="proImage" src={proImage} width="500" alt="proImage" />
        </div>
      </div>
    )
  }
}

export default Main;