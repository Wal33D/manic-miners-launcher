# Roadmap

Below is a detailed 5‑phase plan for modernizing the **Manic Miners Launcher** interface and features. These steps expand on the conversation guidance so contributors have clear direction.


## Phase 1 – Research & Asset Preparation _(completed 2025‑07‑08)_

1. **Review current UI** – See `PHASE1_RESEARCH.md` for notes on the existing layout and theme variables.
2. **Collect design references** – Example launchers and asset resources are summarized in `PHASE1_RESEARCH.md`.
3. **Decide on tooling** – The project will stay with Bootstrap for now; React remains an option for later phases.

## Phase 2 – Layout & Navigation Overhaul _(completed 2025-07-08)_

1. **Sidebar navigation**
   - Replace the modal menu with a permanent collapsible sidebar.
   - Repurpose the installation side pane in `index.html` (lines 80‑115) and wire navigation via `setupNavigation.ts`.
2. **Top bar polish**
   - Keep the branding area with the "Manic Miners HQ" text and icon (lines 15‑23 of `index.html`).
   - Add custom window controls that call Electron `BrowserWindow` APIs.
3. **Responsive structure**
   - Ensure the layout works at 600‑670px widths defined in `createWindow.ts`.
   - Use Bootstrap grid or another responsive framework for adaptability.

## Phase 3 – Styling & Theme Consistency

1. **Refine theme variables**
   - Expand CSS variables in `index.css` for colors, fonts, border radii, and shadows.
2. **Light/Dark mode switch**
   - Base the toggle on existing styles around lines 323‑334 of `index.css`.
   - Persist the user choice via the settings system.
3. **Improve component styles**
   - Tweak progress bar CSS (lines 84‑108) for smooth animations.
   - Standardize buttons and icons with utility classes or SCSS mixins.

## Phase 4 – Feature Enhancements & Integration

1. **Enhanced news area**
   - Replace the placeholder "Latest news…" panel with dynamic content from your server.
2. **Level management improvements**
   - Update `initializeLevels.ts` so installing or removing levels updates the progress bar (lines 60‑77 of `index.html`).
3. **Settings UI polish**
   - Provide toggles for auto‑update, install directory, and sound effects stored through `electron-store`.
4. **Sound and notifications**
   - Extend `setupPlaySoundHandler.ts` for UI sound effects and show toast notifications for success or failure.

## Phase 5 – Testing & Release

1. **Update unit tests**
   - Add tests covering the new sidebar navigation and UI logic. Existing tests such as `setupTopNav.test.js` can serve as examples.
2. **Cross-platform checks**
   - Verify behavior on macOS and Linux. `main.ts` already warns when features are Windows‑only.
3. **Packaging & documentation**
   - Use `pnpm run make` to produce packages and update README screenshots when changes stabilize.

---

Contributors should keep this roadmap updated as milestones are completed.
