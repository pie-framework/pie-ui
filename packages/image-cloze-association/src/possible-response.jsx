import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from '@pie-lib/drag';
import { withStyles } from '@material-ui/core/styles';

import EvaluationIcon from './evaluation-icon';
import c from './constants';

class PossibleResponse extends React.Component {
  getClassname = () => {
    const { classes, data: { isCorrect } } = this.props;
    let styleProp;

    switch (isCorrect) {
      case undefined:
        styleProp = null; break;
      case true:
        styleProp = 'baseCorrect'; break;
      default:
        styleProp = 'baseIncorrect'; break;
    }
    return styleProp ? classes[styleProp] : '';
  };

  render() {
    const { classes, connectDragSource, containerStyle, data } = this.props;
    const additionalClass = this.getClassname();
    const evaluationStyle = {
      alignSelf: 'center',
      fontSize: 14,
      paddingRight: 2
    };

    return connectDragSource(
      <div className={`${classes.base} ${additionalClass}`} style={containerStyle}>
        <span className={classes.span} dangerouslySetInnerHTML={{__html: data.value}}/>
        <EvaluationIcon
          isCorrect={data.isCorrect}
          containerStyle={evaluationStyle}
        />
      </div>
    );
  }
}

PossibleResponse.propTypes = {
  canDrag: PropTypes.bool.isRequired,
  classes: PropTypes.object,
  connectDragSource: PropTypes.func,
  containerStyle: PropTypes.object,
  data: PropTypes.object.isRequired,
  onDragBegin: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired
};

PossibleResponse.defaultProps = {
  classes: {},
  connectDragSource: () => {},
  containerStyle: {}
};

const styles = theme => ({
  base: {
    backgroundColor: '#fff',
    border: `1px solid ${theme.palette.primary.main}`,
    display: 'flex',
    marginLeft: 2,
    marginTop: 2,
    width: 'fit-content'
  },
  baseCorrect: {
    border: '2px solid green'
  },
  baseIncorrect: {
    border: '2px solid red'
  },
  span: {
    backgroundColor: '#fff'
  }
});

const Styled = withStyles(styles)(PossibleResponse);

const tileSource = {
  canDrag(props) {
    const { canDrag } = props;
    return canDrag;
  },
  beginDrag(props) {
    const { data, data: { id, value, containerIndex }, onDragBegin } = props;
    onDragBegin(data);
    return {
      id,
      value,
      containerIndex
    };
  },
  endDrag(props) {
    props.onDragEnd();
  }
};

export default DragSource(c.types.response, tileSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Styled);
