# Nodejs-password-cracker : worker version

Ceci est la version utilisant le module ``worker_threads`` de Nodejs de mon programme pour cracker par brute-force des mots de passe hashé en ``md5`` ou en ``sha256``. Les performances sont meilleures que dans la version original, étant donné l'utilisation du multi-threading (grâce au module ``worker_threads``).

## Installation

En tant que personne sensée tu n'installeras pas ce programme, car il existe des choses 5469 fois mieux comme hashcat et compagnie... Et surtout c'est pas très très légal de brute-force des mots de passe (j'espère que je t'apprends rien).

Mais bon, si tu veux vraiment voir à quel point je suis doué en programmation, voici comment procéder :
- Installe Node.js v16 minimum (en vrai j'en sais rien pour la version, mais moi c'est ce que j'utilise)
- Oublie pas npm pour installer les dépendances
- Clone le repo, fork le ou fais ce que tu veux avec mais débrouille-toi pour avoir au moins les fichiers ``passwd.js`` et ``worker.js``
- Installe les dépendances : Si t'as pris aussi le package.json, alors tu fais juste ``npm i`` dans la console. Sinon, tu fais ``npm i node``. Ces commandes sont bien évidemment à réaliser en étant dans le dossier du projet.

## Principe de fonctionnement
Le fichier principal créé un certain nombre de worker, a qui il va repartir le boulot :
- Il envoie au premier worker deux strings, dont ce worker déduire un interval de mots de passe à tester (si le worker reçoit l'interval ``a - z`` par exemple, il va tester les mots de passe ``a``, ``b``, ``c``, ... jusqu'à ``z``)
- Le worker reçoit aussi le hash, et si il trouve le mot de passe correspondant, il le dit au fichier principal qui arrête le programme et log le mot de passe trouvé
- Lorsque qu'un worker à fini de chercher dans son interval et n'a pas trouvé le mot de passe, il demande au fichier principal un nouvel interval pour continuer son boulot
- Quand le fichier principale reçoit une demande d'un worker, il lui envoit un interval qu'il déduit d'un compteur lui servant à savoir ce qui à déjà été fait en terme de mots de passe. Puis il incrémente ce compteur pour se mettre à jour par rapport à l'interval qu'il a envoyé au worker

## Performances
Cette version est bien plus performante que la version monothread (voir la [branche main](https://github.com/Ptitet/Nodejs-password-cracker) de ce repo).

Niveau tests par seconde, cette version arrive à environ 4 119 470 t/s. Je n'espérais pas tellement de résultats spécifiques avec le multi-threading, mais là je suis plutôt content, même si ce chiffre n'est rien comparé aux 65 milliards de hashs par secondes (``md5``) réalisés par Hashcat avec une Nvidia RTX 3090 (franchement je me demande bien pourquoi y'a autant d'écart...)

En tout cas, pour cracker le hash de la string ``azerty`` (``md5``), le programme à mis environ 4min 54s, c'est donc à peu près 6 fois plus rapide que l'autre version qui met environ 30min 40s. Pour réaliser cela, 7 workers ont été utilisés.

D'ailleurs, au niveau du nombre de workers à utiliser, c'est donc avec 7 workers que j'ai eu les meilleures performances. Mon processeur était aux alentours des 30% d'utilisation, donc l'ordinateur reste largement utilisable. J'ai fait un test avec 32 workers, mais là, tu t'en doutes, le processeur n'y arrive pas et cela ralenti plus les choses que ça ne les accélère. Il faut donc trouver le juste milieu pour avoir le maximum de performances (logique).

## Pour finir...
Sinon comment ça va aujourd'hui ?