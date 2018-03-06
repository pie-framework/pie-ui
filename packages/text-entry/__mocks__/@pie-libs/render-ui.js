import React from 'react';

const comp = name => props => <div data-name={name || 'unknown'}>{JSON.stringify(props)}</div>

module.exports = {
  indicators: {
    Correct: comp('Correct'),
    Incorrect: comp('Incorrect'),
    PartiallyCorrect: comp('PartiallyCorrect'),
    NothingSubmitted: comp('NothingSubmitted')
  }
}