import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
import { DragInTheBlank } from '@pie-lib/mask-markup';
import { withDragContext } from '@pie-lib/drag';
import { Collapsible } from '@pie-lib/render-ui';
import { renderMath } from '@pie-lib/math-rendering';

const DraggableDragInTheBlank = withDragContext(DragInTheBlank);

export class Main extends React.Component {
  static propTypes = {
    prompt: PropTypes.string,
    rationale: PropTypes.string,
    disabled: PropTypes.bool,
    markup: PropTypes.string,
    model: PropTypes.object,
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

  componentDidUpdate() {
    // eslint-disable-next-line
    const domNode = ReactDOM.findDOMNode(this);

    renderMath(domNode);
  }

  toggleShowCorrect = () => {
    this.setState({ showCorrectAnswer: !this.state.showCorrectAnswer });
  };

  render() {
    const { showCorrectAnswer } = this.state;
    const { model, onChange, value } = this.props;
    const { prompt, mode } = model;
    const modelWithValue = {
      ...model,
      value
    };

    return (
      <div>
        {
          model.teacherInstructions && (
            <Collapsible labels={{ hidden: 'Show Teacher Instructions', visible: 'Hide Teacher Instructions' }}>
              <div dangerouslySetInnerHTML={{ __html: model.teacherInstructions }}/>
            </Collapsible>
          )
        }
        <br />
        <CorrectAnswerToggle
          show={mode === 'evaluate'}
          toggled={showCorrectAnswer}
          onToggle={this.toggleShowCorrect}
        />
        {prompt && <div dangerouslySetInnerHTML={{ __html: prompt }}/>}
        <br />
        {
          model.rationale && (
            <Collapsible labels={{ hidden: 'Show Rationale', visible: 'Hide Rationale' }}>
              <div dangerouslySetInnerHTML={{ __html: model.rationale }}/>
            </Collapsible>
          )
        }
        <br />
        <DraggableDragInTheBlank
          {...modelWithValue}
          onChange={onChange}
          showCorrectAnswer={showCorrectAnswer}
        />
      </div>
    );
  }
}

export default Main;
