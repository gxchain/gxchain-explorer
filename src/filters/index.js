export default {
    number (value, precision = 0) {
        value = value + '';
        if (isNaN(Number(value))) {
            return value;
        }
        precision = precision >= 0 && precision <= 20 ? precision : 2;
        /* eslint-disable no-useless-escape */
        value = parseFloat((value + '').replace(/[^\d\.-]/g, '')).toFixed(precision) + '';
        var l = value.split('.')[0].split('').reverse();
        var r = value.split('.')[1];
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
        if (!value) {
            value = '0';
        }
        value = value + '';
        precision = value.indexOf('.') > -1 && value.split('.')[1].length || precision;
        if (precision > 5) {
            precision = 5;
        }
        /* eslint-disable no-useless-escape */
        value = parseFloat(value.replace(/[^\d\.-]/g, '')).toFixed(precision) + '';
        var l = value.split('.')[0].split('').reverse();
        var r = value.split('.')[1];
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
