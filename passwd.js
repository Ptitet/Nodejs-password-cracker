const { createHash } = require('crypto');
const { Worker } = require('worker_threads');

const dico = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
let testrate = 0;

/**
 * 
 * @param {String} input 
 * @param {String} algo 
 * @returns String
 */

function hash(input, algo) {
    return createHash(algo).update(input).digest('hex');
}

/**
 * 
 * @param {String} input 
 * @returns String
 */

function next(input) {
    input = input.slice(0, input.length  - 4);
    let last = input[input.length - 1];
    if (last === '9') {
        let arr = input.split('');
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
        return `${arr.join('')}aaaa`;
    } else return `${input.slice(0, -1)}${dico[dico.indexOf(last) + 1]}aaaa`;
}

/**
 * 
 * @param {String} input 
 * @param {String} algo 
 * @param {Number} nbOfWorkers 
 */

function crack(input, algo, nbOfWorkers) {
    const start = Date.now();

    console.log(`Starting cracking ${input} (using ${algo})\nSpawning ${nbOfWorkers} workers...\n`);

    let from = 'a';
    let to = 'aaaaa';
    const workers = [];

    for (let i = 0; i < nbOfWorkers; i++) {
        const worker = new Worker('./worker.js');
        workers.push(worker);
        worker.on('message', message => {
            if (message.password) {
                const time = Date.now() - start;
                console.log(`\nWorker [${i}] found the password !\nPassword : ${message.password}\nTime taken : ${time} ms\nTestrate : ${Math.round(testrate / (time / 1000))} t/s`);
                workers.map(w => w.terminate());
                return process.exit(0);
            } else if (message.request) {
                worker.postMessage({from : from, to: to, input: input, algo: algo});
                console.log(`Restarting Worker [${i}] with interval ${from} - ${to} (work n°${message.intervals}) | Last testrate : ${Math.round(message.testrate)} t/s`);
                from = to;
                to = next(to);
                testrate += 14776337;
            }
        });
        worker.on('error', error => {
            console.error(`Error Worker [${i}] : ${error.name}\n${error.message}`);
        });
        worker.on('exit', code => {
            if (code !== 0) console.log(`Worker [${i}] has stopped with code ${code}`);
        });
        worker.postMessage({from: from, to: to, input: input, algo: algo});
        console.log(`Starting Worker [${i}] with interval ${from} - ${to} (work n°1)`);
        from = to;
        to = next(to);
    }
    console.log(`\nAll the worker are processing ${input} (using ${algo})\n`);
}

crack('ab4f63f9ac65152575886860dde480a1', 'md5', 7);

//azerty = ab4f63f9ac65152575886860dde480a1
//101010 = 6d071901727aec1ba6d8e2497ef5b709
//1aMmee = 380f2548550f4aee0249e2012ed1bd0d
//lkd74d = e16b34a828aed16aeeebd0fe97ff2bc1