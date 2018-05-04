import React from 'react';
import ChoiceInput from './choice-input';
import {withStyles} from 'material-ui/styles';

const styleSheet = {
    container: {
        display: 'table',
        width: '100%',
        tableLayout: 'fixed',
        textAlign: 'center',
        borderSpacing: '10px'
    }
}

const LikertChoice = (props) => {

    const {model} = props;
    return (<div className={props.classes.container}>
        {model.choices.map((obj, id) => <ChoiceInput key={id} displayKey="1" checked={obj.correct ? obj.correct : false } disabled={model.disabled} label={obj.label}
                                                     onChange={() => console.log("hello")} value={obj.value}/>
        )}
    </div>)
}

export default withStyles(styleSheet)(LikertChoice);