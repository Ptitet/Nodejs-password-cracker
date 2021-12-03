const { parentPort } = require('worker_threads');
const {MD5: md5} = require('crypto-js');

const dico = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

parentPort.on('message', message => {
    parentPort.postMessage('starting');
    let guess = message.from;
    let eguess = md5(guess).toString();
    const password = message.hash;

    while(eguess !== password) {
        let last = guess[guess.length - 1];
        if (last === '9') {
            let arr = guess.split('');
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
            guess = arr.join('');
        } else {
            guess = `${guess.slice(0, -1)}${dico[dico.indexOf(last) + 1]}`;
        }
        eguess = md5(guess).toString();
    }

    parentPort.postMessage(guess);
});