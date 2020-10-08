const model = (id, extras) => {
  const defaults = {
    element: 'inline-dropdown',
    disabled: false,
    // eslint-disable-next-line quotes
    markup: `The best fruit in the world is {{0}},<br/><br/> <div> The best vegetable in the world is {{1}}</div>`,
    choices: {
      0: [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
      ],
      1: [
        { label: 'Carrot', value: 'carrot' },
        { label: 'Leek', value: 'leek' },
      ],
    },
  };

  return Object.assign(defaults, { id }, extras);
};
module.exports = {
  elements: {
    'inline-choice': '..',
  },
  models: [
    model('1'),
    model('2', { disabled: true }),
    model('3', {
      disabled: true,
      feedback: {
        0: {
          correct: true,
        },
        1: {
          correct: false,
        },
      },
    }),
    {
      partialScoring: true,
      markup:
        'Angle 1 and angle 2 are {{0}} angles.<br> So, <math><mrow><msup><mrow><mn>55</mn></mrow><mo>&#8728;</mo></msup><mo>+</mo><mi>m</mi><mo>&#8736;</mo><mn>1</mn><mo>=</mo></mrow></math> {{1}}.<br> Therefore, <math><mrow><mi>m</mi><mo>&#8736;</mo><mn>1</mn><mo>=</mo></mrow></math> {{2}}.',
      lockChoiceOrder: true,
      rationale:
        '<p>Angle 1 and angle 2 form a straight angle. Straight angles measure 180&#176;. The sum of angle 1 and angle 2 must be 180&#176;. Two angles are supplementary if the the sum of their measures is 180&#176;, so angle 1 and angle 2 are supplementary. To find the measure of angle 1, substitute the measure of angle 2 into the equation angle 1 + angle 2 = 180&#176;. This means angle 1 + 55&#176; = 180&#176;. Subtracting 55 from both sides of the equation gives angle 1 = 125&#176;.</p>',
      prompt:
        '<p>Dundee Street, Crown Lane, and Charger Drive intersect to form &#8736;1, &#8736;2, &#8736;3, &#8736;4, and &#8736;5, as shown.</p><p><img alt="image 4abfcab9f4df4b13864765e509044e92" id="4abfcab9f4df4b13864765e509044e92" src="https://storage.googleapis.com/pie-prod-221718-assets/image/b28dd2e1-1b09-4fa2-ab36-025d085cdce9"></p><p>Lily knows that the measure of <math xmlns="http://www.w3.org/1998/Math/MathML"> <mrow> <mo>&#8736;</mo><mn>2</mn> </mrow> </math> is 55&#176; and wants to find the measure of <math xmlns="http://www.w3.org/1998/Math/MathML"> <mrow> <mo>&#8736;</mo><mn>1</mn> </mrow> </math>. Use the drop-down menus to choose the responses that make each statement true.</p>',
      teacherInstructions: '',
      id: 4,
      element: 'inline-dropdown',
      choices: {
        0: [
          {
            value: '0',
            correct: false,
            label: 'complementary',
          },
          {
            correct: true,
            label: 'supplementary',
            value: '1',
          },
          {
            correct: false,
            value: '2',
            label: 'vertical',
          },
        ],
        1: [
          {
            correct: false,
            value: '0',
            label: '0 degrees',
          },
          {
            label: '90 degrees',
            value: '1',
            correct: false,
          },
          {
            value: '2',
            label: '180 degrees',
            correct: true,
          },
          {
            label: '270 degrees',
            value: '3',
            correct: false,
          },
          {
            label: '360 degrees',
            value: '4',
            correct: false,
          },
        ],
        2: [
          {
            value: '0',
            label: '0 degrees',
            correct: false,
          },
          {
            label: '35 degrees',
            value: '1',
            correct: false,
          },
          {
            value: '2',
            correct: false,
            label: '55 degrees',
          },
          {
            correct: true,
            label: '125 degrees',
            value: '3',
          },
          {
            label: '215 degrees',
            value: '4',
            correct: false,
          },
          {
            label: '305 degrees',
            value: '5',
            correct: false,
          },
        ],
      },
    },
  ],
};
