import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import Container from './container';

class HotspotComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCorrect: false
    };
  }

  onToggle = () => {
    const { showCorrect } = this.state;
    this.setState({ showCorrect: !showCorrect });
  };

  render() {
    const {
      session,
      model: {
        disabled,
        imageUrl,
        prompt,
        mode,
        multipleCorrect,
        shapes,
        outlineColor,
        hotspotColor,
        maxImageHeight,
        maxImageWidth,
        dimensions
      },
      onSelectChoice
    } = this.props;

    const isEvaluateMode = mode === 'evaluate';

    return (
      <div>
        <Typography>
          <span dangerouslySetInnerHTML={{ __html: prompt }} />
        </Typography>

        {imageUrl ? (
          <Container
            isEvaluateMode={isEvaluateMode}
            session={session}
            dimensions={dimensions}
            imageUrl={imageUrl}
            hotspotColor={hotspotColor}
            maxImageHeight={maxImageHeight}
            maxImageWidth={maxImageWidth}
            multipleCorrect={multipleCorrect}
            outlineColor={outlineColor}
            onSelectChoice={onSelectChoice}
            shapes={shapes}
            disabled={disabled}
          />
        ) : null}
      </div>
    );
  }
}

HotspotComponent.propTypes = {
  model: PropTypes.object.isRequired,
  onSelectChoice: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired
};

export default HotspotComponent;
