# Hawkins Market — consignes de contribution

- Ne jamais commiter de secret, de `.env.local`, de clé service role ou de mot de passe.
- Conserver l’administration séparée visuellement du site public, mais reliée à la même configuration Supabase.
- Toute écriture sensible doit rester côté serveur et exiger une session administrateur.
- Toute nouvelle table publique doit activer RLS et recevoir des politiques ou révocations explicites.
- Ne pas introduire d’asset tiers sans licence vérifiée.
- Respecter `prefers-reduced-motion`, le clavier, les zones tactiles et le mobile.
- Avant un merge : `npm run typecheck`, `npm test`, `npm run build`, puis vérification des advisors Supabase.
- Le compte à rebours public doit rester contrôlable sans redéploiement.
- Ne jamais afficher des statistiques fictives en production.
