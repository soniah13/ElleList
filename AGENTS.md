# ElleList contributor guide

- Use JavaScript only. Do not add .ts or .tsx files.
- Build with Expo and Expo Router.
- Use functional React components and hooks.
- Keep components modular, small, and reusable.
- Do not add dependencies without a clear need.
- Do not add AI integrations unless explicitly instructed.
- Never expose API keys, tokens, or other secrets.
- Keep UI components free of database and service logic.
- Put authentication and task data access in `src/services/`; use `src/lib/` for shared infrastructure such as the Supabase client and date utilities.
- Preserve the flow: UI -> Hooks -> Services -> Supabase / AI APIs.
- Keep all task queries in `src/services/taskService.js` and all auth queries in `src/services/authService.js`.
- Use `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` for client configuration. Never use service-role or secret keys in the mobile app.
- Apply database changes through SQL migrations in `supabase/migrations/` and preserve Row Level Security.
- Run npm run lint and npm run check before marking a feature complete.
