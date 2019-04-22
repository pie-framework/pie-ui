const session = id => ({
  id,
  value: {
    0: { value: 'apple' },
    1: { value: 'carrot' }
  },
  element: 'inline-choice'
});

module.exports = [session('1'), session('2'), session('3')];
