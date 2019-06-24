import * as mod from '../tick-utils';
import * as math from 'mathjs';

describe('ticks', () => {
  describe('normalizeTicks', () => {
    it('?', () => {
      const result = mod.normalizeTicks(
        { min: 0, max: 1000 },
        { minor: 1, major: 10 }
      );

      expect(result).toMatchObject({
        minor: f(10, 1),
        major: f(20, 1)
      });
    });

    it('?', () => {
      const result = mod.normalizeTicks(
        { min: -2, max: 1 },
        { minor: 0.2, major: 0.4 }
      );

      expect(result).toMatchObject({
        minor: { s: 1, n: 1, d: 5 },
        major: { n: 2, d: 5, s: 1 }
      });
    });

    it('?', () => {
      const result = mod.normalizeTicks(
        { min: -2, max: 1 },
        { minor: 0.2, major: 0.5 },
        { limit: false }
      );

      expect(result).toMatchObject({
        minor: f(1, 5),
        major: f(2, 5)
      });
    });
  });

  const f = (n, d) => math.fraction(n, d);

  describe('fractionRange', () => {
    const assertFr = (start, end, interval, expected) => {
      it('..', () => {
        const result = mod.fractionRange(start, end, interval);
        //f(0, 1), f(6, 1), f(4, 1));
        expect(result).toEqual(expected); //[f(0, 1), f(4, 1)]);
      });
    };
    assertFr(f(-1, 2), f(-23, 10), f(-1, 2), [
      f(-2, 1),
      f(-3, 2),
      f(-1, 1),
      f(-1, 2)
    ]);
    assertFr(f(0, 1), f(-6, 1), f(-4, 1), [f(-4, 1), f(0, 1)]);
    assertFr(f(0, 1), f(-10, 1), f(-8, 1), [f(-8, 1), f(0, 1)]);
  });
  describe('zeroBasedRange', () => {
    const assertZbr = (start, end, interval, expected) => {
      it(`${start}, ${end}, ${interval} = ${expected}`, () => {
        const result = mod.zeroBasedRange(start, end, interval);
        expect(result).toEqual(expected);
      });
    };
    assertZbr(1.2, 2.3, 0.5, [f(3, 2), f(2, 1)]);
    assertZbr(-1.2, -2.3, -0.5, [f(-2, 1), f(-3, 2)]);
    // it('..', () => {
    //   const result = mod.zeroBasedRange(1, 6, 4);
    //   expect(result).toEqual([f(4, 1)]);
    // });

    // it('..negative', () => {
    //   const result = mod.zeroBasedRange(-1, -10, -8);
    //   expect(result).toMatchObject([f(-8, 1)]);
    // });
  });

  describe('simpleRange', () => {
    const assertSimpleRange = (start, end, interval, expected) => {
      it(`${start}, ${end}, ${interval} => ${expected}`, () => {
        const result = mod.simpleRange(start, end, interval);
        expect(result).toMatchObject(expected);
      });
    };
    assertSimpleRange(1, 10, 8, [f(1, 1), f(8, 1), f(10, 1)]);
    assertSimpleRange(-10, -1, 8, [f(-10, 1), f(-8, 1), f(-1, 1)]);
    assertSimpleRange(-10, 10, 8, [
      f(-10, 1),
      f(-8, 1),
      f(0, 1),
      f(8, 1),
      f(10, 1)
    ]);

    assertSimpleRange(-1, f(4, 3), f(1, 3), [
      f(-1, 1),
      f(-2, 3),
      f(-1, 3),
      f(0, 1),
      f(1, 3),
      f(2, 3),
      f(1, 1),
      f(4, 3)
    ]);

    assertSimpleRange(-1, 1, f(1, 2), [
      f(-1, 1),
      f(-1, 2),
      f(0, 1),
      f(1, 2),
      f(1, 1)
    ]);
  });

  const tt = (x, type) => ({ x, type });
  describe.only('buildTickData', () => {
    const assertTicks = (min, max, minor, major, opts, expected) => {
      expected = expected === undefined ? opts : expected;

      it(`${min}<->${max}, ${minor},${major} `, () => {
        //...
        const result = mod.buildTickData(
          { min, max },
          { minor, major },
          { limit: opts.limit }
        );

        // console.log('result', result);
        Object.keys(expected).forEach(i => {
          const a = expected[i];
          const index = parseInt(i, 10);
          const s = result.slice(index, index + a.length);
          expect(s).toEqual(a);
        });
      });
    };

    assertTicks(
      -5.3,
      -4,
      1,
      2,
      { limit: false },
      {
        0: [tt(-5, 'minor'), tt(-4, 'major')]
      }
    );
    // assertTicks(-5.3, 5, 1, 2, {
    //   0: [tt(-5, 'minor'), tt(-4, 'major')]
    // });
    // assertTicks(
    //   1.2,
    //   2.3,
    //   0.5,
    //   1.5,
    //   { limit: false },
    //   {
    //     0: [tt(1.5, 'major')]
    //   }
    // );

    // assertTicks(-2.4, 1, 0.9, 1.8, {
    //   0: [tt(-1.8, 'major')]
    // });
    // assertTicks(-2, 1, 0.9, 1.8, {
    //   0: [tt(-1.8, 'major')]
    // });

    // assertTicks(1, 10, 1, 2, {
    //   0: [tt(1, 'minor'), tt(2, 'major'), tt(3, 'minor'), tt(4, 'major')]
    // });

    // assertTicks(-2, 1, 0.5, 1, {
    //   0: [
    //     tt(-2, 'major'),
    //     tt(-1.5, 'minor'),
    //     tt(-1, 'major'),
    //     tt(-0.5, 'minor')
    //   ]
    // });

    // assertTicks(-2, 1, 0.1, 0.2, {
    //   0: [tt(-2, 'major'), tt(-1.9, 'minor'), tt(-1.8, 'major')],
    //   20: [tt(0, 'major')],
    //   28: [tt(0.8, 'major')] //, tt(0.9, 'minor'), tt(1, 'max')]
    // });

    // assertTicks(
    //   -10,
    //   10,
    //   4,
    //   8,
    //   { limit: false },
    //   {
    //     0: [
    //       tt(-10, 'minor'),
    //       tt(-8, 'major'),
    //       tt(-4, 'minor'),
    //       tt(0, 'major'),
    //       tt(4, 'minor'),
    //       tt(8, 'major')
    //     ]
    //   }
    // );

    // assertTicks(-100, 10, 8, 16, {
    //   0: [
    //     tt(-100, 'minor'),
    //     tt(-96, 'major'),
    //     tt(-88, 'minor'),
    //     tt(-80, 'major')
    //   ]
    // });

    // assertTicks(0, 100, 1, 10, {
    //   0: [tt(0, 'major')],
    //   90: [tt(90, 'major')],
    //   100: [tt(100, 'major')]
    // });

    // //limited to 100/3 + 200/3
    // assertTicks(0, 100, 50, 50, {
    //   0: [
    //     tt(0, 'major'),
    //     tt(33.333333333333336, 'minor'),
    //     tt(66.666666666666666, 'major')
    //   ]
    // });
  });

  describe('fractionSnapTo', () => {
    const assertSnapTo = (min, max, interval, value, expected) => {
      it(`snaps ${value} to ${expected} with domain ${min}<->${max} with interval: ${interval} `, () => {
        const result = mod.fractionSnapTo(
          math.fraction(min),
          math.fraction(max),
          math.fraction(interval),
          math.fraction(value)
        );
        // console.log('result:', result);
        expect(result).toEqual(math.fraction(expected));
      });
    };
    describe('with -10, 10, 0.1', () => {
      const a = assertSnapTo.bind(null, -10, 10, 0.1);
      a(-0.05, -0.1);
      a(-0.04, 0);
      a(-0.01, 0);
      a(0, 0);
      a(0.01, 0);
      a(0.02, 0);
      a(0.03, 0);
      a(0.04, 0);
      a(0.05, 0.1);
      a(-5.9, -5.9);
      a(-9.8, -9.8);
      a(-9.7, -9.7);
    });

    describe('with -10, -5, 0.5', () => {
      const a = assertSnapTo.bind(null, -10, -5, 0.5);
      a(-5.6, -5.5);
      a(-5.9, -6.0);
      a(-9.8, -10);
      a(-9.7, -9.5);
    });

    describe('with 0, 10, 0.25', () => {
      const a = assertSnapTo.bind(null, 0, 10, 0.25);
      a(1, 1);
      a(1.2, 1.25);
      a(0.2, 0.25);
      a(5.2, 5.25);
      a(5.2, 5.25);
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
