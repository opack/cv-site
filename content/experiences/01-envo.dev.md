---
title: Développeur fullstack Vue.js
subtitle: "Créateur d'Envo : app (mobile iOS & Android, web) de gestion de budget en Vue 3 / Quasar / TypeScript. Une codebase pour trois cibles, 6 langues, livraison continue sur les deux stores."
tags: [Vue.js, Quasar, TypeScript, Pinia, Vue Router, vue-i18n, Vite, Capacitor, Firebase, Sentry, Claude Code]
---

<script>
  import { Star } from '@lucide/svelte';
  import { figures } from '../figures';
</script>

#### Front-end Vue

- Vue 3 en Composition API (`<script setup>`), TypeScript, Quasar 2, Vite
- Logique réutilisable extraite en composables maison, état applicatif dans des stores Pinia, navigation avec Vue Router
- 6 langues (FR, EN, ES, DE, IT, PT-BR) avec vue-i18n
- Une seule codebase pour trois cibles (web, Android & iOS via Capacitor)
  - Le web est servi en SPA sur Netlify, les applications natives sont empaquetées par Capacitor depuis le même build. Chaque fonctionnalité est donc écrite, testée et corrigée une seule fois, au prix d'une couche d'abstraction là où les plateformes divergent réellement : achats in-app, notation in-app, identifiant d'appareil.

#### Back-end & architecture

- Historique de transactions en fenêtre glissante : pagination par curseur, cache en mémoire indexé par enveloppe et par classeur, écoute temps réel bornée à la fenêtre chargée
  - La première page charge les N transactions les plus récentes ; l'application retient le curseur Firestore du dernier document et la date de la plus ancienne affichée. L'écoute temps réel n'est pas posée sur toute la collection mais bornée à cette date, et rebranchée à chaque page supplémentaire. Sans cette borne, un compte de plusieurs années paierait en lectures et en mémoire l'intégralité de son historique pour afficher vingt lignes.
- Statistiques pré-calculées côté serveur par des Cloud Functions transactionnelles
  - Les agrégats par enveloppe, par période et par utilisateur sont maintenus à l'écriture par des Cloud Functions, dans des transactions Firestore idempotentes. Les écrans de statistiques lisent un document déjà agrégé : le coût de lecture reste constant quelle que soit la profondeur d'historique, au prix d'une dénormalisation qu'il faut garder cohérente lors des suppressions en cascade.
- Tests automatisés sur les règles de sécurité
  - Les règles Firestore portent les rôles et permissions par classeur, avec un invariant de membre unique qui empêche de se verrouiller hors de son propre contenu. Une suite Vitest de 68 tests sur les permissions et 12 sur le Storage est jouée sur émulateur Firebase, et importe la matrice de droits du code de production pour rester alignée avec elle.
- Migrations de données sur comptes actifs
  - Une trentaine de scripts d'administration et de backfill, tous bâtis sur le même squelette : documentation d'usage, `--dry-run` qui écrit ce qui changerait sans rien changer, confirmation interactive, `--force` pour les exécutions automatisées. Ils permettent de faire évoluer les données de comptes en service sans interruption ni perte.
- Monitoring des erreurs en production avec Sentry
  - Chaque version publie ses sourcemaps, ce qui rend une erreur de production lisible dans le code source plutôt que dans du bundle minifié, sur les trois plateformes. Sans support à qui déléguer, c'est ce qui évite de découvrir un incident par un avis sur les stores.

#### Produit

- Analyse de la concurrence, positionnement différenciant et réflexion marketing
- Conception produit et UX de bout en bout : parcours d'onboarding, tutoriels contextuels in-app, gamification (challenges, défis d'épargne)
- Modèle freemium à trois plans (Solo / Duo / Familio) : partage de foyer, permissions fines par classeur, gestion des droits entre membres
- Animation de communauté : Discord structuré (FAQ, forums de support, annonces de versions) et présence Bluesky

#### Workflow IA-first

- Utilisation de Windsurf fin 2025 puis adoption de Claude Code en février 2026
- `CLAUDE.md` comme référentiel vivant d'architecture et de règles de codage
- Travail découpé en specs, mode plan pour les décisions structurantes, agents parallèles sur chantiers disjoints, revue à chaque étape
- Skills et commandes custom pour standardiser les tâches récurrentes
  - Cinq commandes couvrent les gestes que je répétais à chaque livraison : ajouter une clé i18n dans les six fichiers de langue d'un coup, préparer le changelog d'une version, en dériver les notes de version du Play Store, ne mettre en zone d'index que les modifications du chantier en cours, et charger une fiche de chantier depuis Notion pour lancer l'analyse. Chacune encode une procédure que j'exécutais à la main, avec le risque d'oubli que ça suppose.
- Hooks pour poser des garde-fous
  - Les hooks s'exécutent autour des actions de l'agent, indépendamment de ce qu'il décide : préfixer chaque message de commit par l'identifiant du chantier en cours, refuser une édition qui sortirait du périmètre du dépôt, nommer la session d'après le chantier. L'intérêt est qu'une règle appliquée par le harnais ne dépend pas de la bonne volonté du modèle.
- Mémoire projet versionnée : décisions d'architecture et retours de revue capitalisés dans le dépôt

#### Résultats

- **Plus de {figures.envoAccounts} comptes créés, {figures.envoRating}/5 <Star class="inline-block h-[1em] w-[1em] align-[-0.15em]" aria-hidden="true" /> sur Android**
- **{figures.envoReleases} versions livrées en {figures.envoReleasePeriod}**, soit une tous les {figures.envoReleaseCadence} en moyenne, sur trois plateformes maintenues seul
- Rythme de livraison comparable à celui d'une petite équipe
