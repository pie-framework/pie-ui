import {
  Correct,
  Incorrect,
  NothingSubmitted,
  PartiallyCorrect,
  ShowRationale
} from '@pie-lib/icons';

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';
import injectSheet from 'react-jss';

let getIcon = (t) => {
  switch (t) {
    case 'unanswered': return NothingSubmitted;
    case 'correct': return Correct;
    case 'incorrect': return Incorrect;
    case 'partial': return PartiallyCorrect;
    case 'info': return ShowRationale;
    default:
      return undefined;
  }
}

const Feedback = (props) => {

  const { classes, type } = props;
  let className = classNames(classes[type], classes.feedback);
  let Icon = getIcon(props.type);

  return <ReactCSSTransitionGroup
    transitionName="fb"
    transitionAppear={true}
    transitionAppearTimeout={300}
    transitionEnterTimeout={300}
    transitionLeaveTimeout={300}>
    <div key="panel"
      className={className}
      style={{ width: props.width }}>
      <Icon iconSet="emoji" shape="square" />
      <span
        className="message"
        dangerouslySetInnerHTML={{ __html: props.message }}></span>
    </div>
  </ReactCSSTransitionGroup>;
}

const styles = {
  feedback: {
    marginTop: '10px',
    backgroundColor: '#dddddd',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      height: '30px'
    },
    '& message': {
      paddingLeft: '5px'
    },
    '& h1': {
      padding: '0px',
      margin: '0px'
    }
  },
  correct: {
    backgroundColor: 'var(--number-line-correct-bg, green)'
  },
  incorrect: {
    backgroundColor: 'var(--number-line-incorrect-bg, orange)'
  },
}

export default injectSheet(styles)(Feedback);
