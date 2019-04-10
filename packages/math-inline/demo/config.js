module.exports = {
  elements: {
    'math-inline': '..'
  },
  models: [
    {
      id: '1',
      element: 'math-inline',
      mode: 'advanced',
      feedback: {
        correct: {
          default: 'Correct',
          type: 'none'
        },
        incorrect: {
          default: 'Incorrect',
          type: 'none'
        },
        partial: {
          default: 'Nearly',
          type: 'none'
        }
      },
      equationEditor: 'everything',
      expression: 'n = {\\embed{answerBlock}[answerBlock1]}',
      question:
        '<p>The binomial <math xmlns="http://www.w3.org/1998/Math/MathML"> <mi>x</mi><mo>&#8722;</mo><mn>2</mn> </math> is a factor of the polynomial below.</p><p><span class="equation-block"><math xmlns="http://www.w3.org/1998/Math/MathML"> <mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><msup> <mi>x</mi> <mn>3</mn> </msup> <mo>+</mo><msup> <mi>x</mi> <mn>2</mn> </msup> <mo>+</mo><mi>n</mi><mi>x</mi><mo>+</mo><mn>10</mn> </math> </span></p><p>What is the value of <span class="variable">n</span>? Use the on-screen keyboard&#160;to type the correct answer in the box.</p>',
      responses: [
        {
          answer: 'n=-11',
          id: 'answerBlock1',
          alternates: {},
          validation: 'literal'
        }
      ],
      response: {
        answer: 'n=-11',
        id: 'answerBlock1',
        alternates: {},
        validation: 'literal'
      },
      correctness: {},
      config: {
        mode: 'advanced',
        feedback: {
          correct: {
            default: 'Correct',
            type: 'none'
          },
          incorrect: {
            default: 'Incorrect',
            type: 'none'
          },
          partial: {
            default: 'Nearly',
            type: 'none'
          }
        },
        equationEditor: 'everything',
        expression: 'n = {\\embed{answerBlock}[answerBlock1]}',
        question:
          '<p>The binomial <math xmlns="http://www.w3.org/1998/Math/MathML"> <mi>x</mi><mo>&#8722;</mo><mn>2</mn> </math> is a factor of the polynomial below.</p><p><span class="equation-block"><math xmlns="http://www.w3.org/1998/Math/MathML"> <mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><msup> <mi>x</mi> <mn>3</mn> </msup> <mo>+</mo><msup> <mi>x</mi> <mn>2</mn> </msup> <mo>+</mo><mi>n</mi><mi>x</mi><mo>+</mo><mn>10</mn> </math> </span></p><p>What is the value of <span class="variable">n</span>? Use the on-screen keyboard&#160;to type the correct answer in the box.</p>',
        responses: [
          {
            answer: 'n=-11',
            id: 'answerBlock1',
            alternates: {},
            validation: 'literal'
          }
        ],
        defaultResponse: {
          answer: 'n=-11',
          id: 'answerBlock1',
          alternates: {},
          validation: 'literal'
        }
      }
    }
  ]
};
