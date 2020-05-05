export function cached(fn) {
  const cache = Object.create(null);
  return function cachedFn(str) {
    const fnKey = `${fn.name}_${str}`.trim();
    const hit = cache[fnKey];
    return hit || (cache[fnKey] = fn(str));
  };
}

const arrayFrom = len => {
  const loopArr = new Array(len).join(',').split(',');
  return loopArr;
};
export const arrayFromCache = cached(arrayFrom);

export const getHeight = el => {
  let height = 0;
  if (el.getBoundingClientRect) {
    height = el.getBoundingClientRect().height;
  }
  if (!height) {
    height = Math.max(el.offsetHeight, el.clientHeight);
  }

  return height;
};

/* eslint-disable */
const supportCss3 = style => {
  let prefix = ['webkit', 'Moz', 'ms', 'o'],
    i,
    humpString = [],
    htmlStyle = document.documentElement.style,
    _toHumb = function(string) {
      return string.replace(/-(\w)/g, ($0, $1) => $1.toUpperCase());
    };

  for (i in prefix) {
    humpString.push(_toHumb(`${prefix[i]}-${style}`));
  }

  humpString.push(_toHumb(style));

  for (i in humpString) {
    if (humpString[i] in htmlStyle) return true;
  }

  return false;
};
export const supportCssCache = cached(supportCss3);
/* eslint-enable */

export const callExp = (main, exp) => {
  const layerList = exp.split('.').filter(Boolean);
  let value = null;
  try {
    value = layerList.reduce((prev, next) => prev[next], main);
  } catch (ex) {
    value = null;
  }
  return value;
};

export const Tween = {
  Linear(t, b, c, d) {
    return (c * t) / d + b;
  },
  Quad: {
    easeIn(t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOut(t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOut(t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
      return (-c / 2) * (--t * (t - 2) - 1) + b;
    }
  },
  Cubic: {
    easeIn(t, b, c, d) {
      return c * (t /= d) * t * t + b;
    },
    easeOut(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOut(t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
      return (c / 2) * ((t -= 2) * t * t + 2) + b;
    }
  }
};

export const accMult = (arg1, arg2) => {
  let m = 0;
  let s1 = arg1.toString();
  let s2 = arg2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {}
  try {
    m += s2.split('.')[1].length;
  } catch (e) {}
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
};

export const accSub = (arg1, arg2) => {
  let r1, r2, m, n;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
};

export const accAdd = (arg1, arg2) => {
  let r1, r2, m;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
};

export const accDiv = (arg1, arg2) => {
  let t1 = 0;
  let t2 = 0;
  let r1;
  let r2;
  try {
    t1 = arg1.toString().split('.')[1].length;
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length;
  } catch (e) {}
  r1 = Number(arg1.toString().replace('.', ''));
  r2 = Number(arg2.toString().replace('.', ''));
  return (r1 / r2) * Math.pow(10, t2 - t1);
};
