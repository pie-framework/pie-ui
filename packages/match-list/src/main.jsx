import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withDragContext } from '@pie-lib/drag';
import { Feedback } from '@pie-lib/render-ui';
import ArrowHead from '@material-ui/icons/ArrowDropDown';
import { withStyles } from '@material-ui/core/styles';
import uniqueId from 'lodash/uniqueId';
import isEmpty from 'lodash/isEmpty';
import findIndex from 'lodash/findIndex';
import Answer from './answer';
import AnswerGrid from './answer-grid';

const Arrow = withStyles({
  arrow: {
    display: 'inline-block',
    position: 'relative',
    width: 80
  },
  line: {
    backgroundColor: '#979797',
    bottom: 19,
    content: '""',
    display: 'block',
    height: 1,
    left: 20,
    position: 'absolute',
    width: 80
  },
  right: {
    bottom: 20
  }
})(
  ({ direction, classes }) => {
    const extraStyle = direction === 'left'
      ? {}
      : {
        transform: 'rotate(180deg)'
      };

    return (
      <div
        className={classes.arrow}
        style={extraStyle}
      >
        <ArrowHead
          style={{
            transform: 'rotate(90deg)',
            color: '#979797',
            fontSize: 40
          }}
        />
        <span className={classnames(classes.line, {
          [classes.right]: direction !== 'left'
        })} />
      </div>
    );
  }
);

class Main extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    session: PropTypes.object.isRequired,
    onSessionChange: PropTypes.func,
    model: PropTypes.object.isRequired,
    prompt: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.instanceId = uniqueId();
  }

  onRemoveAnswer(answer) {
    const { session, onSessionChange } = this.props;

    session.value = session.value.map(val => val === answer.id ? undefined : val);

    onSessionChange(session);
  }

  placeAnswer(id, place) {
    const { model, session, onSessionChange } = this.props;
    const { config } = model;

    if (isEmpty(session.value)) {
      session.value = new Array(config.prompts.length);
    }

    const choiceIndex = session.value.indexOf(id);

    if (choiceIndex >= 0) {
      const tmp = session.value[choiceIndex];

      session.value[choiceIndex] = session.value[place];
      session.value[place] = tmp;
    } else {
      session.value[place] = id;
    }

    onSessionChange(session);
  }

  render() {
    const { classes, model, session } = this.props;
    const { config } = model;
    const { prompt } = config;

    return (
      <div className={classes.mainContainer}>
        <div
          className={classes.prompt}
          dangerouslySetInnerHTML={{ __html: prompt }}
        />
        <div className={classes.listContainer}>
          <div className={classes.itemList}>
            {
              config.prompts.map((pr) => (
                <div
                  key={pr.id}
                  style={{
                    border: '1px solid #c2c2c2',
                    boxSizing: 'border-box',
                    height: 40,
                    overflow: 'hidden',
                    margin: '10px 0',
                    textAlign: 'center',
                    padding: 10,
                    width: 280
                  }}
                >
                  {pr.title}
                </div>
              ))
            }
          </div>
          <div className={classnames(classes.itemList, classes.arrowList)}>
            {
              config.prompts.map((pr, index) => (
                <div
                  key={index}
                  style={{
                    height: 40,
                    margin: '10px 20px'
                  }}
                >
                  <Arrow direction="left" />
                  <Arrow />
                </div>
              ))
            }
          </div>
          <AnswerGrid
            instanceId={this.instanceId}
            model={model}
            session={session}
            placeAnswer={(id, index) => this.placeAnswer(id, index)}
            onRemoveAnswer={answer => this.onRemoveAnswer(answer)}
          />
        </div>
        <div className={classes.answersContainer}>
          {
            config.answers.map((answer) => (isEmpty(session) || session.value.indexOf(answer.id) === -1) && (
              <Answer
                key={answer.id}
                instanceId={this.instanceId}
                draggable={true}
                onRemoveAnswer={answer => this.onRemoveAnswer(answer)}
                placeAnswer={(id, index) => this.placeAnswer(id, index)}
                session={session}
                type={!session.value || findIndex(session.value, val => val === answer.id) < 0 ? 'choice' : 'target'}
                {...answer}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  answersContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 50
  },
  listContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between'
  },
  itemList: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  arrowList: {
    flex: 0,
    minWidth: 200
  },
  main: {
    width: '100%'
  },
  toggle: {
    paddingBottom: theme.spacing.unit * 3
  },
  prompt: {
    verticalAlign: 'middle'
  },
});

const styledMain = withStyles(styles)(Main);

export default withDragContext(styledMain);