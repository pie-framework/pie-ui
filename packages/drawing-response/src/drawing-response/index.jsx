import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import Container from './container';

class DrawingResponseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCorrect: false
    };
  }

  render() {
    const {
      session,
      model: {
        disabled,
        imageDimensions,
        imageUrl,
        prompt,
        mode
      }
    } = this.props;
    const isEvaluateMode = mode === 'evaluate';

    return (
      <div>
        <Typography>
          <span dangerouslySetInnerHTML={{ __html: prompt }} />
        </Typography>

        <Container
          isEvaluateMode={isEvaluateMode}
          imageDimensions={imageDimensions}
          session={session}
          imageUrl={imageUrl}
          disabled={disabled}
        />
      </div>
    );
  }
}

DrawingResponseComponent.propTypes = {
  model: PropTypes.object.isRequired,
  onSelectChoice: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired
};

export default DrawingResponseComponent;
