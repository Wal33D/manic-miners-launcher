import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcChannels';
import { LauncherSettings } from '../../types/launcherSettings';

let currentSettings: LauncherSettings = {
  playSoundOnInstall: true,
  autoLaunchAfterInstall: false,
  darkMode: true,
  autoUpdate: true,
  installDir: '',
};

export const getCurrentSettings = (): LauncherSettings => currentSettings;

export const initializeSettings = (): void => {
  window.electronAPI.removeAllListeners(IPC_CHANNELS.GET_SETTINGS);
  window.electronAPI.removeAllListeners(IPC_CHANNELS.SET_SETTINGS);
  window.electronAPI.send(IPC_CHANNELS.GET_SETTINGS);

  window.electronAPI.receiveOnce(IPC_CHANNELS.GET_SETTINGS, (settings: LauncherSettings) => {
    currentSettings = settings;
    applySettingsToUI();
  });

  const map = [
    { id: 'setting-play-sound', key: 'playSoundOnInstall' },
    { id: 'setting-auto-launch', key: 'autoLaunchAfterInstall' },
    { id: 'setting-auto-update', key: 'autoUpdate' },
    { id: 'setting-dark-mode', key: 'darkMode' },
  ] as const;

  map.forEach(({ id, key }) => {
    const el = document.getElementById(id) as HTMLInputElement | null;
    if (el) {
      el.addEventListener('change', () => {
        currentSettings = { ...currentSettings, [key]: el.checked } as LauncherSettings;
        window.electronAPI.send(IPC_CHANNELS.SET_SETTINGS, currentSettings);
        if (key === 'darkMode') {
          toggleDarkMode(el.checked);
        }
      });
    }
  });

  const dirInput = document.getElementById('setting-install-dir') as HTMLInputElement | null;
  if (dirInput) {
    dirInput.addEventListener('change', () => {
      currentSettings = { ...currentSettings, installDir: dirInput.value } as LauncherSettings;
      window.electronAPI.send(IPC_CHANNELS.SET_SETTINGS, currentSettings);
    });
  }
};

function applySettingsToUI() {
  const play = document.getElementById('setting-play-sound') as HTMLInputElement | null;
  const autoLaunch = document.getElementById('setting-auto-launch') as HTMLInputElement | null;
  const autoUpdate = document.getElementById('setting-auto-update') as HTMLInputElement | null;
  const darkMode = document.getElementById('setting-dark-mode') as HTMLInputElement | null;
  const installDir = document.getElementById('setting-install-dir') as HTMLInputElement | null;
  if (play) play.checked = currentSettings.playSoundOnInstall;
  if (autoLaunch) autoLaunch.checked = currentSettings.autoLaunchAfterInstall;
  if (autoUpdate) autoUpdate.checked = currentSettings.autoUpdate;
  if (darkMode) {
    darkMode.checked = currentSettings.darkMode;
    toggleDarkMode(currentSettings.darkMode);
  }
  if (installDir) installDir.value = currentSettings.installDir;
}

function toggleDarkMode(enabled: boolean) {
  document.body.classList.toggle('light-mode', !enabled);
}
