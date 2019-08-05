const xy = (x, y) => ({ x, y });

const parabola = () => ({
  type: 'parabola',
  root: { x: 2, y: 2 },
  edge: { x: -1, y: 1 }
});
const sine = () => ({ type: 'sine', root: xy(-5, 0), edge: xy(-4, 1) });
module.exports = [
  {
    id: '1',
    element: 'graphing-el',
    answer: [{ type: 'point', x: 0, y: 0 }, parabola(), sine()]
  }
];
