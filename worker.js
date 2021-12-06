const { parentPort } = require('worker_threads');
const { createHash } = require('crypto');
const { Console } = require('console');
const log = new Console(process.stdout, process.stderr);

function hash(input, algo) {
    return createHash(algo).update(input).digest('hex');
}

const dico = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

let firstMsg = true;
let algo, input, from, to;

parentPort.on('message', message => {
    //parentPort.postMessage({password: 'lol'});
    /*if (firstMsg) {
        console.log('helloooooooo');
        algo = message.algo;
        input = message.input;
        firstMsg = false;
    }*/
    log.log('hello');


    from = message.from;
    to = message.to;

    let eguess = hash(from, message.algo);
    let test = 1;

    log.log(eguess, input, eguess === input);

    while(eguess !== input) {
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
        eguess = hash(from, message.algo);
        log.log(`test n°${test}`);
        test++;
    }

    if (eguess === input) parentPort.postMessage({password: from});
    else parentPort.postMessage({request: true});

});