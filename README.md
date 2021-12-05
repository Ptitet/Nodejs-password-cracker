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
crack('b01279944c7300116289e08b61be2149', 'md5');
```

Donc une fois que t'as entré un hash et une méthode en paramètre de la fonction ``crack()``, un petit ``node passwd.js`` dans la console (en étant toujours dans le dossier du projet), et le tour est joué :

```
> node passwd.js
Cracking b01279944c7300116289e08b61be2149 (using md5)...
```

Tout les 1 million de mots de passe testés, la programme log dans la console le mot de passe en cours de test et le nombre de tests déjà effectués (ce sera donc un multiple de 1 million). Quand il a fini, il log dans la console le mot de passe trouvé ainsi que le nombre de tentatives réalisées pour le trouver.

```
Current test : dlic (7d6da928a715b35ca5931ba3e915283d)
Test n°1000000
Current test : hxre (26d6b8ec63f53828c6167abf4084225c)
Test n°2000000
Current test : KUss (0aa30f1be4dd63d6f9ccff9fb93ec11a)
Test n°9000000
etc...
Your password is : L0Zs
Time taken : 13315 ms
Total test : 9263439
```

## Performances
Comme tu t'en doutes sûrement, ce programme n'est pas du tout performant pour cracker des mots de passe par brute-force. Donc soit tu te tourne vers des programmes sérieux, soit tu ne crack pas de mots de passe parce que tu ne veux pas que le FBI vienne toquer chez toi. Mais si c'est juste pour t'amuser et voir comment ça marche, là c'est ok.

Niveau tests par secondes, il arrive à environ 714 610 t/s je dirais (en tout cas sur mon pc). Donc les logs des 1 million de tests se font à peu près toute les 1.23 secondes pour moi.

Pour te donner une indication sur la vitesse de ce programme, il a mis environ 30min 40s pour cracker ceci : ``ab4f63f9ac65152575886860dde480a1`` (md5). Ce super hash correspond à la string ``azerty``.

Pour essayer d'atteindre plus de performances, je suis en train de développer une version utilisant le module ``worker_threads`` de Nodejs. Cette version devrait donc être plus rapide, mais bon c'est en cours de développement, et c'est loin d'être terminé...

Si toutefois t'es intéressé(e), tu peux aller jeter un petit coup d'oeil dans la [branche ``worker``](https://github.com/Ptitet/Nodejs-password-cracker/tree/worker) de ce repo (et si t'as du temps à perdre, un peu d'aide à coup de ``pull requests`` ou d'``issues`` serait pas de refus... 👀).

## Et pour finir...
Ben je crois que j'ai déjà tout dit hein...
