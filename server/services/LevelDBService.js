import level from 'level';
import Promise from 'bluebird';

let db = level('./.data');

export default {

    put (key, val) {
        return new Promise(function (resolve, reject) {
            db.put(key, val, function (err) {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(1);
                }
            });
        });
    },

    get (key) {
        return new Promise(function (resolve, reject) {
            db.get(key, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    del (key) {
        return new Promise(function (resolve, reject) {
            db.del(key, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    },

    find (options) {
        return new Promise((resolve, reject) => {
            options = Object.assign({keys: true, values: true, limit: 20, fillCache: true}, options);
            if (options.prefix) {
                options.start = options.prefix;
                options.end = options.prefix.substring(0, options.prefix.length - 1) + String.fromCharCode(options.prefix[options.prefix.length - 1].charCodeAt() + 1);
            }

            let results = [];
            db.createReadStream(options).on('data', function (data) {
                results.push(data);
            }).on('error', function (err) {
                console.log('leveldb find error', err);
                return reject([]);
            }).on('close', function () {
            }).on('end', function () {
                return resolve(results);
            });
        });
    }

};
