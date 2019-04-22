import React from 'react';
import Typography from '@material-ui/core/Typography';

import Container from './container';

export class Hotspot extends React.Component {
  render() {
    const { session,
      model: {
        question: {
          imageUrl,
          prompt,
          multipleCorrect,
          shapes,
          outlineColor,
          hotspotColor,
          maxImageHeight,
          maxImageWidth,
          dimensions
        }
      },
      onSelectChoice
    } = this.props;

    return (
      <div>
        <Typography>
          <span dangerouslySetInnerHTML={{ __html: prompt }} />
        </Typography>

        {imageUrl ? (
          <Container
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
          />
        ) : null}
      </div>
    );
  }
}

export default Hotspot;
