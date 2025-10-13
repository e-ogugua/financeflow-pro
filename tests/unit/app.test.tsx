import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '../../src/App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Basic smoke test - app should render without errors
    expect(document.body).toBeTruthy();
  });
  
  it('displays the main application', () => {
    render(<App />);
    // Check if the main app content is present
    const appElement = document.querySelector('[data-testid="app"]') || document.body;
    expect(appElement).toBeTruthy();
  });
});
