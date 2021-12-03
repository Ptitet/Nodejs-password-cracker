# Nodejs-password-cracker
Un simple programme permettant de cracker des mots de passe par brute-force en ``sha256`` ou ``md5``.

C'est juste pour m'amuser parce que je m'ennuie. Et aussi, c'est intéressant de voir comment ça marche (même si en fait j'ai tout fait moi-même, donc c'est sûrement pas optimisé aux petits oignons).

## Installation
En tant que personne sensée tu n'installeras pas ce programme, car il existe des choses 5469876 fois mieux comme hashcat et compagnie...

Si vraiment tu veux tester cet incroyable programme, voici comment procéder :
- Installe Node.js v16 minimum (en vrai j'en sais rien pour la version, mais moi c'est ce que j'utilise)
- Oublie pas npm pour installer les dépendances
- Clone le repo, fork le ou fais ce que tu veux avec mais débrouille-toi pour avoir au moins le fichier ``passwd.js``
- Installe les dépendances : Si t'as pris aussi le package.json, alors tu fais juste ``npm i`` dans la console. Sinon, tu fais ``npm i crypto-js node``. Ces commandes sont bien évidemment à réaliser en étant dans le dossier du projet.

## Utilisation
Dans le fichier passwd.js, y'a une fonction ``crack(password, method)``. Comme tu l'as deviné avec ton esprit supérieur, cette fonction prend en paramètre une string contenant la hash à brute-force, et la méthode à utiliser pour brute-force (``sha256`` ou ``md5``) elle aussi contenu dans une string. Le hash doit bien évidemment correspondre à la fonction de hachage qui a été employée pour obtenir le hash d'entré.

Donc une fois que t'as entré un hash et une méthode en paramètre de la fonction ``crack()``, un petit ``node passwd.js`` dans la console (en étant toujours dans le dossier du projet), et le tour est joué.

Tout les 1 million de mots de passe testés, la programme log dans la console le mot de passe en cours de test et le nombre de tests déjà effectués (ce sera donc un multiple de 1 million). Quand il a fini, il log dans la console le mot de passe trouvé ainsi que le nombre de tentatives réalisées pour le trouver.

## Performances
Comme tu t'en doutes sûrement, ce programme n'est pas du tout performant pour cracker des mots de passe par brute-force. Si tu souhaites un truc sérieux, tourne-toi plutôt vers des logiciels sérieux et optimisés pour ça (mais attention c'est pas très très légale de cracker des mots de passe 😉).

Niveau test par secondes, il arrive à environ 333 333 t/s je dirais (en tout cas sur mon pc). Donc les logs des 1 million de tests se font à peu près toute les 3 secondes pour moi.

Pour te donner un indice de la lenteur de ce programme, il a mis environ 1h22 à cracker ce hash : ``ab4f63f9ac65152575886860dde480a1`` (md5). Ce super hash qui donne une impression de complexité et de difficulté de crackage par un ordinateur (comme tout les hashs en fait) correspond en fait à la string ``azerty``. Tout simplement.

Pour plus de performance, je suis en train de développer une version utilisant le module ``worker_threads`` de Nodejs. Cette version devrait donc amener plus de performances, mais bon c'est en cours de développement, et c'est même loin d'être terminé...

Si toutefois t'es intéressé(e), tu peux aller jeter un petit coup d'oeil dans la branche ``worker`` de ce repo : https://github.com/Ptitet/Nodejs-password-cracker/tree/worker (et si t'as du temps à perdre, un peu d'aide à coup de ``pull requests`` serait pas de refus... 👀).

### Pour finir...

Ben je crois que j'ai déjà tout dit hein...
