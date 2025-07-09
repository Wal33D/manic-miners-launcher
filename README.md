# Manic Miners Launcher

Welcome to the official repository of **Manic Miners Launcher**, a modern launcher for the nostalgic, classic game of building and mining. Our launcher aims to bring a renewed experience to fans of the original game, enhancing its accessibility and providing new features to the community.

## Features:

- **Easy Installation**: Set up your game with just a few clicks. No more digging through forums for install guides.
- **Auto-Updates (Windows only)**: Keep your game up to date with the latest patches and content without lifting a finger.
- **Mod Support**: Easily manage and integrate mods to enhance your gameplay experience.
- **Custom Profiles**: Set up multiple profiles for different mod configurations or save games.
- **Performance Settings**: Tweak your game’s settings directly from the launcher for optimal performance on your machine.
- **Online Leaderboards**: See how you rank against other players in various categories.
- **Community Hub**: Access the latest news, guides, and forums directly through the launcher.
- **Backup and Restore**: Safely backup your saves and profiles and restore them when needed.
- **Shortcut Creation (Windows only)**: Optionally create Start Menu or Desktop shortcuts for quick access.
- **macOS Compatibility**: Use Wine, Proton, or another compatibility layer to run the Windows build on macOS.

## Getting Started:

### Prerequisites:

Before you install the Manic Miners Launcher, ensure you have the following:

- **Supported OS**: Windows 7 or later. Other operating systems are currently unsupported and features such as auto-updates and shortcut creation will be disabled.
- An internet connection for downloading the launcher and updates.
- The original game files if you wish to apply mods or play certain versions.

### Installation:

1. **Download the Launcher**: Navigate to the [Releases](https://github.com/Wal33D/manic-miners-launcher/releases) section of this GitHub repository and download the latest version of the launcher.
2. **Run the Installer**: Open the downloaded file and follow the installation wizard. The installer will guide you through the process.
3. **Launch the Game**: Once installed, open Manic Miners Launcher from your desktop or start menu. From here, you can manage your game settings, mods, or simply hit "Play" to dive in!

## Usage:

After launching, you'll be presented with the main interface.

- **Update Your Game**: If there's an update available, you'll see a notification. Click "Update" to proceed.
- **Manage Mods**: Navigate to the Mods section to browse and install mods. You can enable or disable mods for each profile.
- **Adjust Settings**: In the Settings tab, customize your gameplay experience according to your preferences.
- **Start Playing**: Once you're set, hit the "Play" button. Enjoy your journey in the mines!

## Support:

Got questions or ran into issues? Visit our [Issues](https://github.com/Wal33D/manic-miners-launcher/issues) section to report bugs or seek help. Also, check out the [FAQs](https://github.com/Wal33D/manic-miners-launcher/wiki/FAQ) for common questions and answers.

## Contributing:

We welcome contributions! Whether it's submitting bug reports, feature suggestions, or contributing to the code, check out our [Contributing Guidelines](CONTRIBUTING.md) for more information on getting involved.

## Code of Conduct:

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Development

If you want to build the launcher from source you'll need **Node.js 20.19.2 or newer**.

1. Run `nvm use` to activate the Node.js version specified in `.nvmrc`.
2. Install dependencies with `pnpm install`.
3. Start the app in development mode using `pnpm start`.
4. To create distributable packages run `pnpm run make`.

> **Note**
> The `src/fileUtils` folder now only contains the utilities currently used by
> the launcher (`createShortcut`, `findLatestVersionPath` and the helpers in
> `fileOps`). Older helpers were removed.

### macOS TypeScript checks

On macOS the TypeScript checker used during development can crash with `EPIPE`
errors. The build scripts automatically disable this check on darwin systems.
If you want to run the checker anyway, set the `FORCE_TS_CHECK` environment
variable before starting the app:

```bash
export FORCE_TS_CHECK=1
pnpm start
```

Unset `FORCE_TS_CHECK` to restore the default behaviour and avoid potential
`EPIPE` crashes.

### Environment Variables

`SERVER_BASE_URL` sets the base URL used for update checks and other API calls.
If not provided, the launcher defaults to `https://manic-launcher.vercel.app`.
Set this variable before running the app if you need to target a different
server.

Example:

```bash
SERVER_BASE_URL=https://my-server.example.com pnpm start
```

This variable can also be set in your operating system's environment or in a `.env` file.

`COMPAT_LAUNCHER` allows you to specify the command used to run the Windows game on non-Windows platforms. The default is `wine`, but you can set it to `proton run` or another wrapper.

## License:

Manic Miners Launcher is released under the [MIT License](LICENSE). See the LICENSE file for more details.

## Assets

The bundled **Fredericka the Great** font is provided under the [SIL Open Font License](https://scripts.sil.org/OFL). See [assets/NOTICE](assets/NOTICE) for more information.

## Security Notes

`pnpm audit` currently reports no high-severity issues.
The latest available `itchio-downloader` release (0.8.1) is already in use, so
the vulnerable dependencies (`express`, `puppeteer`, and `tar-fs`) referenced in
earlier audits have been resolved. Only moderate vulnerabilities remain in
`webpack-dev-server`. Keep an eye on future releases for additional fixes.

Happy mining!

---

**Note**: This software is not officially affiliated with the original game developers. It is a fan-made project intended to enhance the playing experience.
