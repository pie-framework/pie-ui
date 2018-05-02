import React from 'react';
import ChoiceInput from './choice-input';

const Main = () => {
    return <ChoiceInput displayKey="1" checked={true} disabled={false} label="Hello" onChange={() => console.log("hello")} value="rost" />
}

export default Main;