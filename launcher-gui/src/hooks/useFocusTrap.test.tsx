import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useFocusTrap } from './useFocusTrap';
import React, { useRef, useState } from 'react';

// Test component that uses the hook
function TestComponent({ isActive = true }: { isActive?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, isActive);

  return (
    <div ref={containerRef} data-testid="focus-container">
      <button data-testid="first-button">First Button</button>
      <input data-testid="text-input" type="text" placeholder="Text input" />
      <button data-testid="second-button">Second Button</button>
    </div>
  );
}

// Component with focusable elements outside the trap
function TestWithOutsideElements() {
  return (
    <div>
      <button data-testid="outside-before">Outside Before</button>
      <TestComponent />
      <button data-testid="outside-after">Outside After</button>
    </div>
  );
}

describe('useFocusTrap', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    // Mock DOM methods if needed
    Element.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should focus first focusable element when activated', () => {
    render(<TestComponent />);

    const firstButton = screen.getByTestId('first-button');
    expect(firstButton).toHaveFocus();
  });

  it('should trap focus within container when tabbing forward', async () => {
    render(<TestWithOutsideElements />);

    const firstButton = screen.getByTestId('first-button');
    const textInput = screen.getByTestId('text-input');
    const secondButton = screen.getByTestId('second-button');

    expect(firstButton).toHaveFocus();

    // Tab to text input
    await user.tab();
    expect(textInput).toHaveFocus();

    // Tab to second button
    await user.tab();
    expect(secondButton).toHaveFocus();

    // Tab should wrap to first button
    await user.tab();
    expect(firstButton).toHaveFocus();
  });

  it('should trap focus within container when tabbing backward', async () => {
    render(<TestWithOutsideElements />);

    const firstButton = screen.getByTestId('first-button');
    const secondButton = screen.getByTestId('second-button');

    expect(firstButton).toHaveFocus();

    // Shift+Tab should wrap to last element
    await user.tab({ shift: true });
    expect(secondButton).toHaveFocus();

    // Continue tabbing backward
    await user.tab({ shift: true });
    const textInput = screen.getByTestId('text-input');
    expect(textInput).toHaveFocus();

    await user.tab({ shift: true });
    expect(firstButton).toHaveFocus();
  });

  it('should not interfere when trap is inactive', async () => {
    render(
      <div>
        <button data-testid="outside-before">Outside Before</button>
        <TestComponent isActive={false} />
        <button data-testid="outside-after">Outside After</button>
      </div>
    );

    const outsideBefore = screen.getByTestId('outside-before');
    const outsideAfter = screen.getByTestId('outside-after');

    // Focus should start normally, not forced to trap
    outsideBefore.focus();
    expect(outsideBefore).toHaveFocus();

    // Tab should work normally
    await user.tab();
    const firstButton = screen.getByTestId('first-button');
    expect(firstButton).toHaveFocus();

    // Continue tabbing should reach outside elements
    await user.tab();
    await user.tab();
    await user.tab();
    expect(outsideAfter).toHaveFocus();
  });

  it('should handle containers with no focusable elements', () => {
    function EmptyContainer() {
      const containerRef = useRef<HTMLDivElement>(null);
      useFocusTrap(containerRef, true);

      return (
        <div ref={containerRef} data-testid="empty-container">
          <div>No focusable elements</div>
        </div>
      );
    }

    // Should not throw or cause issues
    expect(() => render(<EmptyContainer />)).not.toThrow();
  });

  it('should handle null container ref gracefully', () => {
    function NullRefComponent() {
      useFocusTrap(null, true);
      return <div>Test</div>;
    }

    // Should not throw
    expect(() => render(<NullRefComponent />)).not.toThrow();
  });

  it('should clean up event listeners when unmounted', () => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    const { unmount } = render(<TestComponent />);

    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('should handle dynamic content changes', async () => {
    function DynamicComponent() {
      const containerRef = useRef<HTMLDivElement>(null);
      const [showExtraButton, setShowExtraButton] = useState(false);
      useFocusTrap(containerRef, true);

      return (
        <div ref={containerRef}>
          <button data-testid="first-button">First</button>
          {showExtraButton && <button data-testid="extra-button">Extra</button>}
          <button data-testid="toggle-button" onClick={() => setShowExtraButton(!showExtraButton)}>
            Toggle
          </button>
        </div>
      );
    }

    render(<DynamicComponent />);

    const firstButton = screen.getByTestId('first-button');
    const toggleButton = screen.getByTestId('toggle-button');

    expect(firstButton).toHaveFocus();

    // Tab to toggle button
    await user.tab();
    expect(toggleButton).toHaveFocus();

    // Add extra button
    await user.click(toggleButton);

    // Focus trap should now include the new button
    await user.tab();
    expect(firstButton).toHaveFocus();

    await user.tab();
    const extraButton = screen.getByTestId('extra-button');
    expect(extraButton).toHaveFocus();
  });
});
