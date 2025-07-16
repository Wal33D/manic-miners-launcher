import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingState, InlineLoader } from '../loading-state';

describe('LoadingState', () => {
  it('renders spinner variant by default', () => {
    render(<LoadingState />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    // Check for spinner icon
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('renders custom message', () => {
    render(<LoadingState message="Loading data..." />);

    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('renders skeleton variant', () => {
    render(<LoadingState variant="skeleton" rows={2} />);

    const skeletons = document.querySelectorAll('.h-16');
    expect(skeletons).toHaveLength(2);
  });

  it('renders card variant', () => {
    render(<LoadingState variant="card" message="Loading content..." />);

    expect(screen.getByText('Loading content...')).toBeInTheDocument();
    const card = document.querySelector('.mining-surface');
    expect(card).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<LoadingState className="custom-class" />);

    const element = container.firstChild;
    expect(element).toHaveClass('custom-class');
  });
});

describe('InlineLoader', () => {
  it('renders inline spinner', () => {
    render(<InlineLoader />);

    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('h-4', 'w-4');
  });

  it('applies custom className', () => {
    render(<InlineLoader className="text-primary" />);

    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toHaveClass('text-primary');
  });
});
