import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorState, InlineError } from '../error-state';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('ErrorState', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders default error message', () => {
    render(<ErrorState />, { wrapper: BrowserRouter });
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('An unexpected error occurred. Please try again.')).toBeInTheDocument();
  });

  it('renders custom title and message', () => {
    render(
      <ErrorState 
        title="Network Error" 
        message="Unable to connect to server" 
      />,
      { wrapper: BrowserRouter }
    );
    
    expect(screen.getByText('Network Error')).toBeInTheDocument();
    expect(screen.getByText('Unable to connect to server')).toBeInTheDocument();
  });

  it('shows retry button when onRetry is provided', () => {
    const onRetry = vi.fn();
    render(
      <ErrorState onRetry={onRetry} />,
      { wrapper: BrowserRouter }
    );
    
    const retryButton = screen.getByRole('button', { name: /try again/i });
    expect(retryButton).toBeInTheDocument();
    
    fireEvent.click(retryButton);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('hides retry button when showRetry is false', () => {
    const onRetry = vi.fn();
    render(
      <ErrorState onRetry={onRetry} showRetry={false} />,
      { wrapper: BrowserRouter }
    );
    
    expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument();
  });

  it('shows home button when showHome is true', () => {
    render(
      <ErrorState showHome={true} />,
      { wrapper: BrowserRouter }
    );
    
    const homeButton = screen.getByRole('button', { name: /go home/i });
    expect(homeButton).toBeInTheDocument();
    
    fireEvent.click(homeButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('applies correct variant styling', () => {
    const { container } = render(
      <ErrorState variant="warning" />,
      { wrapper: BrowserRouter }
    );
    
    const icon = container.querySelector('.text-yellow-600');
    expect(icon).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ErrorState className="custom-error-class" />,
      { wrapper: BrowserRouter }
    );
    
    const card = container.querySelector('.mining-surface');
    expect(card).toHaveClass('custom-error-class');
  });
});

describe('InlineError', () => {
  it('renders error message with icon', () => {
    render(<InlineError message="Field is required" />);
    
    expect(screen.getByText('Field is required')).toBeInTheDocument();
    const icon = document.querySelector('.h-4.w-4');
    expect(icon).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <InlineError message="Error" className="mt-2" />
    );
    
    const errorDiv = container.firstChild;
    expect(errorDiv).toHaveClass('text-destructive', 'mt-2');
  });
});