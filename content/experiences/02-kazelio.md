---
title: Co-fondateur & développeur fullstack
company: Kazelio
dateStart: '2024-01'
dateEnd: '2025-01'
teamSize: 2 co-fondateurs
subtitle: Plateforme de référence et partage pour professionnels du jeu de société. MVP fullstack SvelteKit / Supabase livré à deux.
tags: [Svelte, SvelteKit, TypeScript, TailwindCSS, Supabase, PostgreSQL, Zod, Playwright]
closingNote: Expérience qui a consolidé ma capacité à cadrer un produit de bout en bout (du business plan au MVP livré) et à le confronter lucidement au terrain.
---

#### Produit

- Vision produit, roadmap, priorisation des fonctionnalités
- Périmètre du MVP : annuaire des acteurs pros, catalogue de jeux et d'événements, volet réseau social et statistiques d'activité
  - Une trentaine de tables couvrent les jeux et leurs relations, les crédits et récompenses, les organisations et leurs adresses, les événements, les collections, les publications et leurs commentaires. Le pari du produit était que ces données de référence, aujourd'hui éparpillées, valent surtout par les liens entre elles, d'où le catalogue relationnel plutôt qu'un simple annuaire.
- Supervision d'une étude de marché externalisée, analyse concurrence, business plan
- Confrontation terrain : salon professionnel, canal Discord d'une communauté de prospects

#### Développement & architecture

- MVP fullstack développé à deux : SvelteKit (SSR), TypeScript strict, TailwindCSS, Supabase
  - Rendu serveur déployé sur Vercel, deux projets Supabase distincts pour la préproduction et la production. Les types TypeScript sont générés depuis le schéma Postgres, ce qui fait qu'un changement de colonne casse la compilation avant d'atteindre une page.
- Un fil d'actualité unique piloté par un modèle de filtres composables
  - Chaque dimension de filtrage (jeu, événement, organisation, pertinence, tri) est une classe qui sait contribuer sa clause à la requête Supabase en cours. Un objet de filtre se construit à partir du chemin et des paramètres de navigation, puis compose les clauses correspondantes. Conséquence : le même composant de fil sert les pages jeu, événement, organisation et le tableau de bord, au lieu d'une variante de feed par page à maintenir en parallèle.
- Recommandations calculées en base : jeux proches par tags, par gamme de produits ou par personnes créditées
  - Quatre fonctions PL/pgSQL portent le rapprochement, une par critère de proximité. Le calcul reste au plus près des données et revient en une requête, là où l'équivalent côté client supposerait de rapatrier le catalogue puis de le filtrer. Le coût est de garder cette logique versionnée dans les migrations, et donc testable moins facilement que du TypeScript.
- Compteurs et notifications maintenus par triggers Postgres
  - Les votes sur les publications et sur les événements, ainsi que la génération des notifications de commentaire, sont maintenus par des triggers sur insertion, mise à jour et suppression. La cohérence ne dépend donc pas du client qui écrit et reste vraie si une écriture arrivait un jour d'ailleurs que de l'application (par exemple d'un script d'administration ou d'une future API).
- Conventions outillées
  - Une convention de nommage documentée associe un suffixe de fichier à une nature de code, et des templates génèrent un service, un composant ou une route déjà conformes, fichier de test compris. `husky` et `commitlint` refusent les commits qui ne suivent pas la convention.

#### Résultats

- MVP livré, déployé et testable par de vrais prospects
- Boucle de feedback terrain mise en place avec des professionnels du secteur
- Projet arrêté faute de traction B2B suffisante : décision assumée et rapide
