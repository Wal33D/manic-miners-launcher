export function setDisabledAppearance(element: HTMLElement | any, disabled: boolean) {
  element.disabled = disabled;
  if (disabled) {
    element.style.opacity = '0.6';
    element.style.cursor = 'not-allowed';
  } else {
    element.style.opacity = '';
    element.style.cursor = '';
  }
}
