const {SHA512: sha512, MD5: md5, SHA256: sha256} = require('crypto-js');
const { Worker } = require('worker_threads');

function createWorker(path) {

    return new Promise((resolve, reject) => {
        const worker = new Worker(path);
        resolve(worker);

        worker.on('online', () => {
            console.log('Worker ready');
        });

        worker.on('message', message => {
            if (message === 'starting') console.log('starting worker');
            else {
                console.log('passwd : ' + message);
                process.exit(0);
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

crack(md5('azerty').toString(), 'md5');

//ab = 187ef4436122d1cc2f40dc2b92f0eba0
//hell0 = 73b43f17232b391b9123adf40c1b65dd
//L0Zs = b01279944c7300116289e08b61be2149
//b9Z7 = 3fa0566ee34328a372276f8676cb7570
//aQ9 = aa771b7ed9bd1500fa8e24de7b05114a