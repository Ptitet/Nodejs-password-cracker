const { createHash } = require('crypto');
const { Worker } = require('worker_threads');

const dico = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

function hash(input, algo) {
    return createHash(algo).update(input).digest('hex');
}

function createWorker(path, id) {

    return new Promise((resolve, reject) => {
        const worker = new Worker(path);
        worker.id = id;
        resolve(worker);

        worker.on('online', () => {
            console.log('Worker ready');
        });

        worker.on('message', message => {
            if (message === 'starting') console.log('starting worker');
            else {
                console.log('passwd : ' + message);
                return process.exit(0);
            }
            
        });

        worker.on('error', reject);
        worker.on('exit', code => {
            if (code !== 0) reject(new Error(`Whoops\nWorker stopped with code ${code}`));
        });
    });
}

createWorker('./worker.js').then(worker => {
    console.log('gooo');
    worker.postMessage({from: 'a', to: '9999', hash: 'b01279944c7300116289e08b61be2149'});
});

function crack(input, algo, nbOfWorkers) {
    let from = 'a';
    let to = 'aaaaa';
    'aaaab -> baaaa';
    'baaab -> caaaa';
    for(let i = 0; i < 50000000; i++) {
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
            guess = arr.join('');
        } else {
            guess = `${guess.slice(0, -1)}${dico[dico.indexOf(last) + 1]}`;
        }
        eguess = hash(guess, 'md5');
    }
    let workers = [];
    for (i = 0; i < nbOfWorkers; i++) {
        createWorker('./worker.js').then(worker => {
            workers.push(worker);
            worker.postMessage({from: current, to: function() {
                
            }})
        });
    }
}

crack('b01279944c7300116289e08b61be2149', 'md5');

//ab = 187ef4436122d1cc2f40dc2b92f0eba0
//hell0 = 73b43f17232b391b9123adf40c1b65dd
//L0Zs = b01279944c7300116289e08b61be2149
//b9Z7 = 3fa0566ee34328a372276f8676cb7570
//aQ9 = aa771b7ed9bd1500fa8e24de7b05114a