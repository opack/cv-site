---
subtitle: Plateforme de référence pour professionnels du jeu de société. MVP fullstack livré à deux, avec environnements séparés, migrations déployées par CI et conventions outillées.
tags: [SvelteKit, Vercel, Supabase, PostgreSQL, GitHub Actions, Vitest, Playwright, husky, commitlint]
closingNote: Sans équipe ops, les environnements, les migrations et les garde-fous de commit ont été mis en place par les deux co-fondateurs.
---

#### Livraison & environnements

- Rendu serveur SvelteKit déployé sur Vercel, avec deux projets Supabase distincts pour la préproduction et la production
- Migrations de base de données déployées par GitHub Actions : un push sur `develop` les applique à la préproduction, un push sur `main` à la production
  - Les scripts du projet couvrent le cycle complet : génération des migrations par différentiel de schéma, des types TypeScript et du jeu de données de seed, et réinitialisation de la base locale.
- Contrôle en CI sur chaque pull request : la base Supabase locale est démarrée et les types générés doivent correspondre à ceux du dépôt, sinon le build échoue
  - Un changement de colonne casse donc la compilation avant d'atteindre une page.
- Logique en base versionnée dans les migrations : triggers pour les compteurs et les notifications, fonctions PL/pgSQL pour les recommandations
  - La cohérence ne dépend pas du client qui écrit et reste vraie si une écriture arrivait un jour d'ailleurs que de l'application (par exemple d'un script d'administration ou d'une future API). Le coût est que cette logique est moins facilement testable que du TypeScript.
- Tests unitaires (Vitest, avec couverture) et E2E (Playwright)
- Conventions outillées : `husky` et `commitlint` refusent les commits qui ne suivent pas la convention
  - Une convention de nommage documentée associe un suffixe de fichier à une nature de code, et des templates génèrent un service, un composant ou une route déjà conformes, fichier de test compris.

#### Résultats

- MVP livré, déployé et testable par de vrais prospects
- Projet arrêté faute de traction B2B suffisante : décision assumée et rapide
