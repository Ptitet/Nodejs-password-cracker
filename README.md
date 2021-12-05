# Nodejs-password-cracker
Un simple programme permettant de cracker des mots de passe par brute-force en ``sha256`` ou ``md5``.

C'est juste pour m'amuser parce que je m'ennuie. Et aussi, c'est intéressant de voir comment ça marche (même si en fait j'ai tout fait moi-même, donc c'est sûrement pas optimisé aux petits oignons).

## Installation
En tant que personne sensée tu n'installeras pas ce programme, car il existe des choses 5469876 fois mieux comme hashcat et compagnie... Et surtout c'est pas très très légal de brute-force des mots de passe (j'espère que je t'apprends rien).

Mais bon, si tu veux vraiment voir à quel point je suis doué en programmation, voici comment procéder :
- Installe Node.js v16 minimum (en vrai j'en sais rien pour la version, mais moi c'est ce que j'utilise)
- Oublie pas npm pour installer les dépendances
- Clone le repo, fork le ou fais ce que tu veux avec mais débrouille-toi pour avoir au moins le fichier ``passwd.js``
- Installe les dépendances : Si t'as pris aussi le package.json, alors tu fais juste ``npm i`` dans la console. Sinon, tu fais ``npm i node``. Ces commandes sont bien évidemment à réaliser en étant dans le dossier du projet.

## Utilisation
Dans le fichier passwd.js, y'a une fonction ``crack(password, method)``. Comme tu l'as deviné avec ton esprit supérieur, cette fonction prend en paramètre une string contenant le hash à brute-force, et la méthode à utiliser pour brute-force (``sha256`` ou ``md5``) qui elle aussi contenue dans une string. La méthode doit bien évidemment correspondre à la fonction de hachage qui a été employée pour obtenir le hash d'entrée :

```js
crack('0cc175b9c0f1b6a831c399e269772661', 'md5');
```

Donc une fois que t'as entré un hash et une méthode en paramètre de la fonction ``crack()``, un petit ``node passwd.js`` dans la console (en étant toujours dans le dossier du projet), et le tour est joué :

```
>> node passwd.js
Cracking 0cc175b9c0f1b6a831c399e269772661 (using md5)...
```

Tout les 1 million de mots de passe testés, la programme log dans la console le mot de passe en cours de test et le nombre de tests déjà effectués (ce sera donc un multiple de 1 million). Quand il a fini, il log dans la console le mot de passe trouvé ainsi que le nombre de tentatives réalisées pour le trouver.

## Performances
Comme tu t'en doutes sûrement, ce programme n'est pas du tout performant pour cracker des mots de passe par brute-force. Donc soit tu te tourne vers des programmes sérieux, soit tu ne crack pas de mots de passe parce que tu ne veux pas que le FBI vienne toquer chez toi. Mais si c'est juste pour t'amuser et voir comment ça marche, là c'est ok.

## Et pour finir...
Ben je crois que j'ai déjà tout dit hein...
