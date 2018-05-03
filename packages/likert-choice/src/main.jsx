import React from 'react';
import ChoiceInput from './choice-input';
import {withStyles} from 'material-ui/styles';

const styleSheet = {
    container : {
        display: 'table',
        width: '100%',
        tableLayout: 'fixed',
        textAlign: 'center',
        borderSpacing: '10px'
    }
}

const Main = (props) => {
    return (
        <div className={props.classes.container}>
            <ChoiceInput displayKey="1" checked={true} disabled={false} label="Hello" onChange={() => console.log("hello")} value="rost" />
        </div>
    )
}

export default withStyles(styleSheet)(Main);