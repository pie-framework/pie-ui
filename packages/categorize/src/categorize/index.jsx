import React from 'react';
import PropTypes from 'prop-types';
import Choices, { ChoiceType } from './choices';
import Categories, { CategoryType } from './categories';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
import { withStyles } from '@material-ui/core/styles';
import {
  buildState,
  removeChoiceFromCategory,
  moveChoiceToCategory
} from '@pie-lib/categorize';
import { withDragContext, uid } from '@pie-lib/drag';
import { Feedback, Collapsible } from '@pie-lib/render-ui';

import debug from 'debug';

const log = debug('@pie-ui:categorize');

export class Categorize extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    model: PropTypes.shape({
      choices: PropTypes.arrayOf(PropTypes.shape(ChoiceType)),
      categories: PropTypes.arrayOf(PropTypes.shape(CategoryType))
    }),
    session: PropTypes.shape({
      answers: PropTypes.arrayOf(
        PropTypes.shape({
          choice: PropTypes.string,
          category: PropTypes.string
        })
      )
    }),
    onAnswersChange: PropTypes.func.isRequired,
    onShowCorrectToggle: PropTypes.func.isRequired
  };

  static defaultProps = {
    disabled: false
  };

  constructor(props) {
    super(props);
    this.uid = uid.generateId();

    this.state = {
      showCorrect: false
    };
  }

  dropChoice = (categoryId, draggedChoice) => {
    const { session, onAnswersChange } = this.props;
    log(
      '[dropChoice] category: ',
      draggedChoice.categoryId,
      'choice: ',
      draggedChoice
    );

    const answers = moveChoiceToCategory(
      draggedChoice.id,
      draggedChoice.categoryId,
      categoryId,
      draggedChoice.choiceIndex,
      session.answers
    );

    onAnswersChange(answers);
  };

  removeChoice = c => {
    log('[removeChoice]: ', c);
    const { onAnswersChange, session } = this.props;
    const answers = removeChoiceFromCategory(
      c.id,
      c.categoryId,
      c.choiceIndex,
      session.answers
    );
    onAnswersChange(answers);
  };

  UNSAFE_componentWillReceiveProps() {
    this.setState({ showCorrect: false });
  }

  toggleShowCorrect = () =>
    this.setState({ showCorrect: !this.state.showCorrect }, () => {
      this.props.onShowCorrectToggle();
    });

  getPositionDirection = (choicePosition) => {
    let flexDirection;

    switch (choicePosition) {
      case 'left':
        flexDirection = 'row-reverse';
        break;
      case 'right':
        flexDirection = 'row';
        break;
      case 'below':
        flexDirection = 'column';
        break;
      default:
        // above
        flexDirection = 'column-reverse';
        break;
    }

    return flexDirection;
  };

  render() {
    const { classes, model, session } = this.props;
    const { showCorrect } = this.state;
    const { choicesPosition, choicesPerRow, categoriesPerRow } = model;

    const choicePosition = choicesPosition || 'above';

    const style = {
      flexDirection: this.getPositionDirection(choicePosition)
    };

    const { categories, choices, correct } = buildState(
      model.categories,
      model.choices,
      showCorrect ? model.correctResponse : session.answers,
      model.correctResponse
    );

    log('[render] disabled: ', model.disabled);

    const columns = choicesPerRow / categoriesPerRow;

    const maxLength = categories.reduce((acc, c) => {
      if (c.choices.length > acc) {
        return c.choices.length;
      } else {
        return acc;
      }
    }, 0);

    const rows = Math.floor(maxLength / columns) + 1;
    const grid = { rows, columns };
    return (
      <uid.Provider value={this.uid}>
        <div>
          <CorrectAnswerToggle
            show={showCorrect || correct === false}
            toggled={showCorrect}
            onToggle={this.toggleShowCorrect}
          />
          <div className={classes.categorize} style={style}>
            <Categories
              model={model}
              disabled={model.disabled}
              categories={categories}
              onDropChoice={this.dropChoice}
              onRemoveChoice={this.removeChoice}
              grid={grid}
            />
            <Choices
              disabled={model.disabled}
              model={model}
              choices={choices}
              choicePosition={choicePosition}
            />
          </div>
          {
            model.rationale && (
              <div className={classes.collapsible}>
                <Collapsible
                  labels={{ hidden: 'Show Rationale', visible: 'Hide Rationale' }}
                >
                  <div dangerouslySetInnerHTML={{ __html: model.rationale }}/>
                </Collapsible>
              </div>
            )
          }
          {
            model.correctness &&
            model.feedback &&
            !showCorrect && (
              <Feedback
                correctness={model.correctness}
                feedback={model.feedback}
              />
            )
          }
        </div>
      </uid.Provider>
    );
  }
}
const styles = (theme) => ({
  categorize: {
    marginBottom: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column'
  },
  collapsible: {
    paddingBottom: theme.spacing.unit * 2
  }
});
export default withDragContext(withStyles(styles)(Categorize));
