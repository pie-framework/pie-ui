import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Content from './content';
import Choices from './choices';
import { buildContent, addChoice, removeChoice } from './builder';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';

import { withDragContext, uid } from '@pie-lib/drag';
import debug from 'debug';

const log = debug('@pie-ui:fill-in-the-blank:main');

export class Main extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    model: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    uid: PropTypes.string,
    onAnswersChange: PropTypes.func.isRequired
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.uid = props.uid || uid.generateId();
    this.state = {
      showCorrect: false
    };
  }

  dropChoice = (blankId, choice) => {
    const { model, session, onAnswersChange } = this.props;
    log('dropChoice: blank:', blankId, 'choice: ', choice);
    session.answers = session.answers || [];

    session.answers = addChoice(
      choice.id,
      blankId,
      session.answers,
      model.choices,
      choice.blankId
    );

    onAnswersChange(session.answers);
  };

  removeChoice = (blankId, choice) => {
    const { session, onAnswersChange } = this.props;
    session.answers = session.answers || [];
    session.answers = removeChoice(choice.id, blankId, session.answers);
    onAnswersChange(session.answers);
  };

  toggleShowCorrect = () => {
    this.setState({ showCorrect: !this.state.showCorrect });
  };

  render() {
    const { classes, className, model, session } = this.props;
    const { showCorrect } = this.state;
    const { content, choices } = buildContent(
      model,
      showCorrect ? model.correctResponse : session.answers || []
    );

    return (
      <uid.Provider value={this.uid}>
        <CorrectAnswerToggle
          show={model.correctResponse !== undefined}
          toggled={showCorrect}
          onToggle={this.toggleShowCorrect}
          className={classes.toggle}
        />
        <div className={classNames(classes.main, className)}>
          <Content
            content={content}
            onDropChoice={this.dropChoice}
            onRemoveChoice={this.removeChoice}
            disabled={model.disabled}
          />
          <Choices
            choices={choices}
            label={model.choiceLabel}
            disabled={model.disabled}
          />
        </div>
      </uid.Provider>
    );
  }
}

const styles = theme => ({
  main: {},
  toggle: {
    paddingBottom: theme.spacing.unit
  }
});

export default withDragContext(withStyles(styles)(Main));
