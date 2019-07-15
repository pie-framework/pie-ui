import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
import { ConstructedResponse } from '@pie-lib/mask-markup';
import { Collapsible } from '@pie-lib/render-ui';
import { withStyles } from '@material-ui/core/styles';

export class Main extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    prompt: PropTypes.string,
    rationale: PropTypes.string,
    disabled: PropTypes.bool,
    markup: PropTypes.string,
    mode: PropTypes.string,
    teacherInstructions: PropTypes.string,
    value: PropTypes.object,
    feedback: PropTypes.object,
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: {}
  };

  state = {
    showCorrectAnswer: false
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (isEmpty(nextProps.feedback)) {
      this.setState({ showCorrectAnswer: false });
    }
  }

  toggleShowCorrect = () => {
    this.setState({ showCorrectAnswer: !this.state.showCorrectAnswer });
  };

  render() {
    const { showCorrectAnswer } = this.state;
    const { classes, mode, prompt, rationale, teacherInstructions } = this.props;

    return (
      <div>
        {
          teacherInstructions && (
            <div className={classes.collapsible}>
              <Collapsible
                labels={{ hidden: 'Show Teacher Instructions', visible: 'Hide Teacher Instructions' }}
              >
                <div dangerouslySetInnerHTML={{ __html: teacherInstructions }}/>
              </Collapsible>
            </div>
          )
        }
        <CorrectAnswerToggle
          show={mode === 'evaluate'}
          toggled={showCorrectAnswer}
          onToggle={this.toggleShowCorrect}
        />
        {prompt && <div dangerouslySetInnerHTML={{ __html: prompt }}/>}
        {
          rationale && (
            <div className={classes.collapsible}>
              <Collapsible
                labels={{ hidden: 'Show Rationale', visible: 'Hide Rationale' }}
              >
                <div dangerouslySetInnerHTML={{ __html: rationale }}/>
              </Collapsible>
            </div>
          )
        }
        <ConstructedResponse
          {...this.props}
          showCorrectAnswer={showCorrectAnswer}
        />
      </div>
    );
  }
}

const styles = theme => ({
  collapsible: {
    margin: `${theme.spacing.unit * 2} 0`,
  }
});

export default withStyles(styles)(Main);
