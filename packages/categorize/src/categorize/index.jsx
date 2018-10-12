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
    onAnswersChange: PropTypes.func.isRequired
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

  componentWillReceiveProps() {
    this.setState({ showCorrect: false });
  }

  toggleShowCorrect = () =>
    this.setState({ showCorrect: !this.state.showCorrect });

  render() {
    const { classes, model, session } = this.props;
    const { showCorrect } = this.state;

    const choicePosition =
      model.config && model.config.choices
        ? model.config.choices.position
        : 'above';

    let flexDirection;

    switch (choicePosition) {
      case 'left':
        flexDirection = 'row-reverse';
        break;
      case 'right':
        flexDirection = 'row';
        break;
      case 'bottom':
        flexDirection = 'column';
        break;
      default:
        // above
        flexDirection = 'column-reverse';
        break;
    }

    const style = {
      flexDirection
    };

    const { categories, choices, correct } = buildState(
      model.categories,
      model.choices,
      showCorrect ? model.correctResponse : session.answers,
      model.correctResponse
    );

    log('[render] disabled: ', model.disabled);

    const { config } = model;

    const columns = config.choices.columns / config.categories.columns;

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
              config={model.config.categories}
              disabled={model.disabled}
              categories={categories}
              onDropChoice={this.dropChoice}
              onRemoveChoice={this.removeChoice}
              grid={grid}
            />
            <Choices
              disabled={model.disabled}
              config={model.config.choices}
              choices={choices}
              choicePosition={choicePosition}
            />
          </div>
        </div>
      </uid.Provider>
    );
  }
}
const styles = {
  categorize: {
    display: 'flex',
    flexDirection: 'column'
  }
};
export default withDragContext(withStyles(styles)(Categorize));
