const session = (id, value) => ({ id, value, element: 'inline-choice' });

module.exports = [
  session('1', 'apple'),
  session('2', 'apple'),
  session('3', 'banana'),
  session('4', 'apple'),
  session('5', undefined)
];
