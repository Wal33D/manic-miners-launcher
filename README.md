# Manic Miners Launcher

This project is an Electron-based launcher for the game **Manic Miners**. The launcher downloads and manages multiple game versions and provides a simple user interface for starting the game.

## Requirements

- Node.js 20 or later
- pnpm package manager
- On Linux and macOS a Windows compatibility layer using **Proton** is required to run the Windows game binaries. The launcher will attempt to use the command from the `COMPAT_LAUNCHER` environment variable or a Proton installation detected on the system. Proton is an open-source compatibility tool built on Wine for running Windows games through Steam [[Proton README](https://github.com/ValveSoftware/Proton)].

The launcher automatically downloads the latest Proton GE build on Linux if no suitable Proton is found. The download is verified against the SHA-512 checksum published with each release. Proton currently has no official macOS distribution, so macOS users must supply their own Proton build (for example community ports). The launcher will now attempt to locate Proton from common macOS installation paths in addition to using `COMPAT_LAUNCHER`. Run `pnpm run check:proton` to verify that Proton is available or to trigger the download on Linux.

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
