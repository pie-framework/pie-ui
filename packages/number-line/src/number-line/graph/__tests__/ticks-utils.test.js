import * as mod from '../tick-utils';

describe('ticks', () => {
  const tt = (x, type) => ({ x, type });
  describe('buildTickData', () => {
    const assertTicks = (min, max, minor, major, expected) => {
      it(`${min}<->${max}, ${minor},${major} `, () => {
        //...
        const result = mod.buildTickData({ min, max }, { minor, major });

        // console.log('result', result);
        Object.keys(expected).forEach(i => {
          const a = expected[i];
          const index = parseInt(i, 10);
          const s = result.slice(index, index + a.length);
          expect(s).toEqual(a);
        });
      });
    };

    assertTicks(-2, 1, 0.2, 0.4, {
      0: [tt(-2, 'min'), tt(-1.8, 'minor'), tt(-1.6, 'major')]
    });

    assertTicks(-2, 1, 0.5, 1, {
      0: [tt(-2, 'min'), tt(-1.5, 'minor'), tt(-1, 'major'), tt(-0.5, 'minor')]
    });

    assertTicks(-2, 1, 0.1, 0.2, {
      0: [tt(-2, 'min'), tt(-1.9, 'minor'), tt(-1.8, 'major')],
      20: [tt(0, 'major')],
      28: [tt(0.8, 'major')] //, tt(0.9, 'minor'), tt(1, 'max')]
    });

    assertTicks(-100, 10, 8, 16, {
      0: [
        tt(-100, 'min'),
        tt(-92, 'minor'),
        tt(-84, 'major'),
        tt(-76, 'minor')
      ],
      14: [tt(10, 'max')]
    });

    assertTicks(0, 100, 1, 10, {
      0: [tt(0, 'min')],
      90: [tt(90, 'major')],
      100: [tt(100, 'max')]
    });

    // //limited
    assertTicks(0, 100, 50, 50, {
      0: [tt(0, 'min')],
      1: [tt(33.3, 'minor')],
      2: [tt(66.6, 'major')],
      3: [tt(99.9, 'minor')],
      4: [tt(100, 'max')]
    });
  });

  describe('snapTo', () => {
    const assertSnapTo = (min, max, interval, value, expected) => {
      it(`snaps ${value} to ${expected} with domain ${min}<->${max} with interval: ${interval} `, () => {
        const result = mod.snapTo(min, max, interval, value);
        expect(result).toEqual(expected);
      });
    };

    describe('with -10, -5, 0.5', () => {
      const a = assertSnapTo.bind(null, -10, -5, 0.5);
      a(-5.6, -5.5);
      a(-9.8, -10);
      a(-9.7, -9.5);
    });

    describe('with 0, 10, 0.25', () => {
      const a = assertSnapTo.bind(null, 0, 10, 0.25);
      a(1, 1);
      a(1.2, 1.25);
      a(0.2, 0.25);
      a(5.2, 5.25);
      a(5.125, 5.25);
      a(5.124, 5);
    });

    describe('with 0, 10, 1', () => {
      const a = assertSnapTo.bind(null, 0, 10, 1);
      a(0, 0);
      a(10, 10);
      a(100, 10);
      a(1, 1);
      a(1.2, 1);
      a(0.2, 0);
      a(5.2, 5);
      a(5.001, 5);
    });
  });
});
