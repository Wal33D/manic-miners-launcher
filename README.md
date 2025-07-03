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

## Development

If you want to build the launcher from source you'll need **Node.js 20.19.2 or newer**.

1. Run `nvm use` to activate the Node.js version specified in `.nvmrc`.
2. Install dependencies with `pnpm install`.
3. Start the app in development mode using `pnpm start`.
4. To create distributable packages run `pnpm run make`.

### Environment Variables

`SERVER_BASE_URL` sets the base URL used for update checks and other API calls.
If not provided, the launcher defaults to `https://manic-launcher.vercel.app`.
Set this variable before running the app if you need to target a different
server.

## License:

Manic Miners Launcher is released under the [MIT License](LICENSE). See the LICENSE file for more details.

## Assets

The bundled **Fredericka the Great** font is provided under the [SIL Open Font License](https://scripts.sil.org/OFL). See [assets/NOTICE](assets/NOTICE) for more information.

## Security Notes

Some dependencies currently have unresolved high-severity vulnerabilities as reported by `pnpm audit`.
These issues stem from packages such as `express`, `puppeteer`, and `tar-fs`, which are pulled in by the `itchio-downloader` dependency.
Consider reviewing the audit report and updating or replacing these packages when patches become available.

Happy mining!

---

**Note**: This software is not officially affiliated with the original game developers. It is a fan-made project intended to enhance the playing experience.
