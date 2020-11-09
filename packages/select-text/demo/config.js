const tokens = () => [
  { text: 'Rachel cut out 8 stars in 6 minutes.', start: 0, end: 36 },
  { text: 'Lovelle cut out 6 stars in 4 minutes.', start: 37, end: 74 },
  {
    text: 'Lovelle and Rachel cut the same number of stars in 6 minutes.',
    start: 117,
    end: 178,
  },
];

const base = (extras) =>
  Object.assign(
    {},
    {
      element: 'select-text',
      highlightChoices: true,
      disabled: false,
      text:
        'Rachel cut out 8 stars in 6 minutes. Lovelle cut out 6 stars in 4 minutes. Rachel cut out 4 more stars than Lovelle. Lovelle and Rachel cut the same number of stars in 6 minutes. ',
      tokens: tokens(),
    },
    extras
  );

module.exports = {
  elements: {
    'select-text': '..',
  },
  models: [
    {
      tokens: [
        {
          text: 'mammals',
          start: 15,
          end: 22,
        },
        {
          text: 'go',
          end: 87,
          start: 85,
        },
        {
          end: 209,
          text: 'city-based',
          start: 199,
        },
        {
          text: '<u>hang out </u> ',
          start: 254,
          end: 270,
        },
        {
          text: 'fly',
          start: 347,
          end: 350,
        },
        {
          end: 395,
          start: 388,
          text: 'insects',
        },
      ],
      prompt:
        '<p>A student is writing an informational article about bats in Austin, Texas, for the school newspaper.&#160;</p><p>In the draft of the article&#8217;s introduction, the student wants to make the word choices&#160;appropriate to inform the audience. Which&#160;<span class="relative-emphasis">two</span>&#160;underlined words or phrases should be replaced to&#160;improve the word choice in the article?</p>',
      text:
        '<p>Bats are <u>mammals</u> that are different than other mammals because they can <u>go</u> for long time. They live in many parts of the world. In Austin, the capital of Texas, lives the largest <u>city-based</u> bat colony in North America. These bats <u>hang out </u> under the Congress Avenue Bridge in downtown Austin; and every night they <u>fly</u> out of their home to look for <u>insects</u> to eat.</p>\n',
      disabled: false,
      maxSelections: 2,
      rationale: null,
      teacherInstructions: null,
      element: 'select-text',
      id: '1',
    },
    base({ id: '5' }),
    base({ id: '2', disabled: true }),
    base({
      id: '3',
      disabled: true,
      incorrect: true,
      tokens: tokens().map((t, index) => {
        return Object.assign({}, t, { correct: index < 2 });
      }),
    }),
  ],
};
