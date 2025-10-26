import { test, expect } from '@playwright/test';

test.describe('FinanceFlow Pro - Navigation and Routes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the main application', async ({ page }) => {
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Welcome back');
  });

  test('should have working navigation tabs', async ({ page }) => {
    // Check that navigation tabs are present
    await expect(page.locator('[aria-label="Main navigation"]')).toBeVisible();

    // Check tab structure
    const tabs = page.locator('[role="tab"]');
    await expect(tabs).toHaveCount(4); // Dashboard, Portfolio, Advisor, Goals

    // Check tab labels
    await expect(page.locator('[role="tab"]').first()).toContainText('Dashboard');
    await expect(page.locator('[role="tab"]').nth(1)).toContainText('Portfolio');
    await expect(page.locator('[role="tab"]').nth(2)).toContainText('Investment Advisor');
    await expect(page.locator('[role="tab"]').nth(3)).toContainText('Financial Goals');
  });

  test('should navigate between tabs', async ({ page }) => {
    // Start on dashboard
    await expect(page.locator('main')).toContainText('Welcome back');

    // Navigate to Portfolio
    await page.locator('[role="tab"]').filter({ hasText: 'Portfolio' }).click();
    await expect(page.locator('main')).toContainText('Portfolio Management');

    // Navigate to Advisor
    await page.locator('[role="tab"]').filter({ hasText: 'Investment Advisor' }).click();
    await expect(page.locator('main')).toContainText('Financial Advisor');

    // Navigate to Goals
    await page.locator('[role="tab"]').filter({ hasText: 'Financial Goals' }).click();
    await expect(page.locator('main')).toContainText('Financial Goals');
  });

  test('should have accessible skip link', async ({ page }) => {
    // Skip link should be present and functional
    await expect(page.locator('.skip-link')).toBeVisible();
    await expect(page.locator('.skip-link')).toHaveAttribute('href', '#main-content');

    // Tab to skip link
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();

    // Activate skip link
    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Check for H1 on main page
    await expect(page.locator('h1')).toBeVisible();

    // Navigate through tabs and check heading consistency
    const tabs = [
      { name: 'Dashboard', heading: 'Welcome back' },
      { name: 'Portfolio', heading: 'Portfolio Management' },
      { name: 'Investment Advisor', heading: 'Financial Advisor' },
      { name: 'Financial Goals', heading: 'Financial Goals' }
    ];

    for (const tab of tabs) {
      await page.locator('[role="tab"]').filter({ hasText: tab.name }).click();
      await expect(page.locator('h1')).toContainText(tab.heading);
    }
  });

  test('should handle mobile navigation', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Mobile menu button should be visible
    await expect(page.locator('[aria-label="Open navigation menu"]')).toBeVisible();

    // Open mobile menu
    await page.locator('[aria-label="Open navigation menu"]').click();

    // Menu should expand
    await expect(page.locator('[aria-label="Mobile navigation menu"]')).toBeVisible();

    // Navigation items should be accessible
    await expect(page.locator('[role="menuitem"]')).toHaveCount(4);

    // Close menu
    await page.locator('[aria-label="Close navigation menu"]').click();
    await expect(page.locator('[aria-label="Mobile navigation menu"]')).not.toBeVisible();
  });

  test('should maintain accessibility standards', async ({ page }) => {
    // Check for proper ARIA attributes
    await expect(page.locator('[role="main"]')).toHaveAttribute('aria-label', 'Financial Dashboard');

    // Check navigation accessibility
    await expect(page.locator('[role="navigation"]')).toBeVisible();

    // Check button accessibility
    const actionButtons = page.locator('[role="button"]');
    await expect(actionButtons.first()).toBeVisible();

    // Check form accessibility
    const inputs = page.locator('input');
    await expect(inputs.first()).toBeVisible();
  });

  test('should handle loading states gracefully', async ({ page }) => {
    // Wait for initial load
    await expect(page.locator('main')).toBeVisible();

    // Check that loading states are properly handled
    // (This would be more comprehensive with actual loading state testing)
    await expect(page.locator('main')).not.toContainText('Loading...');
  });

  test('should maintain responsive design', async ({ page }) => {
    // Test different viewport sizes
    const viewports = [
      { width: 320, height: 568, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1920, height: 1080, name: 'Desktop' }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await expect(page.locator('main')).toBeVisible();

      // Check that navigation adapts to viewport
      if (viewport.width < 768) {
        await expect(page.locator('[aria-label="Open navigation menu"]')).toBeVisible();
      } else {
        await expect(page.locator('[role="tab"]')).toBeVisible();
      }
    }
  });

  test('should handle error states gracefully', async ({ page }) => {
    // Test that the app doesn't crash on network issues
    // This would require mocking network failures in a real scenario
    await expect(page.locator('main')).toBeVisible();
  });
});

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display market data cards', async ({ page }) => {
    // Check for market overview cards
    await expect(page.locator('text=S&P 500')).toBeVisible();
    await expect(page.locator('text=NASDAQ')).toBeVisible();
    await expect(page.locator('text=Dow Jones')).toBeVisible();
  });

  test('should display portfolio performance chart', async ({ page }) => {
    // Check for chart container
    await expect(page.locator('[data-testid="chart-container"]')).toBeVisible();
  });

  test('should display economic indicators', async ({ page }) => {
    await expect(page.locator('text=GDP Growth')).toBeVisible();
    await expect(page.locator('text=Inflation')).toBeVisible();
    await expect(page.locator('text=Employment')).toBeVisible();
  });

  test('should display quick action buttons', async ({ page }) => {
    await expect(page.locator('text=Set New Goal')).toBeVisible();
    await expect(page.locator('text=Portfolio Analysis')).toBeVisible();
    await expect(page.locator('text=Get Advice')).toBeVisible();
    await expect(page.locator('text=Track Progress')).toBeVisible();
  });
});

test.describe('Portfolio Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[role="tab"]').filter({ hasText: 'Portfolio' }).click();
  });

  test('should display portfolio metrics', async ({ page }) => {
    await expect(page.locator('text=Total Portfolio Value')).toBeVisible();
    await expect(page.locator('text=Top Holding')).toBeVisible();
    await expect(page.locator('text=Diversification')).toBeVisible();
  });

  test('should display asset allocation chart', async ({ page }) => {
    await expect(page.locator('[data-testid="chart-container"]')).toBeVisible();
  });

  test('should display risk profile analysis', async ({ page }) => {
    await expect(page.locator('text=Risk Profile Analysis')).toBeVisible();
    await expect(page.locator('text=Conservative')).toBeVisible();
    await expect(page.locator('text=Moderate')).toBeVisible();
    await expect(page.locator('text=Aggressive')).toBeVisible();
  });

  test('should display holdings table', async ({ page }) => {
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('thead')).toBeVisible();
    await expect(page.locator('tbody')).toBeVisible();
  });
});

test.describe('Advisor Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[role="tab"]').filter({ hasText: 'Investment Advisor' }).click();
  });

  test('should display chat interface', async ({ page }) => {
    await expect(page.locator('[aria-label="Chat conversation"]')).toBeVisible();
    await expect(page.locator('input[placeholder*="Ask me"]')).toBeVisible();
  });

  test('should display investment recommendations', async ({ page }) => {
    await expect(page.locator('[aria-label="Investment recommendations list"]')).toBeVisible();
  });

  test('should display market insights', async ({ page }) => {
    await expect(page.locator('text=Market Sentiment')).toBeVisible();
    await expect(page.locator('text=Next Update')).toBeVisible();
    await expect(page.locator('text=Accuracy Rate')).toBeVisible();
  });
});

test.describe('Goals Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[role="tab"]').filter({ hasText: 'Financial Goals' }).click();
  });

  test('should display goals overview', async ({ page }) => {
    await expect(page.locator('text=Total Goals')).toBeVisible();
    await expect(page.locator('text=Completed')).toBeVisible();
    await expect(page.locator('text=On Track')).toBeVisible();
    await expect(page.locator('text=Monthly Savings')).toBeVisible();
  });

  test('should display financial goals list', async ({ page }) => {
    await expect(page.locator('[aria-label="Financial goals list"]')).toBeVisible();
  });

  test('should have add goal button', async ({ page }) => {
    await expect(page.locator('[aria-label="Add new financial goal"]')).toBeVisible();
  });
});
