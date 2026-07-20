# Hawkins Market — Control Room Experience

Expérience événementielle cinématographique comprenant une homepage immersive, un compte à rebours piloté depuis l’administration, une préinscription Supabase, un escape game de trois épreuves, un diplôme haute définition et une salle de contrôle sécurisée.

> Projet indépendant. Aucun lien officiel avec Netflix, Stranger Things ou leurs ayants droit ne doit être revendiqué sans autorisation écrite.

## Fonctionnalités

### Site public

- introduction cinématographique facultative ;
- scène hero en profondeur avec motion design et portail 3D procédural ;
- compte à rebours synchronisé sur l’heure serveur ;
- bouton de destination débloqué automatiquement ou manuellement depuis l’admin ;
- formulaire d’avant-première réellement enregistré dans Supabase ;
- escape game configurable avec validation des réponses exclusivement côté serveur ;
- diplôme vertical 1080 × 1920 généré localement en PNG ;
- partage natif, téléchargement direct et vue plein écran de secours ;
- challenge TikTok activable depuis l’administration ;
- règlement, politique de confidentialité, mentions légales, sitemap et robots.

### Administration `/admin`

- connexion protégée par cookie HTTP-only signé ;
- tableau de bord alimenté par les données Supabase réelles ;
- recherche, filtrage, édition, sélection et export CSV des inscriptions ;
- programmation exacte de la date, de l’heure, du fuseau et de l’URL de lancement ;
- configuration complète de l’escape game ;
- configuration du diplôme et du challenge ;
- modification des contenus principaux ;
- analytics réels et journal d’audit ;
- diagnostic des variables et connexions sans exposition des secrets.

## Stack

- Next.js 16 App Router / React 19 / TypeScript strict ;
- Framer Motion ;
- Three.js avec React Three Fiber et Drei ;
- CSS sur mesure, responsive et accessible ;
- Supabase PostgreSQL via appels REST exclusivement côté serveur ;
- Zod pour les validations ;
- Vitest et Playwright ;
- Vercel pour la production.

## Installation locale

```bash
npm install
cp .env.example .env.local
npm run dev
```

Puis ouvrir `http://localhost:3000`.

## Variables Vercel obligatoires

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
NEXT_PUBLIC_SITE_URL=
```

La clé serveur Supabase et le mot de passe administrateur ne doivent jamais être ajoutés au dépôt ou préfixés par `NEXT_PUBLIC_`.

## Base de données

Les migrations sont versionnées dans `supabase/migrations/`.

Tables principales :

- `early_access_signups` ;
- `experience_events` ;
- `launch_settings` ;
- `game_settings` ;
- `contest_settings` ;
- `diploma_settings` ;
- `content_blocks` ;
- `game_sessions` ;
- `admin_audit_logs` ;
- vue `hawkins_experience_summary`.

Toutes les tables privées activent RLS et retirent les privilèges directs aux rôles `anon` et `authenticated`. Les opérations passent par les routes serveur avec la clé service role.

## Routes publiques

- `/` : expérience principale ;
- `/reglement` : état et règlement du challenge ;
- `/politique-confidentialite` ;
- `/mentions-legales`.

## Routes administrateur

- `/admin` ;
- `/admin/inscriptions` ;
- `/admin/lancement` ;
- `/admin/mission` ;
- `/admin/diplome` ;
- `/admin/concours` ;
- `/admin/contenus` ;
- `/admin/analytics` ;
- `/admin/journal` ;
- `/admin/parametres`.

## Modifier le lancement

1. Ouvrir `/admin/lancement`.
2. Choisir la date et l’heure dans le fuseau indiqué, par défaut `Europe/Paris`.
3. Entrer une destination HTTPS et le texte du bouton.
4. Enregistrer.
5. Le site public récupère la configuration sans nouveau déploiement.

Le mode « Déverrouiller maintenant » ignore temporairement la date. Le mode maintenance garde l’accès visible mais neutralise le bouton.

## Exporter les emails

Dans `/admin/inscriptions` :

- filtrer ou rechercher si nécessaire ;
- sélectionner des lignes pour les copier ;
- utiliser l’export CSV pour obtenir un fichier UTF-8 avec séparateur `;`, compatible avec Excel et les outils d’emailing usuels.

## Escape game

Les valeurs initiales sont :

- durée : 300 secondes ;
- codes acceptés : `7139`, `7193`, `7319`, `7391`, `1793`, `1739` ;
- objet correct : `eggo` ;
- séquence : `SUBJECT_011 → GATE_PROJECT → ACCESS_PROTOCOL` ;
- code promo : `HAWKINS10`.

Elles sont modifiables depuis `/admin/mission`, avec validation serveur empêchant les configurations impossibles. Les réponses, la séquence et le code promotionnel ne sont jamais inclus dans la configuration publique envoyée au navigateur.

## Tests et validation

```bash
npm run typecheck
npm test
npm run build
npm audit
```

La commande `npm test` exécute uniquement les tests unitaires ; les tests Playwright restent séparés via `npm run test:e2e`. Les tests unitaires couvrent la normalisation des codes, les six réponses autorisées, la séquence de fichiers, le formatage du chrono et le déverrouillage du lancement. Les scénarios Playwright sont prévus pour les parcours navigateur et doivent être exécutés dans un environnement disposant des navigateurs Playwright.

## Déploiement

1. Autoriser l’application GitHub à écrire dans `azuroservice-ctrl/hawkins-market`.
2. Pousser la branche `main`.
3. Importer le dépôt dans Vercel.
4. ajouter les variables d’environnement aux environnements Production et Preview ;
5. déployer ;
6. vérifier `/`, `/admin/login`, les APIs, l’inscription, l’export et le diplôme sur téléphone et ordinateur.
