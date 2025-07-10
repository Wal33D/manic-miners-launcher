# Manic Miners Launcher

This project is an Electron-based launcher for the game **Manic Miners**. The launcher downloads and manages multiple game versions and provides a simple user interface for starting the game.

## Requirements

- Node.js 20 or later
- pnpm package manager
- On Linux and macOS a Windows compatibility layer such as **Wine** is required to run the Windows game binaries. The launcher will attempt to use the command from the `COMPAT_LAUNCHER` environment variable. If no compatible command is found, it searches for common Wine executables such as `wine` or `wine64` and falls back to automatically downloading a portable Wine build if none are available.

If a compatible command cannot be found the launcher automatically downloads a portable Wine build. No manual Wine installation is necessary on supported platforms. You can also run `pnpm run download:wine` to prefetch the Wine bundle before packaging or launching.

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
