import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Trait from './trait';


const styles = () => ({
  table: {
    borderSpacing: 0,
    marginBottom: '16px',
    borderRadius: '4px',
    color: '#050F2D',
    fontSize: '14px',
    lineHeight: '16px',
    fontFamily: 'Cerebri Sans',

    '& th': {
      padding: '16px',
      textAlign: 'left',
      backgroundColor: '#F1F1F1',
      verticalAlign: 'bottom'
    },

    '& th div': {
      width: '200px',
    },

    '& td': {
      width: '200px',
      padding: '16px 8px',
      verticalAlign: 'top'
    }
  },
  scorePointHeader: {
    '& td': {
      border: 0,
      padding: 0,
      textAlign: 'center',
    }
  },
  pointLabel: {
    marginBottom: '4px'
  },
  scorePointValue: {
    fontWeight: 'normal',
  }
});

class Scale extends React.Component {
  render() {
    const { classes, scale, scaleIndex } = this.props;
    const { excludeZero, maxPoints, traitLabel, traits, scorePointsLabels } = scale || {};

    let scorePointsValues = [];
    let showStandards;
    let showDescription;
    let showPointsLabels;

    try {
      // determining the score points values
      for (let pointValue = maxPoints; pointValue >= excludeZero ? 1 : 0; pointValue -= 1) {
        scorePointsValues.push(pointValue);
      }

      // determining which columns have to be displayed and the number of columns for values
      const { traitStandards, traitDescriptions } = traits.reduce(
        (tcc, trait) => ({
          traitStandards: [...tcc.traitStandards, ...(trait.standards || [])],
          traitDescriptions: [...tcc.traitDescriptions, ...(trait.description || [])],
        }),
        {
          traitStandards: [],
          traitDescriptions: [],
        }
      );

      showDescription = traitDescriptions.length;
      showPointsLabels = scorePointsLabels.length;
      showStandards = traitStandards.length;
    } catch (e) {
      showDescription = false;
      showPointsLabels = false;
      showStandards = false;
    }

    return (
      <table
        key={`scale-${scaleIndex}`}
        className={classes.table}
      >
        <thead>
        <tr>
          <th>
            <div dangerouslySetInnerHTML={{ __html: traitLabel }}/>
          </th>

          {showStandards ? <th><div>Standard(s)</div></th> : null}

          {showDescription ? <th><div>Description</div></th> : null}

          {
            scorePointsValues && scorePointsValues.map((scorePointValue, index) => {
              let pointLabel = '';

              // to handle the case when there aren't enough labels
              try {
                pointLabel = scorePointsLabels[scorePointsValues.length - index - 1] || '';
              } catch (e) {
                pointLabel = '';
              }

              return (
                <th key={`table-header-${index}`}>
                  <table className={classes.scorePointHeader}>
                    <thead>
                    {showPointsLabels
                        ? (
                            <tr>
                              <td>
                                <div className={classes.pointLabel} dangerouslySetInnerHTML={{ __html: pointLabel }}/>
                              </td>
                            </tr>
                        )
                        : null
                    }
                    <tr>
                      <td className={classes.scorePointValue}>
                        {scorePointValue === 1 ? `${scorePointValue} point` : `${scorePointValue} points`}
                      </td>
                    </tr>
                    </thead>
                  </table>
                </th>
              );
            })
          }

        </tr>
        </thead>

        <tbody>
        {
          traits && traits.map((trait, traitIndex) => (
            <Trait
              key={`trait_${scaleIndex}_${traitIndex}`}
              trait={trait}
              traitIndex={traitIndex}
              showDescription={!!showDescription}
              showStandards={!!showStandards}
              scaleIndex={scaleIndex}
              scorePointsValues={scorePointsValues}
              excludeZero={excludeZero}
            />
          ))
        }
        </tbody>
      </table>
    )
  }
}

Scale.propTypes = {
  classes: PropTypes.object,
  scaleIndex: PropTypes.number,
  scale: PropTypes.shape({
    excludeZero: PropTypes.bool,
    maxPoints: PropTypes.number,
    scorePointsLabels: PropTypes.arrayOf(PropTypes.string),
    traitLabel: PropTypes.string,
    traits: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      standards: PropTypes.arrayOf(PropTypes.string),
      scorePointsDescriptors: PropTypes.arrayOf(PropTypes.string),
      description: PropTypes.string,
    }))
  })
};

export default withStyles(styles)(Scale);
