import React from 'react';
import PropTypes from 'prop-types';

const Trait = (props) => {
  const { trait, traitIndex, scaleIndex, showStandards, showDescription, scorePointsValues } = props;
  const { name, standards, scorePointsDescriptors, description } = trait || {};

  return (
    <tr key={`scale-${scaleIndex}-trait-${traitIndex}`}>
      <td>
        <div dangerouslySetInnerHTML={{ __html: name }}/>
      </td>

      {showStandards
        ?
        <td>
          <div dangerouslySetInnerHTML={{ __html: standards.join(',') }}/>
        </td>
        : null
      }

      {showDescription
        ?
        <td>
          <div dangerouslySetInnerHTML={{ __html: description }}/>
        </td>
        : null
      }

      {
        scorePointsValues.map((scorePointValue, index) => {
          let scoreDescriptor;

          try {
            scoreDescriptor = scorePointsDescriptors[scorePointsValues.length - index - 1];
          } catch (e) {
            scoreDescriptor = '';
          }

          return (
            <td key={`table-cell-${index}`}>
              <div
                dangerouslySetInnerHTML={{ __html: scoreDescriptor }}
              />
            </td>
          );
        })
      }
    </tr>
  );
};

Trait.propTypes = {
  showStandards: PropTypes.bool,
  showDescription: PropTypes.bool,
  scorePointsValues: PropTypes.arrayOf(PropTypes.number),
  scaleIndex: PropTypes.number,
  traitIndex: PropTypes.number,
  trait: PropTypes.shape({
    name: PropTypes.string,
    standards: PropTypes.arrayOf(PropTypes.string),
    scorePointsDescriptors: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
  })
};

export default Trait;
