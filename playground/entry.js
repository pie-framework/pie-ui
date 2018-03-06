console.log('hi');

import { MuiThemeProvider, createMuiTheme, createStyleSheet, withStyles } from 'material-ui/styles';

import PropTypes from 'proptypes';
import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';

const theme = createMuiTheme({});

class Holder extends React.Component {


  render() {
    const { value, onChange, classes } = this.props;
    return <div className={classes.root}>
      holder
      <TextField value={value} onChange={onChange} />
    </div>;
  }
}

const holderStyles = createStyleSheet('Holder', theme => {
  return {
    root: {
      width: '100%'
    }
  }
});


const StyledHolder = withStyles(holderStyles)(Holder);


class App extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      value: '...'
    }
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return <MuiThemeProvider theme={theme}><div>
      <StyledHolder value={this.state.value} onChange={this.onChange} />
    </div></MuiThemeProvider>;
  }
}

document.addEventListener('DOMContentLoaded', () => {

  const node = document.querySelector('#app');
  const el = React.createElement(App, {});
  ReactDOM.render(el, node);
});