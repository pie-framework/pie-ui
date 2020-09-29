const base = {};

const model = (id, extras) =>
  Object.assign(
    {},
    base,
    {
      id,
      element: 'charting-el',
      addCategoryEnabled: true,
      categoryDefaultLabel: 'Category',
      chartType: 'bar',
      correctAnswer: {
        data: [
          {
            label: 'A',
            value: 1,
            initial: true,
            interactive: false,
            editable: true,
            deletable: true,
          },
          {
            label: 'B',
            value: 1,
            initial: true,
            interactive: true,
            editable: true,
            deletable: true,
          },
          {
            label: 'C',
            value: 1,
            initial: true,
            interactive: true,
            editable: true,
            deletable: true,
          },
        ],
      },
      data: [
        {
          label: 'A',
          value: 1,
          initial: true,
          interactive: false,
          editable: true,
          deletable: true,
        },
        {
          label: 'B',
          value: 1,
          initial: true,
          interactive: true,
          editable: true,
          deletable: true,
        },
        {
          label: 'D',
          value: 2,
          initial: true,
          interactive: true,
          editable: true,
          deletable: true,
        },
      ],
      domain: {
        label: 'Characters',
      },
      editCategoryEnabled: true,
      graph: {
        width: 480,
        height: 480,
      },
      prompt: 'Here goes item stem!',
      promptEnabled: true,
      rationale: 'Rationale goes here!',
      range: {
        label: 'Amount',
        max: 3,
        min: 0,
        labelStep: 1,
      },
      title: 'This is a chart!',
    },
    extras
  );

module.exports = {
  elements: {
    'charting-el': '..',
  },
  models: [
    model('1', {}),
    {
      correctAnswer: {
        data: [
          {
            value: 3,
            label: '1',
          },
          {
            label: '2',
            value: 2,
          },
          {
            value: 4,
            label: '3',
          },
          {
            value: 0,
            label: '4',
          },
          {
            value: 1,
            label: '5',
          },
        ],
      },
      data: [
        {
          value: 0,
          interactive: true,
          label: '1',
        },
        {
          label: '2',
          interactive: true,
          value: 0,
        },
        {
          value: 0,
          interactive: true,
          label: '3',
        },
        {
          value: 0,
          label: '4',
          interactive: true,
        },
        {
          value: 0,
          interactive: true,
          label: '5',
        },
      ],
      range: {
        min: 0,
        step: 1,
        max: 8,
        labelStep: 1,
      },
      graph: {
        height: 500,
        width: 500,
      },
      chartType: 'linePlot',
      prompt:
        '<p>Hanna has some stickers. The length of each sticker is shown. Hanna has 3 squirrel stickers, 2 pig stickers, 4 turtle stickers, and 1 puppy sticker.</p><p><img alt id="19dfba64f0704019ae38c7e65e19fd3a" src="https://storage.googleapis.com/pie-prod-221718-assets/image/170b22ee-5282-404d-9cf9-d620950006fd"></p><p>Make a line plot that shows how many stickers of each length Hanna has.</p><p><strong>For each sticker length shown:</strong></p><ul><li>Place your cursor over each length on the bottom of the bar graph&#160;</li><li>Then click and drag the bar up to graph the correct number of stickers.</li></ul><p><em>If you need to change the number of stickers you placed, click the top of the bar then drag the bar up or down to show the number of stickers you need.</em></p>',
      addCategoryEnabled: false,
      element: 'charting-el',
      rationale:
        '<p>Hanna has 3 stickers that are 1 inch, 2 stickers that are 2 inches, 4 stickers that are 3 inches, 0&#160;stickers that are 4 inches, and 1 sticker that is 5 inches.</p>',
      id: 2,
      title: "Length of Hanna's Stickers",
      domain: {
        label: 'Inches',
      },
      teacherInstructions:
        '<p>TEACHER READS:</p><p>Hanna has some stickers. The length of each sticker is shown. Hanna has 3 squirrel stickers, 2 pig stickers, 4 turtle stickers, and 1 puppy sticker. Make a line plot that shows how many stickers of each length Hanna has.</p><p>For each sticker length shown, place your cursor over each length on the bottom of the bar graph, then click and drag the bar up to graph the correct number of stickers. If you need to change the number of stickers you placed, click the top of the bar then drag the bar up or down to show the number of stickers you need.</p>',
    },
  ],
};
