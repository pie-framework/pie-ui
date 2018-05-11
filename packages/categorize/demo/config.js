const getCategories = () => {
  return [
    { id: '1', label: 'Category 1' },
    { id: '2', label: 'Category 2' },
    { id: '3', label: 'Category 3' },
    { id: '4', label: 'Category 4' },
    { id: '5', label: 'Category 5' }
  ];
};

const getChoices = () => {
  return [
    { id: '1', content: '<h1>Foo</h1>' },
    { id: '1', content: '<div>Foo</div>' },
    { id: '1', content: '<div>Foo</div>' },
    { id: '1', content: '<div>Foo</div>' }
  ];
};

module.exports = {
  elements: {
    'categorize-el': '..'
  },
  models: [
    {
      id: '1',
      element: 'categorize-el',

      categories: getCategories(),
      choices: getChoices()
    }
  ]
};
