import React from 'react';
import protractor from '../public/protractor.png';
import Dragable from 'react-draggable';

const DragableProtractor = () => {
    return (
        <Dragable>
            <img src={protractor}></img>
        </Dragable>
    )
}

export default DragableProtractor;