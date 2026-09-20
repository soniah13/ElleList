# ElleList

ElleList is a calm, personal routine and household task manager. This repository contains the first mobile-app foundation only: a simple daily task prototype and the navigation structure it will grow into.

## Tech stack

- JavaScript (no TypeScript)
- React Native with Expo
- Expo Router for file-based navigation
- ESLint using Expo configuration

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
      hooks/                Local UI state hooks

## Implemented now

- Four-tab Expo Router navigation: Today, Routines, Insights, and Settings
- Home dashboard with date, welcome message, mock tasks, category badges, and an Add task placeholder
- Local-only task completion toggles
- Theme tokens, screen wrapper, button, and task row
- Documented plain-JavaScript task shape and realistic mock data

## Intentionally not implemented

- Task creation, editing, deletion, or persistence
- Authentication, accounts, or database integration
- AI, voice input, pattern learning, widgets, and notifications
- API keys or third-party service integrations

## Checks

    npm run lint
    npm run check
