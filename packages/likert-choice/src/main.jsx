import React from 'react';
import LikertChoice from './likert-choice';

const Main = (props) => {
    const { model, onChoiceChanged, session, classes } = props;
    return <LikertChoice {...model} session={session} onChoiceChanged={onChoiceChanged}/>
}

export default Main;