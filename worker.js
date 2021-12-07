const { parentPort } = require('worker_threads');
const { createHash } = require('crypto');

const dico = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

/**
 * 
 * @param {String} input 
 * @param {String} algo 
 * @returns String
 */

function hash(input, algo) {
    return createHash(algo).update(input).digest('hex');
}

parentPort.on('message', message => {
    const { to, algo, input } = message;
    let { from } = message;

    let eguess = hash(from, algo);

    while(eguess !== input && from !== to) {
        let last = from[from.length - 1];
        if (last === '9') {
            let arr = from.split('');
            for (i in arr) {
                if (arr[arr.length - i - 1] === '9') {
                    arr.splice(arr.length - i - 1, 1, 'a');
                    if (!arr[arr.length - i - 2]) arr.unshift('a');
                    else if (!(arr[arr.length - i - 2] === '9')) {
                        arr.splice(arr.length - i - 2, 1, dico[dico.indexOf(arr[arr.length - i - 2]) + 1]);
                        break;
                    }
                }
            }
            from = arr.join('');
        } else from = `${from.slice(0, -1)}${dico[dico.indexOf(last) + 1]}`;
        eguess = hash(from, algo);
    }

    if (eguess === input) parentPort.postMessage({password: from});
    else parentPort.postMessage({request: true});
});