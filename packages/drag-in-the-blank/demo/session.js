const session = id => ({
  id,
  value: {
    0: 'apple',
    1: 'carrot'
  },
  element: 'drag-in-the-blank'
});

module.exports = [session('1'), session('2'), session('3')]; //, session('2'), session('3')];
