module.exports = {
  elements: {
    'math-inline': '..'
  },
  models: [
    // {
    //   config: {
    //     feedbackEnabled: true,
    //     promptEnabled: true,
    //     rationaleEnabled: true,
    //     teacherInstructionsEnabled: true,
    //     studentInstructionsEnabled: true,
    //     element: 'math-inline',
    //     customKeys: ['\\frac{}{}', '\\pi'],
    //     responseType: 'Advanced Multi',
    //     expression: '{{response}}',
    //     rationale:
    //       '<p>A correct volume of <b>125<math xmlns="http://www.w3.org/1998/Math/MathML"> <mtext>π</mtext> </math></b> cm<sup>3</sup>.</p><p>The smallest piece is a cone, so to find the volume use&nbsp;<math xmlns="http://www.w3.org/1998/Math/MathML"> <mrow> <mfrac> <mn>1</mn> <mn>3</mn> </mfrac> <mtext>π</mtext><msup> <mi>r</mi> <mn>2</mn> </msup> <mi>h</mi></mrow> </math> :&nbsp; <math xmlns="http://www.w3.org/1998/Math/MathML"> <mrow> <mfrac> <mn>1</mn> <mn>3</mn> </mfrac> <msup> <mrow> <mtext>π(5)</mtext></mrow> <mn>2</mn> </msup> <mn>15</mn></mrow> </math> &nbsp;=&nbsp; <math xmlns="http://www.w3.org/1998/Math/MathML"> <mrow> <mtext>125π</mtext></mrow> </math> .</p>',
    //     prompt:
    //       '<p>An artist made a cone out of stainless steel, then sliced it into 3 pieces as shown below.</p><p><img id="248ddab455d94aaab413770a80abcf50" alt="image 248ddab455d94aaab413770a80abcf50" src="https://storage.googleapis.com/pie-staging-221718-assets/image/a9761e4b-7d5d-4e17-9dff-f62463d6348e"></p><p>What is the volume of the smallest piece, in terms of <math xmlns="http://www.w3.org/1998/Math/MathML"> <mtext>π</mtext> </math> ?</p><p>Use the on-screen keyboard to type your answer in the box below.</p>',
    //     equationEditor: 'geometry',
    //     id: '1',
    //     responses: [
    //       {
    //         alternates: {},
    //         answer: '125\\pi',
    //         validation: 'literal',
    //         id: '1',
    //         allowSpaces: true
    //       }
    //     ]
    //   },
    //   correctness: { correctness: 'incorrect', score: '0%', correct: false },
    //   disabled: true,
    //   view: false,
    //   correctResponse: {},
    //   rationale: null,
    //   teacherInstructions: null,
    //   element: 'math-inline',
    //   id: '1'
    // }

    {
      id: '1',
      element: 'math-inline',
      correctness: { correctness: 'incorrect', score: '0%', correct: false },
      disabled: false,
      view: false,
      config: {
        responseType: 'Advanced Multi',
        element: 'math-inline',
        question: '...',
        expression: '{{response}}',
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
        },
        customKeys: ['\\left(\\right)', '\\frac{}{}', 'x\\frac{}{}']
      }
    }
  ]
};

// const pp = {
//   session: {
//     id: 'c88b5805-c3f9-4044-87f3-bd689017bbd6',
//     createdAt: { _seconds: 1572838654, _nanoseconds: 82000000 },
//     data: [
//       {
//         id: '8a80808157d8678b0157d89739180006',
//         answers: { r1: { value: '0.7r^2' } },
//         completeAnswer: '0.7r^2\\ \\text{cm}^3'
//       }
//     ],
//     contentItemId: '8a80808157d8678b0157d89739180006',
//     mode: 'gather'
//   },
//   js: {
//     view: [
//       'https://pits-dot-pie-staging-221718.appspot.com/bundles/@pie-element/math-inline@latest/player.js'
//     ]
//   },
//   item: {
//     models: [
//       {
//         config: {
//           feedbackEnabled: true,
//           promptEnabled: true,
//           rationaleEnabled: true,
//           teacherInstructionsEnabled: true,
//           studentInstructionsEnabled: true,
//           element: 'math-inline',
//           customKeys: ['\\frac{}{}', '\\pi'],
//           responseType: 'Advanced Multi',
//           expression: '{{response}}\\ \\text{cm}^3',
//           rationale:
//             '<p>A correct volume of <b>125<math xmlns="http://www.w3.org/1998/Math/MathML"> <mtext>π</mtext> </math></b> cm<sup>3</sup>.</p><p>The smallest piece is a cone, so to find the volume use&nbsp;<math xmlns="http://www.w3.org/1998/Math/MathML"> <mrow> <mfrac> <mn>1</mn> <mn>3</mn> </mfrac> <mtext>π</mtext><msup> <mi>r</mi> <mn>2</mn> </msup> <mi>h</mi></mrow> </math> :&nbsp; <math xmlns="http://www.w3.org/1998/Math/MathML"> <mrow> <mfrac> <mn>1</mn> <mn>3</mn> </mfrac> <msup> <mrow> <mtext>π(5)</mtext></mrow> <mn>2</mn> </msup> <mn>15</mn></mrow> </math> &nbsp;=&nbsp; <math xmlns="http://www.w3.org/1998/Math/MathML"> <mrow> <mtext>125π</mtext></mrow> </math> .</p>',
//           prompt:
//             '<p>An artist made a cone out of stainless steel, then sliced it into 3 pieces as shown below.</p><p><img id="248ddab455d94aaab413770a80abcf50" alt="image 248ddab455d94aaab413770a80abcf50" src="https://storage.googleapis.com/pie-staging-221718-assets/image/a9761e4b-7d5d-4e17-9dff-f62463d6348e"></p><p>What is the volume of the smallest piece, in terms of <math xmlns="http://www.w3.org/1998/Math/MathML"> <mtext>π</mtext> </math> ?</p><p>Use the on-screen keyboard to type your answer in the box below.</p>',
//           equationEditor: 'geometry',
//           id: '8a80808157d8678b0157d89739180006',
//           responses: [
//             {
//               alternates: {},
//               answer: '125\\pi\\text{cm}^3',
//               validation: 'literal',
//               id: '1',
//               allowSpaces: true
//             }
//           ]
//         },
//         correctness: { correctness: 'incorrect', score: '0%', correct: false },
//         disabled: true,
//         view: false,
//         correctResponse: {},
//         rationale: null,
//         teacherInstructions: null,
//         element: 'math-inline',
//         id: '8a80808157d8678b0157d89739180006'
//       }
//     ],
//     elements: { 'math-inline': '@pie-element/math-inline@latest' },
//     id: '57f18880-63e3-48dc-8ec9-ed74829ae50f',
//     markup: '<math-inline id="8a80808157d8678b0157d89739180006"></math-inline>'
//   }
// };
