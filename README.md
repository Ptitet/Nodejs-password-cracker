# Nodejs-password-cracker : worker version

Ceci est la version utilisant le module ``worker_threads`` de Nodejs de mon programme pour cracker par brute-force des mots de passe hashé en ``md5`` ou en ``sha256``. Une fois fini, les performances seront sensées être meilleures que dans la version original, étant donné l'utilisation du multi-threading (grâce au module ``worker_threads``), mais pour l'instant c'est pas fini comme tu peux sûrement le constater en regarder le super code que j'ai fait.

## Installation
Pour l'installation, c'est tout simple : t'installe pas. Parce que c'est pas fini. Donc ça ne marche pas encore.

## Principe de fonctionnement
Le fichier principal créé un certain nombre de worker, a qui il va repartir le boulot :
- Il envoie au premier worker deux strings, dont ce worker déduire un interval de mots de passe à tester (si le worker reçoit l'interval ``a - z`` par exemple, il va tester les mots de passe ``a``, ``b``, ``c``, ... jusqu'à ``z``)
- Le worker reçoit aussi le hash, et si il trouve le mot de passe correspondant, il le dit au fichier principal qui arrête le programme et log le mot de passe trouvé
- Lorsque qu'un worker à fini de chercher dans son interval et n'a pas trouvé le mot de passe, il demande au fichier principal un nouvel interval pour continuer son boulot
- Quand le fichier principale reçoit une demande d'un worker, il lui envoit un interval qu'il déduit d'un compteur lui servant à savoir ce qui à déjà été fait en terme de mots de passe. Puis il incrémente ce compteur pour se mettre à jour par rapport à l'interval qu'il a envoyé au worker

## Performances
Cette version est bien plus performante que la version monothread (voir la [branche main](https://github.com/Ptitet/Nodejs-password-cracker) de ce repo).

Je n'ai pas calculé le nombre de tests par secondes mais si t'en as envie tu peux toujours le faire.

En tout cas, pour cracker ``azerty`` en utilisant 10 workers, le programme à mis environ 5min 24s, c'est donc à peu près 6 fois plus rapide que l'autre version.

## Pour finir...
Tout ce que j'ai dis plus haut est bien beau, mais pour l'instant je suis encore à la phase d'expérimentation du module ``worker_threads``, donc va falloir attendre un peu avant de voir la suite...