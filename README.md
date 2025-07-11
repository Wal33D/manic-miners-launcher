# Manic Miners Launcher

This project is an Electron-based launcher for the game **Manic Miners**. The launcher downloads and manages multiple game versions and provides a simple user interface for starting the game.

## Requirements

- Node.js 20 or later
- pnpm package manager
This launcher currently supports running the game only on Windows systems.

## Development

Install dependencies and start the launcher in development mode:

```bash
pnpm install
pnpm start
```

## Packaging

Use Electron Forge to package distributables:

```bash
pnpm make
```
