---
subtitle: Co-pilotage de l'équipe Link (CI/CD, infrastructure, outillage), fonction transverse dont dépend la livraison de toute la R&D.
tags: [Jenkins, AWS, CI/CD, Budget, Management]
---

#### Réalisations techniques

- Pipeline CI/CD (Jenkins) et infrastructure AWS câblés pour l'ensemble des équipes de développement
- La Forge : provisioning d'environnements dev/test, documentation et suivi du dépôt de sources, utilisée par les équipes dev, produit et test
  - Le provisioning à la carte visait à remplacer les environnements de développement existants et à servir tous les publics : démonstration, avant-vente, développement et recette. Il n'existait pas d'environnement de dev partagé, tout vivait sur les postes : les premiers ont été créés par scripts, puis automatisés et rendus jetables (build and burn), créés et détruits à la demande par l'outillage Jenkins (Jenkinsfile) puis piloté depuis La Forge. L'étape suivante portait sur l'outillage de gestion du parc lui-même (création et suppression, supervision, suivi des coûts) pour que la mise à disposition ne crée pas une dette d'exploitation.
- Recentrage de l'équipe Link sur son cœur de mission, avec passation organisée des activités périphériques à d'autres équipes
  - L'équipe était devenue le recours par défaut pour toute demande d'outillage, au point de se disperser. Le recentrage a consisté à trancher ce qui relevait réellement de Link, à organiser la passation du reste plutôt que de l'abandonner, et à ouvrir en parallèle un canal de communication et des retours d'expérience réguliers auprès des équipes clientes, ainsi qu'un lien avec les DevOps rattachés aux autres équipes.

#### Pilotage

- Animation de l'équipe de 11 personnes, suivi individuel, montée en compétence et autonomisation
- Gestion budgétaire : suivi des dépenses, projections et anticipation des besoins (recrutement, outillage, formation)
- Interface avec les équipes clientes internes et le comité de direction

#### Résultats

- Environnements de dev : de postes isolés à un environnement créé en 15 minutes par scripts, puis en 2-3 minutes une fois automatisé, en libre-service
- La Forge adoptée transversalement : 3 applications principales, plusieurs projets internes et POC
