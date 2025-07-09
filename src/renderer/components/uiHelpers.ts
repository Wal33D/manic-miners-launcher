import { setDisabledAppearance } from './domUtils';

export function disableElements(...elements: (HTMLElement | HTMLInputElement | HTMLButtonElement | HTMLSelectElement)[]) {
  elements.forEach(el => setDisabledAppearance(el, true));
}

export function enableElements(...elements: (HTMLElement | HTMLInputElement | HTMLButtonElement | HTMLSelectElement)[]) {
  elements.forEach(el => setDisabledAppearance(el, false));
}
