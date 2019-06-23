import * as math from 'mathjs';
import uniqWith from 'lodash/uniqWith';

export const fractionSnapTo = (min, max, interval, value) => {
  value = fmax(fmin(value, max), min);
  const mod = value.mod(interval);
  let v;

  const half = interval.div(2);
  if (math.largerEq(math.abs(mod), half)) {
    const d = interval.sub(math.abs(mod));
    const fn = math.largerEq(value, 0) ? 'add' : 'sub';
    v = value[fn](d);
  } else {
    const fn2 = math.largerEq(value, 0) ? 'sub' : 'add';
    v = value[fn2](math.abs(mod));
  }
  return v;
};

export const snapTo = (min, max, interval, value) => {
  const out = fractionSnapTo(
    math.fraction(min),
    math.fraction(max),
    math.fraction(interval),
    math.fraction(value)
  );
  return math.number(out);
};

export const fractionRange = (start, end, interval) => {
  const m = math.mod(start, interval);
  if (!math.equal(m, 0)) {
    throw new Error('start point must be divisible by interval');
  }

  if (math.equal(start, end)) {
    return [];
  }

  const direction = math.larger(interval, 0) ? 'positive' : 'negative';
  const compareFn = direction === 'positive' ? math.smaller : math.larger;
  const out = [];

  out.push(start);

  let count = 0;
  do {
    count++;
    const m = math.multiply(interval, count);
    const next = math.add(start, m);
    out.push(next);
  } while (compareFn(out[out.length - 1], end));
  out.pop();
  if (direction === 'negative') {
    out.reverse();
  }
  return out;
};

export const zeroBasedRange = (start, end, interval) => {
  start = math.fraction(start);
  end = math.fraction(end);
  interval = math.fraction(interval);

  const length = math.abs(math.subtract(end, start));

  if (math.larger(length, math.abs(end))) {
    throw new Error('can only do a positive or negative range.');
  }

  const rawDiv = math.divide(start, interval);
  const flooredStart = math.floor(rawDiv);
  let r = fractionRange(math.multiply(flooredStart, interval), end, interval);

  if (!math.equal(flooredStart, rawDiv)) {
    if (math.larger(interval, 0)) {
      r.shift();
    } else {
      r.pop();
    }
  }
  return r;
};

const fmin = (a, b) => {
  a = math.fraction(a);
  b = math.fraction(b);
  return math.smaller(a, b) ? a : b;
};

const fmax = (a, b) => {
  a = math.fraction(a);
  b = math.fraction(b);
  return math.larger(a, b) ? a : b;
};

/**
 * the lodash range was causing too much variance in the rounding errors
 * such that it was hard to round the numbers.
 * This is a more simplistic version but makes rounding work.
 */
export const simpleRange = (start, end, interval) => {
  start = math.fraction(start);
  end = math.fraction(end);
  interval = math.fraction(interval);

  const positiveRange = math.larger(end, 0)
    ? zeroBasedRange(fmax(0, start), end, interval)
    : [];
  const negativeRange = math.smaller(start, 0)
    ? zeroBasedRange(fmin(0, end), start, math.multiply(interval, -1))
    : [];

  let together = negativeRange.concat(positiveRange);

  if (!math.equal(together[0], start)) {
    together = [start].concat(together);
  }

  if (!math.equal(together[together.length - 1], end)) {
    together = together.concat([end]);
  }

  const out = uniqWith(together, math.equal);
  return out; //uniqBy(together, isEqual);
};

export const closeTo = (a, b, precision) => {
  precision = precision || 2;
  const expectedDiff = Math.pow(10, -precision) / 2;
  const receivedDiff = Math.abs(a - b);
  return receivedDiff < expectedDiff;
};

const limit = (v, min, max) => {
  if (math.smaller(v, min)) {
    return min;
  }

  if (math.larger(v, max)) {
    return max;
  }

  return v;
};

export const minorLimits = domain => {
  const end = domain.max - domain.min;
  return {
    min: math.divide(math.fraction(end), 100),
    max: math.divide(math.fraction(end), 3)
  };
};

export const isMultiple = (multiple, src) => {
  const mod = math.mod(multiple, src);
  return math.equal(mod, 0);
};

export const normalizeTicks = (domain, ticks, opts) => {
  const l = opts ? opts.limit !== true : true;
  const end = math.fraction(domain.max - domain.min);
  const minor = l
    ? limit(
        math.fraction(ticks.minor),
        math.divide(end, 100),
        math.divide(end, 3)
      )
    : math.fraction(ticks.minor);
  const major = l
    ? limit(
        math.fraction(ticks.major),
        math.divide(end, 50),
        math.divide(end, 2)
      )
    : math.fraction(ticks.major);

  const m = isMultiple(major, minor);

  if (!m) {
    return { minor, major: math.multiply(minor, 2) };
  }

  return { major, minor };
};

/**
 * Build ticks as an array of mathjs Fractions
 */
export const buildTickDataAsFractions = (domain, ticks, opts) => {
  ticks = normalizeTicks(domain, ticks, opts);

  const rng = simpleRange(
    domain.min,
    math.add(domain.max, ticks.minor),
    ticks.minor
  );

  const o = rng
    .filter(x => math.smallerEq(x, domain.max))
    .map(x => {
      let type = 'minor';
      const modulo = math.mod(x, ticks.major);
      if (closeTo(math.number(modulo), 0)) {
        type = 'major';
      }

      return { x, type };
    });

  return o;
};

export const buildTickData = (domain, ticks, opts) => {
  const result = buildTickDataAsFractions(domain, ticks, opts);

  const out = result.map(o => ({ ...o, x: math.number(o.x) }));
  return out;
};

export const snapElements = (domain, ticks, elements) => {
  return elements.map(e => {
    const size = Number.isFinite(e.size)
      ? snapTo(0, e.size, ticks.minor, e.size)
      : undefined;
    const domainPosition = snapTo(
      domain.min,
      domain.max,
      ticks.minor,
      e.domainPosition
    );
    const out = { ...e, domainPosition };
    if (Number.isFinite(size)) {
      out.size = size;
    }
    return out;
  });
};
