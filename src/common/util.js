export function cached (fn) {
    const cache = Object.create(null);
    return function cachedFn (str) {
        const fnKey = `${fn.name}_${str}`.trim();
        const hit = cache[fnKey];
        return hit || (cache[fnKey] = fn(str));
    };
}

const arrayFrom = (len) => {
    const loopArr = new Array(len).join(',').split(',');
    return loopArr;
};
export const arrayFromCache = cached(arrayFrom);

export const getHeight = (el) => {
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
const supportCss3 = (style) => {
    let prefix = ['webkit', 'Moz', 'ms', 'o'],
        i,
        humpString = [],
        htmlStyle = document.documentElement.style,
        _toHumb = function (string) {
            return string.replace(/-(\w)/g, ($0, $1) => $1.toUpperCase());
        };

    for (i in prefix) { humpString.push(_toHumb(`${prefix[i]}-${style}`)); }

    humpString.push(_toHumb(style));

    for (i in humpString) { if (humpString[i] in htmlStyle) return true; }

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
    Linear (t, b, c, d) {
        return c * t / d + b;
    },
    Quad: {
        easeIn (t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOut (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
    },
    Cubic: {
        easeIn (t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOut (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    }
};
