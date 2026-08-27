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

**Produit**

- Vision produit, roadmap, priorisation des fonctionnalités
- Périmètre du MVP : annuaire des acteurs pros, catalogue de jeux et d'événements, volet réseau social et statistiques d'activité
- Supervision d'une étude de marché externalisée, analyse concurrence, business plan
- Confrontation terrain : salon professionnel, canal Discord d'une communauté de prospects

**Développement & architecture**

- **MVP fullstack développé à deux** : SvelteKit (SSR), TypeScript strict, TailwindCSS, Supabase
- **Modèle de données Postgres versionné** : **85 migrations SQL** jouées de l'environnement local à la production, schéma faisant foi
- **Sécurité au niveau de la base** : Row Level Security activée sur l'ensemble des tables, **une centaine de policies** — l'autorisation vit dans Postgres, pas dans le code applicatif
- **Logique métier en base** : fonctions PL/pgSQL et triggers pour les recommandations (jeux similaires par tags, gamme, crédits), les compteurs de votes et la génération de notifications
- **Typage bout-en-bout** : types TypeScript générés depuis le schéma Postgres, propagés du SQL jusqu'aux composants — un changement de colonne casse la compilation, pas la production
- **Authentification SSR** via hooks SvelteKit : validation du JWT côté serveur à chaque requête, sessions par cookie, gardes de routes centralisées
- **Formulaires typés et validés** : une vingtaine de schémas Zod partagés client / serveur via superforms, une seule source de vérité pour la validation
- **Temps réel** : notifications poussées par Supabase Realtime sur souscription filtrée par utilisateur
- Qualité et industrialisation : tests **Playwright** (e2e et composants) avec audits d'accessibilité **axe-core**, tests unitaires Vitest, `husky` + `commitlint` sur les commits, générateur de services par scaffolding, i18n typé (FR / EN)

**Résultats**

- MVP livré, déployé et testable par de vrais prospects
- Boucle de feedback terrain mise en place avec des professionnels du secteur
- Projet arrêté faute de traction B2B suffisante — décision assumée et rapide
