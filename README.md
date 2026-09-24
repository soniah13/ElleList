# ElleList

ElleList is a calm, personal routine and household task manager built with Expo and React Native.

## Tech stack

- JavaScript (no TypeScript)
- React Native with Expo
- Expo Router for file-based navigation
- ESLint using Expo configuration
- Supabase for email/password authentication and task persistence

## Install

Use Node.js LTS, then install dependencies:

    npm install

## Start the development server

    npm start

Target-specific commands:

    npm run android
    npm run ios
    npm run web

## Project structure

    app/                    Expo Router routes and tab navigation
      (tabs)/               Home, Routines, Insights, and Settings tabs
      _layout.js            Root navigator
      index.js              Redirect to the tabs
    src/
      components/           Reusable UI building blocks
      constants/            Theme, task model, and mock task data
            hooks/                Authentication and task data hooks
            lib/                  Supabase client and local-date utilities
            services/             Authentication and task data services
        supabase/
            migrations/           SQL schema and Row Level Security policies

## Implemented now

- Four-tab Expo Router navigation: Today, Routines, Insights, and Settings
- Email/password sign up and sign in
- Session persistence using AsyncStorage
- Supabase-backed Today task list with date filtering
- Task creation, editing, completion, and deletion
- Loading, empty, and user-friendly error states
- Theme tokens, screen wrapper, button, and task row
- Documented plain-JavaScript task shape

## Intentionally not implemented

- AI, voice input, pattern learning, widgets, and notifications
- Advanced recurrence generation and household member management
- API keys or third-party service integrations beyond Supabase

## Supabase setup

1. Create a Supabase project.
2. Copy `.env` to `.env` and set:

       EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
       EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key

   Use the publishable/anon client key only. Never put a service-role or secret key in the app.
3. Apply the database migration with the Supabase CLI:

       npx supabase db push

   The migration creates the `tasks` table, enables Row Level Security, and restricts every operation to the authenticated user's `user_id`.
4. Start the app with `npm start`.

The app restores the Supabase session on launch. Unauthenticated users see Sign In; authenticated users enter the protected tab navigator. Tasks flow from the Today screen through `useTasks`, into `taskService`, and then through the shared client in `src/lib/supabase.js`.

## Checks

    npm run lint
    npm run check
