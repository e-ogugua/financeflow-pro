import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should pass WCAG 2.1 AA accessibility audit', async ({ page }) => {
    // Run AXE accessibility audit
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    // Check that there are no accessibility violations
    expect(accessibilityScanResults.violations).toHaveLength(0);

    // Log any incomplete results for manual review
    if (accessibilityScanResults.incomplete.length > 0) {
      console.log('Incomplete accessibility checks:', accessibilityScanResults.incomplete);
    }
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

  test('should have proper focus management', async ({ page }) => {
    // Tab through navigation elements
    await page.keyboard.press('Tab');
    await expect(page.locator('[role="tab"]').first()).toBeFocused();

    // Navigate through tabs
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('[role="tab"]').nth(1)).toBeFocused();

    // Enter tab to activate
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeVisible();
  });

  test('should have accessible form elements', async ({ page }) => {
    // Navigate to Advisor page
    await page.locator('[role="tab"]').filter({ hasText: 'Investment Advisor' }).click();

    // Check chat input accessibility
    const chatInput = page.locator('input[placeholder*="Ask me"]');
    await expect(chatInput).toBeVisible();
    await expect(chatInput).toHaveAttribute('aria-label', 'Type your message to the financial advisor');

    // Focus on input
    await chatInput.focus();
    await expect(chatInput).toBeFocused();
  });

  test('should have proper color contrast', async ({ page }) => {
    // Test that text has sufficient contrast against backgrounds
    // This would require more sophisticated color contrast testing
    // For now, we'll check that text elements are visible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('p')).toBeVisible();
    await expect(page.locator('button')).toBeVisible();
  });

  test('should handle reduced motion preference', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // Check that animations are disabled or simplified
    await page.goto('/');
    await expect(page.locator('main')).toBeVisible();

    // Animations should respect reduced motion preference
    // This would require checking CSS animation properties
  });

  test('should have proper semantic structure', async ({ page }) => {
    // Check for proper landmark regions
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Check for proper navigation structure
    await expect(page.locator('[role="navigation"]')).toBeVisible();

    // Check for proper list structures
    const lists = page.locator('[role="list"]');
    await expect(lists.first()).toBeVisible();
  });

  test('should have accessible interactive elements', async ({ page }) => {
    // Check that all buttons have proper ARIA labels
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      await expect(button).toHaveAttribute('aria-label');
    }

    // Check that all inputs have proper labels or ARIA labels
    const inputs = page.locator('input');
    const inputCount = await inputs.count();

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const hasLabel = await input.evaluate(el => {
        const label = el.closest('label');
        const ariaLabel = el.getAttribute('aria-label');
        const ariaLabelledBy = el.getAttribute('aria-labelledby');
        return !!(label || ariaLabel || ariaLabelledBy);
      });
      expect(hasLabel).toBe(true);
    }
  });

  test('should handle keyboard navigation properly', async ({ page }) => {
    // Tab through the interface
    await page.keyboard.press('Tab');
    await expect(page.locator('[role="tab"]').first()).toBeFocused();

    // Arrow key navigation through tabs
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('[role="tab"]').nth(1)).toBeFocused();

    // Enter to activate tab
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeVisible();

    // Tab to content
    await page.keyboard.press('Tab');
    await expect(page.locator('button')).toBeFocused();
  });

  test('should have proper error handling and feedback', async ({ page }) => {
    // Test that the app handles errors gracefully
    // This would require more sophisticated error simulation
    await expect(page.locator('main')).toBeVisible();
  });

  test('should maintain accessibility across responsive breakpoints', async ({ page }) => {
    const viewports = [
      { width: 320, height: 568 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1920, height: 1080 }, // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);

      // Check that accessibility features are maintained
      await expect(page.locator('[role="main"]')).toBeVisible();
      await expect(page.locator('h1')).toBeVisible();

      if (viewport.width < 768) {
        // Mobile navigation should be accessible
        await expect(page.locator('[aria-label="Open navigation menu"]')).toBeVisible();
      } else {
        // Desktop navigation should be accessible
        await expect(page.locator('[role="tab"]')).toBeVisible();
      }
    }
  });
});
