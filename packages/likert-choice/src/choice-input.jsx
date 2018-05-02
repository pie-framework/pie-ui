import {FormControlLabel} from 'material-ui/Form';
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Radio from 'material-ui/Radio';
import green from 'material-ui/colors/green';
import orange from 'material-ui/colors/orange';
import Typography from 'material-ui/typography';
import classNames from 'classnames';

const styleSheet = {
    title: {
        fontWeight: 'bold',
        fontSize: '1em',
        paddingRight: '1em'
    },
    label: {
        color: 'var(--choice-input-color, black)',
        display: 'block',
        verticalAlign: 'middle',
        cursor: 'pointer'
    },
    row: {
        display: 'flex',
        alignItems: 'center'
    }
};

const formStyleSheet = {
    label: {
        color: 'var(--choice-input-color, black)'
    }
};

export const StyledFormControlLabel = withStyles(formStyleSheet, {
    name: 'FormControlLabel'
})(props => (
    <FormControlLabel {...props} classes={{label: props.classes.label}}/>
));

const CLASS_NAME = 'multiple-choice-component';

const colorStyle = (varName, fallback) => ({
    [`&.${CLASS_NAME}`]: {
        color: `var(--choice-input-${varName}, ${fallback})`
    }
});

const inputStyles = {
    'correct-root': colorStyle('correct-color', 'black'),
    'correct-checked': colorStyle('correct-selected-color', green[500]),
    'correct-disabled': colorStyle('correct-disabled-color', 'grey'),
    'incorrect-root': colorStyle('incorrect-color', 'black'),
    'incorrect-checked': colorStyle('incorrect-checked', orange[500]),
    'incorrect-disabled': colorStyle('incorrect-disabled-color', 'grey'),
    root: colorStyle('color', 'black'),
    checked: colorStyle('selected-color', 'black'),
    disabled: colorStyle('disabled-color', 'black')
};

export const StyledRadio = withStyles(inputStyles)(props => {
    const {correctness, classes, checked, onChange, disabled} = props;
    const key = k => (correctness ? `${correctness}-${k}` : k);

    const resolved = {
        root: classes[key('root')],
        checked: classes[key('checked')],
        disabled: classes[key('disabled')]
    };

    const miniProps = {checked, onChange, disabled};

    return (
        <Radio
            {...miniProps}
            className={CLASS_NAME}
            classes={{
                root: resolved.root,
                checked: resolved.checked
            }}
        />
    );
});

export class ChoiceInput extends React.Component {
    static propTypes = {
        choiceMode: PropTypes.oneOf(['radio']),
        displayKey: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
        correctness: PropTypes.string,
        disabled: PropTypes.bool.isRequired,
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
        classes: PropTypes.object,
        className: PropTypes.string
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.onToggleChoice = this.onToggleChoice.bind(this);
    }

    onToggleChoice() {
        this.props.onChange({
            value: this.props.value,
            selected: !this.props.checked
        });
    }

    render() {
        const {
            choiceMode,
            disabled,
            displayKey,
            label,
            checked,
            correctness,
            classes,
            className
        } = this.props;

        const Tag = StyledRadio;
        const classSuffix = 'radio-button';
        return (
            <div className={classNames(className, 'corespring-' + classSuffix)}>
                <div className={classes.row}>
                    <Typography className={classes.title}>{displayKey + '. '}</Typography>
                    <StyledFormControlLabel
                        disabled={disabled}
                        control={
                            <Tag
                                checked={checked}
                                correctness={correctness}
                                onChange={this.onToggleChoice}
                            />
                        }
                    />
                    <span
                        className={classes.label}
                        onClick={this.onToggleChoice}
                        dangerouslySetInnerHTML={{__html: label}}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styleSheet)(ChoiceInput);