# Manic Miners Launcher

This project is an Electron-based launcher for the game **Manic Miners**. The launcher downloads and manages multiple game versions and provides a simple user interface for starting the game.

## Requirements

- Node.js 20 or later
- pnpm package manager
- On Linux and macOS a Windows compatibility layer such as **Wine** is required to run the Windows game binaries. The launcher first tries the command from the `COMPAT_LAUNCHER` environment variable and then searches for `wine` or `wine64`. If no compatible command is found, it will automatically download a portable Wine build using the URL defined by `WINE_DOWNLOAD_URL` (defaults to our hosted build) and use it.

No manual Wine installation is necessary on supported platforms.

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
