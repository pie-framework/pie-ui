import React from 'react';
import EditableHTML from '@pie-lib/editable-html';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import debug from 'debug';
import { color, Feedback, Collapsible } from '@pie-lib/render-ui';
import { renderMath } from '@pie-lib/math-rendering';

const log = debug('@pie-ui:extended-text-entry');

const style = theme => ({
  main: {
    padding: '10px 20px',
    backgroundColor: color.background(),
    color: color.text()
  },
  prompt: {
    width: '100%',
    color: color.text(),
    marginBottom: theme.spacing.unit * 2,
    fontSize: 'inherit'
  }
});

export class Main extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    model: PropTypes.object,
    classes: PropTypes.object.isRequired,
    session: PropTypes.shape({
      value: PropTypes.string
    }).isRequired
  };

  componentDidUpdate() {
    if (this.containerRef) {
      renderMath(this.containerRef);
    }
  }

  render() {
    const { model, onChange, classes, session } = this.props;
    const { dimensions, disabled, feedback, teacherInstructions, mathInput } = model;
    const { value } = session;
    const { width, height } = dimensions || {};
    log('[render] disabled? ', disabled);

    return (
      <div
        className={classes.main}
        ref={ref => {
          this.containerRef = ref;
        }}
      >
        {
          teacherInstructions && (
            <div>
              <Collapsible
                labels={{ hidden: 'Show Teacher Instructions', visible: 'Hide Teacher Instructions' }}
                className={classes.collapsible}
              >
                <div dangerouslySetInnerHTML={{ __html: teacherInstructions }}/>
              </Collapsible>
              <br/>
            </div>
          )
        }
        {model.prompt && (
          <Typography
            className={classes.prompt}
            dangerouslySetInnerHTML={{ __html: model.prompt }}
          />
        )}
        <EditableHTML
          onChange={onChange}
          markup={value || ''}
          width={width && width.toString()}
          height={height && height.toString()}
          disabled={disabled}
          highlightShape={true}
          pluginProps={{
            math: {
              disabled: !mathInput,
              keypadMode: this.props.model.equationEditor

            }
          }}
        />
        {feedback && (
          <div>
            <br/>
            <Feedback correctness="correct" feedback={feedback}/>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(style)(Main);
