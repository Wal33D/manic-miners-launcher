# Phase 1 – Research & Asset Preparation

This document summarizes the findings from the first phase of the roadmap. It documents the current user interface structure, proposes design references, and suggests tooling decisions for future development.

## Current UI Review

- **Navigation bar and tab layout**: Defined around lines 12‑30 in `src/renderer/index.html` where the Bootstrap navbar and tab container are created.
- **Side pane**: Installation controls appear around lines 80‑115 in the same file, providing version selection and shortcut options.
- **Theme variables**: Custom colors such as `--mm-green` and `--mm-dark-green` are set at lines 5‑10 in `src/renderer/index.css`.
- **Window size**: The main window is created at 1180×600 with minimum width 670 in `src/main/createWindow.ts`.

## Design References

- Look to modern launchers such as **Steam**, **Epic Games Launcher**, and **GOG Galaxy** for layout inspiration—each uses a persistent sidebar with a content area.
- Consider minimalistic dark themes similar to **Discord** or **Battle.net** to maintain consistency with existing colors.
- For high‑resolution backgrounds, explore public domain space or mining‑themed images from sites like [Unsplash](https://unsplash.com) or [Pexels](https://www.pexels.com). These platforms offer free, high‑quality photos that can replace `assets/background.jpg`.
- Replace `assets/ManicMiners.png` with a higher resolution logo exported from the project’s original design files, if available, or consider commissioning a new vector logo.

## Tooling Decision

The project currently uses plain HTML with Bootstrap. Two approaches are possible:

1. **Continue with Bootstrap** – Quick to iterate and already integrated. Custom styling can be added via SCSS to refine colors and layout.
2. **Migrate to React with a component framework** – Provides a more scalable structure. **Material UI** or **Chakra UI** would supply polished components and easier theming. This would require restructuring the renderer into React components but could improve maintainability.

For now, sticking with Bootstrap keeps the codebase simple. A later phase could introduce React if the team wants more dynamic components.
