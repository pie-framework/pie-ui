import React from 'react';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

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

  static propTypes = {
    model: PropTypes.object,
    session: PropTypes.object,
    onChoiceChanged: PropTypes.func,
    classes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      radioValue: ''
    };
  }

  indexToSymbol(index) {
    const {model} = this.props;
    switch(model.keyMode){
      case 'numbers':
      return (index + 1).toString();;
      case 'letters':
      return (String.fromCharCode(97 + index).toUpperCase()).toString();
    }
  }

  toggleRadio(e) {
    this.props.onChoiceChanged(e);
    this.setState({radioValue: e.target.value});
  }


  render() {
    const {classes, model} = this.props;
    const {radioValue} = this.state;
    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: model.prompt}}/>
        <div className={classes.container}>
          {model.choices.map((k, index) => {
            return (
              <div key={index} className={classes.row}>
                <Radio name='likert' onClick={(e) => this.toggleRadio(e)}
                       checked={radioValue === k.value && k.value} value={k.value}/>
                <div className={classes.textRow}>
                  <Typography className={classes.identifier}>{this.indexToSymbol(index)}.</Typography>
                  <div className={classes.label} dangerouslySetInnerHTML={{__html: k.label}}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Main);