import React from 'react';
import PropTypes from 'prop-types';
import Choices from './choices';
import Categories, { CategoryType } from './categories';

const ChoiceType = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

export default class Categorize extends React.Component {
  static propTypes = {
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
    disabled: PropTypes.bool
  };

  static defaultProps = {
    disabled: false
  };

  render() {
    const { model, session, disabled } = this.props;
    return (
      <div>
        <Categories categories={model.categories} />
        <Choices choices={model.choices} />
      </div>
    );
  }
}
