import React from 'react';
import Radio from 'material-ui/Radio';
import Typography from 'material-ui/typography';
import {withStyles} from 'material-ui/styles';

const styles = {
    radioButton: {
        marginBottom: 16,
    },
    container: {
        verticalAlign: 'middle'
    },
    row: {
        display: 'inline-block',
        textAlign: 'center',
        paddingRight: '50px',
        paddingLeft: '50px'
    },
    textRow: {
        display: 'block'
    },
    identifier: {
        display: 'inline-flex',
        paddingRight: '1em',
        fontSize: '1em',
        fontWeight: 'bold'
    },
    label: {
        display: 'inline-flex',
    }
};

class Main extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            radioValue: ''
        }
    }

    label(nameKey, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].lang === nameKey) {
                return <div className={this.props.classes.label} dangerouslySetInnerHTML={{__html: myArray[i].label}}/>;
            }
        }
    }

    indexToSymbol(index) {
        return (this.props.model.keyMode === 'numbers'
                ? index + 1
                : String.fromCharCode(97 + index).toUpperCase()
        ).toString();
    }

    toggleRadio(e){
        this.props.onChoiceChanged(e);
        this.setState({radioValue: e.target.value});
    }


    render(){
        const {classes, model} = this.props;
        const {radioValue} = this.state;
        return (
            <div>
                <div dangerouslySetInnerHTML={{__html: model.prompt}}/>
                <div className={classes.container}>
                    {model.choices.map((k,index) => {
                        return(
                            <div key={index} className={classes.row}>
                                <Radio name='likert' onClick={(e) => this.toggleRadio(e)} checked={radioValue === k.value && k.value} value={k.value}/>
                                <div className={classes.textRow}>
                                    <Typography className={classes.identifier}>{this.indexToSymbol(index)}.</Typography>
                                    {this.label(model.activeLang, k.label)}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Main);