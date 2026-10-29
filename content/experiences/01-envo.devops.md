---
subtitle: App de gestion de budget (iOS, Android, web). Pipeline de déploiement multi-environnements tenu seul, du back-end serverless à la SPA ; apps natives publiées depuis les IDE.
tags: [GitHub Actions, Firebase, Cloud Functions, Firebase Storage, Netlify, Capacitor, Sentry, Vitest, Claude Code]
---

#### Livraison & exploitation

- Pipeline de déploiement GitHub Actions vers trois environnements (development, staging, production), lancé à la demande sur une référence git
  - Un workflow réutilisable exécute en parallèle trois jobs : lint, build et déploiement des Cloud Functions Firebase ; build de la SPA avec création de la release Sentry, puis déploiement sur Netlify ; synchronisation des packs d'images. Chaque environnement GitHub porte ses variables et ses secrets, un verrou de concurrence interdit deux déploiements simultanés sur le même environnement, et les dépendances sont mises en cache entre les jobs.
  - La version de Node est épinglée au patch près : une régression de Node faisait échouer l'authentification de `firebase-tools` avec un message trompeur. La cause est documentée dans l'action pour que personne ne remonte la version sans le savoir.
- Applications natives : build Capacitor depuis le même code, publication sur les stores faite à part depuis les IDE
- Tests automatisés sur les règles de sécurité, joués sur émulateur Firebase
  - Une suite Vitest de 68 tests sur les permissions Firestore et 12 sur Firebase Storage. Elle importe la matrice de droits du code de production pour rester alignée avec elle.
- Monitoring des erreurs en production avec Sentry
  - Chaque version publie ses sourcemaps, ce qui rend une erreur de production lisible dans le code source plutôt que dans du bundle minifié, sur les trois plateformes. Sans support à qui déléguer, c'est ce qui évite de découvrir un incident par un avis sur les stores.
- Migrations de données sur comptes actifs
  - Une trentaine de scripts d'administration et de backfill, tous bâtis sur le même squelette : documentation d'usage, `--dry-run` qui écrit ce qui changerait sans rien changer, confirmation interactive, `--force` pour les exécutions automatisées. Ils permettent de faire évoluer les données de comptes en service sans interruption ni perte.
- Statistiques pré-calculées en serverless par des Cloud Functions Firebase transactionnelles, pour un coût de lecture constant quelle que soit la profondeur d'historique

#### Garde-fous automatisés

- Hooks appliqués par le harnais de l'agent IA, indépendamment de ce qu'il décide
  - Préfixer chaque message de commit par l'identifiant du chantier en cours, refuser une édition qui sortirait du périmètre du dépôt. Une règle appliquée par l'outil ne dépend pas de la bonne volonté du modèle.
- Skills et commandes custom pour les gestes répétés à chaque livraison : changelog de version, notes de version du Play Store, clés i18n dans les six langues
- `CLAUDE.md` et mémoire projet versionnés : règles de codage, décisions d'architecture et retours de revue capitalisés dans le dépôt

#### Résultats

- **59 versions livrées en onze mois**, soit une tous les six jours en moyenne, sur trois plateformes maintenues seul
- Près de 2 500 comptes créés, 4,6/5 sur Android
