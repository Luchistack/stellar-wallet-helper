import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { AccountSection } from './account-section';

describe('AccountSection Cookie Preferences', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders essential, analytics, and marketing toggles', () => {
    render(<AccountSection />);
    expect(screen.getByText('Essential Cookies')).toBeInTheDocument();
    expect(screen.getByText('Analytics Cookies')).toBeInTheDocument();
    expect(screen.getByText('Marketing Cookies')).toBeInTheDocument();
  });

  it('keeps essential cookies checked and disabled', () => {
    render(<AccountSection />);
    const essentialCheckbox = screen.getByLabelText(/Essential Cookies/i) as HTMLInputElement;
    expect(essentialCheckbox.checked).toBe(true);
    expect(essentialCheckbox.disabled).toBe(true);
  });

  it('allows toggling analytics and marketing cookies', () => {
    render(<AccountSection />);
    const analyticsCheckbox = screen.getByLabelText(/Analytics Cookies/i) as HTMLInputElement;
    const marketingCheckbox = screen.getByLabelText(/Marketing Cookies/i) as HTMLInputElement;

    expect(analyticsCheckbox.checked).toBe(false);
    expect(marketingCheckbox.checked).toBe(false);

    fireEvent.click(analyticsCheckbox);
    fireEvent.click(marketingCheckbox);

    expect(analyticsCheckbox.checked).toBe(true);
    expect(marketingCheckbox.checked).toBe(true);
  });
});
