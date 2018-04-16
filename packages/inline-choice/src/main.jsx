import { withStyles } from 'material-ui/styles';

import InlineChoice from './inline-choice';
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const styleSheet = () => {
  return {};
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
        {model.prompt && (
          <div dangerouslySetInnerHTML={{ __html: model.prompt }} />
        )}
        <InlineChoice
          {...model}
          session={session}
          onChoiceChanged={onChoiceChanged}
        />
      </div>
    );
  }
}

export default withStyles(styleSheet)(Main);
