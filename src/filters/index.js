export default {
    number (value, precision = 0) {
        if (isNaN(Number(value))) {
            return value;
        }

        let v = value + '';
        precision = precision >= 0 && precision <= 20 ? precision : 2;
        if (v < 1000) {
            return parseFloat(v).toFixed(precision);
        }
        /* eslint-disable no-useless-escape */
        v = parseFloat((v).replace(/[^\d\.-]/g, '')).toFixed(precision);
        var l = v.split('.')[0].split('').reverse();
        var r = v.split('.')[1];
        var t = '';
        for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
        }
        if (precision === 0) {
            return t.split('').reverse().join('');
        }
        return t.split('').reverse().join('') + '.' + r;
    },
    asset (value, precision = 2) {
        if (isNaN(Number(value))) {
            return value || '0';
        }
        let v = value ? value + '' : '0';
        precision = v.indexOf('.') > -1 && v.split('.')[1].length || precision;
        if (precision > 5) {
            precision = 5;
        }
        /* eslint-disable no-useless-escape */
        v = parseFloat(v.replace(/[^\d\.-]/g, '')).toFixed(precision) + '';
        var l = v.split('.')[0].split('').reverse();
        var r = v.split('.')[1];
        var t = '';
        for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
        }
        if (precision === 0) {
            return t.split('').reverse().join('');
        }
        return t.split('').reverse().join('') + '.' + r;
    }
};
