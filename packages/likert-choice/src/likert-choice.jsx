import React, {Component} from 'react';
import ChoiceInput from './choice-input';
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const styleSheet = {
    container: {
        display: 'table',
        width: '100%',
        tableLayout: 'fixed',
        textAlign: 'center',
        borderSpacing: '10px'
    },
    prompt: {
        verticalAlign: 'middle'
    },
    choice: {
        paddingTop: '20px',
        paddingBottom: '10px'
    },
    last: {
        borderBottom: 'none'
    },
    column: {
        display: 'table-cell'
    }
}

class LikertChoice extends Component {

    static propTypes = {
        mode: PropTypes.oneOf(['gather', 'view', 'evaluate']),
        keyMode: PropTypes.oneOf(['numbers', 'letters']),
        choices: PropTypes.array,
        prompt: PropTypes.string,
        session: PropTypes.object,
        disabled: PropTypes.bool,
        onChoiceChanged: PropTypes.func,
        activeLang: PropTypes.string
    };

    constructor(props) {
        super(props);
    }

    indexToSymbol(index) {
        return (this.props.keyMode === 'numbers'
                ? index + 1
                : String.fromCharCode(97 + index).toUpperCase()
        ).toString();
    }


    search(nameKey, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].lang === nameKey) {
                return myArray[i];
            }
        }
    }

    render() {
        const {
            mode,
            disabled,
            choices,
            prompt,
            onChoiceChanged,
            classes,
            activeLang
        } = this.props;


        let choiceToTag = (choice, index) => {
            const label = this.search(activeLang,choice.label);
            var choiceClass = 'choice' + (index === choices.length - 1 ? ' last' : '');
            const choiceProps = {
                disabled,
                value: choice.value,
                displayKey: this.indexToSymbol(index),
                label: label.value,
                onChange: onChoiceChanged
            };

            const names = classNames(classes.choice, {
                [classes.last]: index === choices.length - 1
            });

            return (
                <div style={{display:'table-cell'}} className={classNames(choiceClass)} key={index}>
                    <ChoiceInput {...choiceProps} className={names} />
                </div>
            );
        };

        return (
            <div>
                <div
                    className={classes.prompt}
                    dangerouslySetInnerHTML={{ __html: prompt }}
                />
                <div className={classes.container}>
                    {choices.map(choiceToTag)}
                </div>
            </div>
        )
    }
}

export default withStyles(styleSheet)(LikertChoice);