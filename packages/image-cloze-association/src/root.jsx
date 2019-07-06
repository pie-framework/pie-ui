import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withDragContext } from '@pie-lib/drag';

import Image from './image-container';
import InteractiveSection from './interactive-section';
import PossibleResponses from './possible-responses';

import { getAnswersCorrectness } from './utils-correctness';

const generateId = () =>
  Math.random().toString(36).substring(2)
  + (new Date()).getTime().toString(36);

class ImageClozeAssociationComponent extends React.Component {
  constructor(props) {
    super(props);
    const { model: { possibleResponses, responseContainers } } = props;

    this.state = {
      answers: [],
      draggingElement: { id: '', value: '' },
      possibleResponses: possibleResponses.map(item => ({ id: generateId(), value: item })),
      responseContainers: responseContainers.map((item, index) => ({ id: generateId(), index, ...item }))
    };
  }

  beginDrag = (draggingElement) => {
    this.setState({
      draggingElement
    });
  };

  handleOnDragEnd = () => {
    this.setState({
      draggingElement: { id: '', value: '' }
    });
  };

  handleOnAnswerSelect = (answer, responseContainerIndex) => {
    const {
      model: {
        duplicateResponses,
        maxResponsePerZone
      },
      updateAnswer
    } = this.props;
    const { answers, possibleResponses } = this.state;
    let answersToStore;

    if (maxResponsePerZone === answers.filter(a => a.containerIndex === responseContainerIndex).length) {
      const a = answers.filter(a => a.containerIndex === responseContainerIndex);
      const b = answers.filter(b => b.containerIndex !== responseContainerIndex);
      a.shift(); // FIFO

      answersToStore = [
        ...a, // shifted
        ...b, // un-shifted
        {
          ...answer,
          containerIndex: responseContainerIndex,
          ...duplicateResponses ? { id: generateId() } : {}
        }
      ];
    } else {
      // for single response per container push the old answer into possible responses if overlapped
      const oldAnswer = answers.filter(a => a.containerIndex === responseContainerIndex)[0];

      if (oldAnswer && !duplicateResponses) {
        possibleResponses.push({
          ...oldAnswer,
          containerIndex: ''
        });
      }
      answersToStore = [
        ...answers
        // for single response per container remove the previous answer if overlapped
          .filter(a => duplicateResponses ? true : a.containerIndex !== responseContainerIndex)
          // remove the dragged answer if dragged fom a container area
          .filter(a => a.id !== answer.id),
        {
          ...answer,
          containerIndex: responseContainerIndex,
          ...duplicateResponses ? { id: generateId() } : {}
        }
      ];
    }
    this.setState({
      answers: answersToStore,
      possibleResponses:
      // for single response per container remove answer from possible responses
        duplicateResponses ? possibleResponses : possibleResponses.filter(response => response.id !== answer.id)
    });
    updateAnswer(answersToStore);
  };

  handleOnAnswerRemove = (answer) => {
    const {
      model: {
        duplicateResponses
      },
      updateAnswer
    } = this.props;
    const { answers, possibleResponses } = this.state;
    const answersToStore = answers.filter(a => a.id !== answer.id);
    const shouldNotPushInPossibleResponses = answer.containerIndex === undefined; // don't duplicate possible responses

    this.setState({
      answers: answersToStore,
      // push back into possible responses the removed answer if responses cannot be duplicated
      possibleResponses: duplicateResponses || shouldNotPushInPossibleResponses
        ? possibleResponses :
        [
          ...possibleResponses,
          {
            ...answer,
            containerIndex: undefined
          }
        ]
    });
    updateAnswer(answersToStore);
  };

  render() {
    const {
      model: {
        disabled,
        duplicateResponses,
        image,
        stimulus,
        responseCorrect,
        validation
      }
    } = this.props;
    const {
      answers,
      draggingElement,
      possibleResponses,
      responseContainers
    } = this.state;

    const answersToShow = responseCorrect !== undefined
      ? getAnswersCorrectness(answers, validation, duplicateResponses)
      : answers;

    return (
      <div>
        <Typography>
          <span dangerouslySetInnerHTML={{ __html: stimulus }} />
        </Typography>

        <InteractiveSection responseCorrect={responseCorrect}>
          <Image
            canDrag={!disabled}
            answers={answersToShow}
            draggingElement={draggingElement}
            duplicateResponses={duplicateResponses}
            image={image}
            onAnswerSelect={this.handleOnAnswerSelect}
            onDragAnswerBegin={this.beginDrag}
            onDragAnswerEnd={this.handleOnDragEnd}
            responseContainers={responseContainers}
          />

          <PossibleResponses
            canDrag={!disabled}
            data={possibleResponses}
            onAnswerRemove={this.handleOnAnswerRemove}
            onDragBegin={this.beginDrag}
            onDragEnd={this.handleOnDragEnd}
          />
        </InteractiveSection>
      </div>
    );
  }
}

ImageClozeAssociationComponent.propTypes = {
  classes: PropTypes.object,
  model: PropTypes.object.isRequired,
  updateAnswer: PropTypes.func.isRequired
};

ImageClozeAssociationComponent.defaultProps = {
  classes: {}
};

export default withDragContext(ImageClozeAssociationComponent);
