---
subtitle: "Industrialisation de la livraison pour une équipe de 22 développeurs : plateformes, pipelines, conteneurs, outillage qualité, installés dans la durée."
tags: [Jenkins, Docker, Ansible, Vagrant, AWS, VPN, ELK, SonarQube, Azure DevOps, CI/CD]
---

#### Réalisations

- Migration des plateformes historiques, hébergées sur VMware, vers AWS et automatisation de la génération d'une version
  - Le parc de plateformes de développement et de test était hébergé en interne. La migration vers AWS, menée sur plusieurs exercices, a permis de libérer la salle serveur, et l'automatisation de la génération d'une version a supprimé une opération manuelle jusque-là répétée à chaque livraison.
- Industrialisation des processus : génération de plateformes (Ansible, Vagrant), pipelines CI/CD (Jenkinsfile), scripting Bash et PowerShell
- Conteneurisation des environnements de développement avec Docker et Docker Compose, builds multi-stage pour des images finales allégées, images publiées sur ECR, Artifactory et Nexus
- Stockage, accès et secrets AWS : S3, IAM, Secrets Manager
- Mise en place d'un VPN pour le travail à distance des développeurs et de la MOA
- Centralisation des logs applicatifs et des machines EC2 des environnements de dev avec la pile ELK (Logstash)
- Outillage qualité et automatisation : SonarQube, Azure DevOps, tests E2E Ranorex
  - La normalisation des processus du service s'est faite outil par outil sur plusieurs années : gestion de sources, analyse statique du code. Chaque brique n'avait d'intérêt qu'adoptée, ce qui a demandé autant de pédagogie que de mise en œuvre.
- Process de revue et de validation de code, SDLC
- Veille et choix techniques structurants, formation et transmission

#### Résultats

- Salle serveur libérée à l'issue de la migration des plateformes historiques
- Travail à distance débloqué pour les développeurs et la MOA
- Baisse observée du nombre de régressions après la mise en place des process de revue et de l'outillage qualité
