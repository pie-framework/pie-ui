import React from 'react';
import PropTypes from 'prop-types';

import Scale from './scale';


class Main extends React.Component {
  render() {
    const { model } = this.props;
    const { halfScoring, scales, visibleToStudent } = model || {};

    if (!scales || !visibleToStudent) {
      return <div/>;
    }

    return (
      <div>
        {halfScoring ? <p>* Half-point or in-between scores are permitted under this rubric.</p> : null}
        {scales.map((scale, scaleIndex) => (
          <Scale
            key={`scale_${scaleIndex}`}
            scale={scale}
            scaleIndex={scaleIndex}
            halfScoring={halfScoring}
          />
        ))}
      </div>
    );
  }
}

Main.propTypes = {
  model: PropTypes.shape({
    halfScoring: PropTypes.bool,
    scales: PropTypes.arrayOf(PropTypes.shape({
      excludeZero: PropTypes.bool,
      maxPoints: PropTypes.number,
      scorePointsLabels: PropTypes.arrayOf(PropTypes.string),
      traitLabel: PropTypes.string,
      traits: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        scorePointsDescriptors: PropTypes.arrayOf(PropTypes.string),
        standards: PropTypes.arrayOf(PropTypes.string),
      }))
    })),
    visibleToStudent: PropTypes.bool,
  })
};

export default Main;
