import React from 'react';
import Rotatable from './rotatable';
import GreenArrow from './green-arrow';
import protractor from '../public/protractor.png';
import Dragable from 'react-draggable';

class Main extends React.Component {

    render() {
        return (
            <div style={{ position: 'relative'}}>
                <Rotatable handle={<GreenArrow />}></Rotatable>
                <Dragable>
                    <div style={{ position: 'absolute', top: '0px', left: '0px', zIndex: '1' }}>
                        <img src={protractor} width="500"></img>
                    </div>
                </Dragable>
            </div>
        )
    }

}

export default Main;