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
        choiceMode: PropTypes.oneOf(['radio', 'checkbox']),
        keyMode: PropTypes.oneOf(['numbers', 'letters']),
        choices: PropTypes.array,
        prompt: PropTypes.string,
        session: PropTypes.object,
        disabled: PropTypes.bool,
        onChoiceChanged: PropTypes.func
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

    render() {
        const {
            mode,
            disabled,
            choices,
            choiceMode,
            prompt,
            onChoiceChanged,
            classes
        } = this.props;


        let choiceToTag = (choice, index) => {
            var choiceClass = 'choice' + (index === choices.length - 1 ? ' last' : '');
            const choiceProps = {
                choiceMode,
                disabled,
                value: choice.value,
                displayKey: this.indexToSymbol(index),
                label: choice.label,
                onChange: mode === 'gather' ? onChoiceChanged : () => {}
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