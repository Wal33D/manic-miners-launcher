# Manic Miners Launcher

This project is an Electron-based launcher for the game **Manic Miners**. The launcher downloads and manages multiple game versions and provides a simple user interface for starting the game.

## Requirements

- Node.js 20 or later
- pnpm package manager
- On Linux and macOS a Windows compatibility layer such as **Wine** is required to run the Windows game binaries. The launcher will attempt to use the command from the `COMPAT_LAUNCHER` environment variable. If no compatible command is found, it searches for common Wine executables such as `wine` or `wine64`.

Automatic Wine download is currently only supported on Linux. On macOS you must install Wine manually and optionally set `COMPAT_LAUNCHER` to the path of the Wine executable. You can run `pnpm run download:wine` on Linux to prefetch the Wine bundle before packaging or launching.

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
