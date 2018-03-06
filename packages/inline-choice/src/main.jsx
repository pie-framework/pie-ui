import { green, orange, pink } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';

import InlineChoice from './inline-choice';
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

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
    '--choice-input-selected-color': theme.palette.primary[500],
    '--choice-input-disabled-color': theme.palette.grey[500],
    backgroundColor: 'var(--mc-bg-color, rgba(0,0,0,0))'
  }

  return {
    root,
    'white-on-black': {
      '--correct-answer-toggle-label-color': 'white',
      '--feedback-correct-bg-color': green[800],
      '--feedback-incorrect-bg-color': orange[800],
      '--feedback-color': 'white',
      '--mc-bg-color': 'black',
      '--choice-input-color': 'white',
      '--choice-input-selected-color': theme.palette.primary[200],
    },
    'black-on-rose': {
      '--mc-bg-color': pink[50]
    }
  };
};

class Main extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { model, onChoiceChanged, session, classes } = this.props;

    return (
      <div className={classNames(classes.root, classes[model.className])}>
        {model.prompt && <div dangerouslySetInnerHTML={{ __html: model.prompt }} />}
        <InlineChoice {...model} session={session} onChoiceChanged={onChoiceChanged} />
      </div>
    );
  }
}

Main.propTypes = {
  model: PropTypes.object,
  session: PropTypes.object,
  onChoiceChanged: PropTypes.func
};

Main.defaultProps = {
  model: {},
  session: {}
}

export default withStyles(styleSheet, { name: 'Main' })(Main);

