const { createHash } = require('crypto');

function hash(input, algo) {
    return createHash(algo).update(input).digest('hex');
}

async function crack(password, method) {

    const start = Date.now();

    const dico = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

    console.log(`Cracking ${password} (using ${method})...`);

    let guess = 'a';
    let eguess = hash(guess, method);
    let test = 1;

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
        eguess = hash(guess, method);
        if (test % 1000000 === 0) console.log(`Current test : ${guess} (${eguess})\nTest n°${test}`);
        test ++;
    }

    const time = Date.now() - start;

    console.log(`Your password is : ${guess}\nTime taken : ${time} ms\nTotal test : ${test}`);

    return process.exit(0);
}

// exemple de comment la fonction marche
crack('73b43f17232b391b9123adf40c1b65dd', 'md5');

//quelques petits hashs md5 qui sont là pour test
//ab = 187ef4436122d1cc2f40dc2b92f0eba0
//hell0 = 73b43f17232b391b9123adf40c1b65dd
//L0Zs = b01279944c7300116289e08b61be2149
//b9Z7 = 3fa0566ee34328a372276f8676cb7570
//aQ9 = aa771b7ed9bd1500fa8e24de7b05114a
