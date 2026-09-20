# ElleList contributor guide

- Use JavaScript only. Do not add .ts or .tsx files.
- Build with Expo and Expo Router.
- Use functional React components and hooks.
- Keep components modular, small, and reusable.
- Do not add dependencies without a clear need.
- Do not add AI integrations unless explicitly instructed.
- Never expose API keys, tokens, or other secrets.
- Keep UI components free of database and service logic.
- Put future AI and external service code in src/services/; use src/lib/ only when shared infrastructure is needed.
- Preserve the flow: UI -> Hooks -> Services -> Supabase / AI APIs.
- Run npm run lint and npm run check before marking a feature complete.
