# Manic Miners Launcher

This project is an Electron-based launcher for the game **Manic Miners**. The launcher downloads and manages multiple game versions and provides a simple user interface for starting the game.

## Requirements

- Node.js 20 or later
- pnpm package manager
- On Linux and macOS a Windows compatibility layer such as **Wine** is required to run the Windows game binaries. The launcher will attempt to use the command from the `COMPAT_LAUNCHER` environment variable and falls back to `wine`.

Make sure Wine is installed and available in your `PATH` when running the launcher on non-Windows systems.

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
