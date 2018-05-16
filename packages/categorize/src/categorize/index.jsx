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
} from './builder';
import { withContext } from '@pie-lib/drag';
import { Provider as IdProvider, generateId } from './id-context';
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
    this.uid = generateId();

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

  toggleShowCorrect = () =>
    this.setState({ showCorrect: !this.state.showCorrect });

  render() {
    const { classes, model, session } = this.props;
    const { showCorrect } = this.state;
    const style = {
      flexDirection:
        model.config.choices.position === 'top' ? 'column-reverse' : undefined
    };

    const { categories, choices } = buildState(
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
    log('grid: ', grid);
    return (
      <IdProvider value={this.uid}>
        <div>
          <CorrectAnswerToggle
            show={model.incorrect}
            toggled={this.state.showCorrect}
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
            />
          </div>
        </div>
      </IdProvider>
    );
  }
}
const styles = {
  categorize: {
    display: 'flex',
    flexDirection: 'column'
  }
};
export default withContext(withStyles(styles)(Categorize));
