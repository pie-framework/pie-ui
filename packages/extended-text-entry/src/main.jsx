import React from 'react';
import EditableHTML from '@pie-lib/editable-html';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import debug from 'debug';
import { Feedback } from '@pie-lib/render-ui';

const log = debug('@pie-ui:extended-text-entry');

const style = theme => ({
  main: {
    margin: '20px'
  },
  prompt: {
    width: '100%',
    marginBottom: theme.spacing.unit * 2
  }
});

class Main extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    model: PropTypes.object,
    classes: PropTypes.object.isRequired,
    session: PropTypes.shape({
      value: PropTypes.string
    }).isRequired
  };

  render() {
    const { model, onChange, classes, session } = this.props;
    const { width, height, disabled, feedback } = model;
    const { value } = session;
    log('[render] disabled? ', disabled);
    return (
      <div className={classes.main}>
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
        />
        <br />
        {feedback && <Feedback correctness="correct" feedback={feedback} />}
      </div>
    );
  }
}

export default withStyles(style)(Main);
