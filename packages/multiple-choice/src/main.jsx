import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import pink from '@material-ui/core/colors/pink';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MultipleChoice from './multiple-choice';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import classNames from 'classnames';

const styleSheet = theme => {
  const root = {
    '--feedback-correct-bg-color': green[500],
    '--feedback-incorrect-bg-color': orange[500],
    '--feedback-color': 'black',
    '--choice-input-color': 'black',
    '--choice-input-selected-color': theme.palette.primary[500],
    '--choice-input-disabled-color': theme.palette.grey[500],
    '--choice-input-correct-disabled-color': green[500],
    '--choice-input-incorrect-disabled-color': orange[500],
    backgroundColor: 'var(--mc-bg-color, rgba(0,0,0,0))'
  };

  return {
    root,
    'white-on-black': {
      '--correct-answer-toggle-label-color': 'white',
      '--feedback-correct-bg-color': green[800],
      '--feedback-incorrect-bg-color': orange[800],
      '--feedback-color': 'white',
      '--mc-bg-color': 'black',
      '--choice-input-color': 'white',
      '--choice-input-selected-color': theme.palette.primary[200]
    },
    'black-on-rose': {
      '--mc-bg-color': pink[50]
    }
  };
};

class Main extends React.Component {
  static propTypes = {
    model: PropTypes.object,
    session: PropTypes.object,
    onChoiceChanged: PropTypes.func,
    classes: PropTypes.object.isRequired
  };

  static defaultProps = {
    model: {},
    session: {}
  };
  constructor(props) {
    super(props);
  }

  render() {
    const { model, onChoiceChanged, session, classes } = this.props;

    return (
      <div className={classNames(classes.root, classes[model.className])}>
        <MultipleChoice
          {...model}
          session={session}
          onChoiceChanged={onChoiceChanged}
        />
      </div>
    );
  }
}

const Styled = withStyles(styleSheet, { name: 'Main' })(Main);

const theme = createMuiTheme();

const Root = props => (
  <MuiThemeProvider theme={theme}>
    <Styled {...props} />
  </MuiThemeProvider>
);

export default Root;
