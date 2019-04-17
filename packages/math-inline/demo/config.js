module.exports = {
  elements: {
    'math-inline': '..'
  },
  models: [
    {
      id: '1',
      element: 'math-inline',
      correctness: {},
      config: {
        mode: 'advanced',
        element: 'math-inline',
        question:
          '<p>The binomial <math xmlns="http://www.w3.org/1998/Math/MathML"> <mi>x</mi><mo>&#8722;</mo><mn>2</mn> </math> is a factor of the polynomial below.</p><p><span class="equation-block"><math xmlns="http://www.w3.org/1998/Math/MathML"> <mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><msup> <mi>x</mi> <mn>3</mn> </msup> <mo>+</mo><msup> <mi>x</mi> <mn>2</mn> </msup> <mo>+</mo><mi>n</mi><mi>x</mi><mo>+</mo><mn>10</mn> </math> </span></p><p>What is the value of <span class="variable">n</span>? Use the on-screen keyboard&#160;to type the correct answer in the box.</p>',
        expression:
          '\\text{A family sized box contains} {{response}} \\text{less than} {{response}} \\text{times the number  }' +
          '  \\frac{3}{6}=\\frac{ {{response}} }{4} + \\frac{ {{response}} }{4}',
        equationEditor: 'everything',
        responses: [
          {
            validation: 'literal',
            answer: '\\frac{3}{6}=\\frac{1}{2}',
            alternates: {}
          }
        ],
        feedback: {
          correct: {
            type: 'none',
            default: 'Correct'
          },
          partial: {
            type: 'none',
            default: 'Nearly'
          },
          incorrect: {
            type: 'none',
            default: 'Incorrect'
          }
        }
      }
    }
  ]
};
