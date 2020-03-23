const gen = (id, domain, ticks) => ({
  id,
  element: 'number-line',
  correctResponse: [
    {
      type: 'point',
      pointType: 'full',
      domainPosition: 1
    },
    {
      type: 'line',
      leftPoint: 'full',
      rightPoint: 'empty',
      domainPosition: 1,
      size: 2
    }
  ],
  feedback: {
    type: 'correct',
    message: 'foo'
  },
  allowPartialScoring: true,
  partialScoring: [
    {
      numberOfCorrect: 1,
      scorePercentage: 35
    }
  ],
  graph: {
    width: 700,
    height: 400,
    domain,
    ticks,
    initialElements: [
      {
        type: 'point',
        pointType: 'empty',
        domainPosition: 0
      }
    ],
    maxNumberOfPoints: 20,
    // tickFrequency: 6,
    showMinorTicks: false,
    snapPerTick: 1,
    tickLabelOverrides: [],
    initialType: 'PF',
    exhibitOnly: false,
    availableTypes: {
      PF: true,
      PE: true,
      LFF: true,
      LEF: true,
      LFE: true,
      LEE: true,
      RFN: true,
      RFP: true,
      REN: true,
      REP: true
    }
  }
});
module.exports = {
  elements: {
    'number-line': '..'
  },
  models: [
    gen('1', { min: -2, max: 1 }, { minor: 0.1, major: 0.3 }),
    gen('2', { min: -10, max: 10 }, { minor: 0.5, major: 2 }),
    gen('3', { min: -100, max: 10 }, { minor: 10, major: 20 }),
    gen('4', { min: -100, max: 10 }, { minor: 2, major: 4 })
  ]
};
