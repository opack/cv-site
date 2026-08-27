---
title: Créateur & développeur fullstack
company: Envo
companyUrl: https://envo.valdera.fr
dateStart: '2025-02'
dateEnd: present
teamSize: Solo
subtitle: App (mobile iOS & Android, web) de gestion de budget par la méthode des enveloppes. 6 langues, 4 environnements, livraison continue sur les deux stores.
links:
  - label: Google Play
    url: https://play.google.com/store/apps/details?id=fr.valdera.envo
  - label: App Store
    url: https://apps.apple.com/fr/app/envo-budget-avec-enveloppes/id6760191494
tags: [Vue.js, Quasar, TypeScript, Firebase, Capacitor, Pinia, CI/CD, Claude Code]
---

<script>
  import { Star } from 'lucide-svelte';
</script>

**Produit**

- Conception produit et UX de bout en bout : parcours d'onboarding, tutoriels contextuels in-app, gamification (challenges, défis d'épargne)
- Modèle freemium à trois plans (Solo / Duo / Familio) : partage de foyer, permissions fines par classeur, gestion des droits entre membres
- Internationalisation dès la conception : **6 langues** (FR, EN, ES, DE, IT, PT-BR), ~1 550 clés, zéro littéral en dur dans le code
- Analyse concurrence, positionnement différenciant, réflexion marketing
- **Animation de communauté** : Discord structuré (FAQ, forums de support, annonces de versions) et présence Bluesky

**Développement & architecture**

- **Codebase unique Vue 3 / Quasar 2 / TypeScript strict** livrée sur trois cibles : SPA web (Netlify) et applis natives Android / iOS via Capacitor
- **Accès aux données en trois couches** : store Pinia (règles métier, listeners temps réel) → data source (API Firestore) → converter (mapping bidirectionnel typé). Aucun composant ne touche Firebase directement : le modèle applicatif reste indépendant du schéma de persistance
- **Liste de transactions à fenêtre glissante** : cache normalisé en mémoire indexé par enveloppe et par classeur, pagination curseur, listener temps réel réattaché à chaque page, écritures optimistes réconciliées à la confirmation serveur
- **Agrégats dénormalisés** (statistiques par enveloppe, par période, par utilisateur) maintenus par des Cloud Functions dans des transactions Firestore idempotentes, pour des écrans de stats en lecture directe plutôt qu'en recalcul
- **Sécurité serveur** : 550 lignes de règles Firestore (rôles et permissions par classeur, invariants métier), couvertes par une suite de tests automatisés sur l'émulateur Firebase
- **Back-end Cloud Functions TypeScript** : webhook RevenueCat, cascades de suppression, purges planifiées, entitlements de foyer — abstraction `IRevenueCatProvider` (implémentations web / natif) pour une logique d'abonnement unique sur les trois plateformes
- **CI/CD GitHub Actions** paramétré par environnement (`emulators`, `development`, `staging`, `production`) : build, déploiement des functions, des règles et des assets, authentification OIDC vers GCP, verrou de concurrence par environnement
- **Outillage d'exploitation** : une trentaine de scripts d’administration et de migration de données normalisés (`--dry-run`, confirmation, `--force`), pour faire évoluer le schéma en production sans interruption de service
- Qualité : ESLint (dont règles i18n et alias d'imports), `vue-tsc` strict, Prettier, monitoring **Sentry** avec sourcemaps par release

**Workflow IA-first**

- **Claude Code au cœur du quotidien de dev** : `CLAUDE.md` comme référentiel architectural et règles de codage vivant, mis à jour au fil des revues ; mode plan + Opus pour les décisions structurantes ; tâches découpées en specs ; agents parallèles sur chantiers disjoints ; revue et correction à chaque étape
- **Skills et commandes custom** pour standardiser les tâches récurrentes (ajout de clé i18n multilingue, changelogs, notes de version stores, staging sélectif des hunks)
- **Hooks Claude Code** pour automatiser le préfixage des commits par US et bloquer les édits hors périmètre
- **Mémoire projet versionnée** (`.claude/memory/`) : décisions d'architecture et retours de revue capitalisés dans le dépôt, disponibles à chaque session

**Résultats**

- **Près de 2 400 comptes créés, 4,6/5 <Star class="inline-block h-[1em] w-[1em] align-[-0.15em]" aria-hidden="true" /> sur Android**
- Trois plateformes et quatre environnements maintenus seul, en livraison continue
- Rythme de livraison comparable à celui d'une petite équipe
