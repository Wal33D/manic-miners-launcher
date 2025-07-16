import { useEffect, useRef } from 'react';

/**
 * Custom hook for trapping focus within a container (e.g., modal, dialog)
 * Implements focus management for accessibility
 *
 * @param isActive - Whether the focus trap is active
 * @param options - Configuration options
 * @returns Ref to attach to the container element
 */
export function useFocusTrap(
  isActive: boolean,
  options: {
    onEscape?: () => void;
    initialFocus?: string; // Selector for initial focus element
    returnFocus?: boolean; // Whether to return focus to trigger element
  } = {}
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;

    // Store the currently focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Get all focusable elements within the container
    const getFocusableElements = () => {
      const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', ');

      return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors)).filter(el => {
        // Filter out elements that are not visible
        return el.offsetParent !== null;
      });
    };

    // Set initial focus
    const setInitialFocus = () => {
      if (options.initialFocus) {
        const initialElement = container.querySelector<HTMLElement>(options.initialFocus);
        if (initialElement) {
          initialElement.focus();
          return;
        }
      }

      // Default: focus first focusable element
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      } else {
        // If no focusable elements, focus the container itself
        container.setAttribute('tabindex', '-1');
        container.focus();
      }
    };

    // Handle Tab key for focus cycling
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && options.onEscape) {
        event.preventDefault();
        options.onEscape();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
      let nextIndex: number;

      if (event.shiftKey) {
        // Shift+Tab: move backwards
        nextIndex = currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1;
      } else {
        // Tab: move forwards
        nextIndex = currentIndex >= focusableElements.length - 1 ? 0 : currentIndex + 1;
      }

      event.preventDefault();
      focusableElements[nextIndex].focus();
    };

    // Handle focus leaving the container
    const handleFocusOut = () => {
      // Use setTimeout to check focus after the focus event has completed
      setTimeout(() => {
        if (!container.contains(document.activeElement)) {
          // Focus has left the container, bring it back
          const focusableElements = getFocusableElements();
          if (focusableElements.length > 0) {
            focusableElements[0].focus();
          }
        }
      }, 0);
    };

    // Set up event listeners
    container.addEventListener('keydown', handleKeyDown);
    container.addEventListener('focusout', handleFocusOut);

    // Set initial focus
    setInitialFocus();

    // Cleanup
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('focusout', handleFocusOut);

      // Return focus to previous element if requested
      if (options.returnFocus !== false && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isActive, options.onEscape, options.initialFocus, options.returnFocus]);

  return containerRef;
}
