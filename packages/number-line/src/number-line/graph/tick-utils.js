import range from 'lodash/range';
import * as math from 'mathjs';
import Decimal from 'decimal.js-light';

let mkRange = (min, max, interval) => {
  let raw = range(min, max, interval);
  /* Fix the last step due to rounding errors */
  raw.splice(raw.length, 1, max);
  return raw;
};

export function snapTo(min, max, interval, value) {
  if (value >= max) {
    return max;
  }

  if (value <= min) {
    return min;
  }

  let rng = mkRange(min, max, interval);

  rng = rng.filter(v => {
    return Math.abs(value - v) <= interval;
  });

  const [below, above] = rng;

  const belowDiff = Math.abs(below - value);
  const aboveDiff = Math.abs(above - value);
  return belowDiff < aboveDiff ? below : above;
}

const rounded = v => {
  const f = math.format(v, { precision: 14 });
  const o = parseFloat(f);
  return o;
};

/**
 * the lodash range was causing too much variance in the rounding errors
 * such that it was hard to round the numbers.
 * This is a more simplistic version but makes rounding work.
 */
export const r = (start, end, interval) => {
  if (end < start) {
    throw new Error('start must be less than end');
  }

  if (end === start) {
    return [];
  }

  const out = [];

  out.push(start);
  let count = 0;
  do {
    count++;
    out.push(start + interval * count);
  } while (out[out.length - 1] < end);
  out.pop();
  return out;
};

export const closeTo = (a, b, precision) => {
  precision = precision || 2;
  const expectedDiff = Math.pow(10, -precision) / 2;
  const receivedDiff = Math.abs(a - b);
  return receivedDiff < expectedDiff;
};

const limit = (v, min, max) => rounded(Math.min(Math.max(v, min), max));

export const minorLimits = domain => {
  const end = domain.max - domain.min;
  return {
    min: rounded(end * 0.01),
    max: rounded(end * 0.333)
  };
};

export const isMultiple = (multiple, src) => {
  const d = new Decimal(multiple);
  const mod = d.mod(src);
  return mod.isZero();
};

export const limitTicks = (domain, ticks) => {
  const end = domain.max - domain.min;

  const minor = limit(ticks.minor, end * 0.01, end * 0.333);
  const major = limit(ticks.major, end * 0.02, end * 0.5);

  const m = isMultiple(major, minor);

  if (!m) {
    return { minor, major: minor * 2 };
  }

  return { major, minor };
};

export function buildTickData(domain, ticks) {
  const end = domain.max - domain.min;

  ticks = limitTicks(domain, ticks);

  const rng = r(domain.min - domain.min, end + ticks.minor, ticks.minor);
  const roundRng = rng.map(raw => ({
    raw: rounded(raw),
    x: rounded(raw + domain.min)
  }));

  const o = roundRng
    .filter(n => n.x < domain.max)
    .map(n => {
      let type = 'minor';

      const modulo = new Decimal(n.raw).mod(rounded(ticks.major));
      const roundModulo = rounded(modulo);
      if (closeTo(roundModulo, 0)) {
        type = 'major';
      }

      if (n.x === domain.min) {
        type = 'min';
      }

      return { x: n.x, type };
    });

  return o.concat([{ x: domain.max, type: 'max' }]);
}
