Pendant six ans chez EasyVista, j'ai construit et fait tourner la chaîne de livraison de toute la R&D : pipelines Jenkins, infrastructure AWS, migration des plateformes hébergées en interne, environnements de dev créés par scripts (environ 15 minutes) puis automatisés et jetables, avec Docker et Ansible (2-3 minutes, en libre-service). D'abord comme Technical Leader DevOps, puis en co-managant l'équipe de 11 personnes qui portait ce périmètre, budget compris : je raisonne en coût autant qu'en technique.

Mon réflexe : **supprimer l'opération manuelle, puis s'assurer qu'elle ne revienne pas**. Une règle qui repose sur la bonne volonté de chacun finit par être oubliée ; une règle appliquée par la chaîne tient.

Sur [**Envo**](https://envo.valdera.fr), mon app mobile en solo, c'est la même discipline : GitHub Actions, sourcemaps publiés à chaque version pour Sentry, règles de sécurité testées sur émulateur, migrations de données avec `--dry-run`. Résultat : **59 versions livrées en onze mois** sur trois plateformes.

Après deux ans en solo, je cherche une équipe où cette exigence est un enjeu quotidien : fiabiliser la livraison, outiller les développeurs et faire adopter les pratiques plutôt que les décréter.
