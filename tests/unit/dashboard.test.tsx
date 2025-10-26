import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Dashboard } from '../../src/components/pages/Dashboard';
import { portfolioChartData, marketIndexData, economicIndicatorsChart, sectorChartData } from '../../src/data/mockData';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileHover: _whileHover, whileTap: _whileTap, transition: _transition, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, whileHover: _whileHover, whileTap: _whileTap, transition: _transition, ...props }: any) => <section {...props}>{children}</section>,
    button: ({ children, whileHover: _whileHover, whileTap: _whileTap, transition: _transition, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

// Mock recharts to avoid canvas issues in tests
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div data-testid="chart-container">{children}</div>,
  AreaChart: ({ children }: any) => <div data-testid="area-chart">{children}</div>,
  Area: () => <div data-testid="area" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  BarChart: ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => <div data-testid="bar" />,
  PieChart: ({ children }: any) => <div data-testid="pie-chart">{children}</div>,
  Pie: () => <div data-testid="pie" />,
  Cell: () => <div data-testid="cell" />,
  Legend: () => <div data-testid="legend" />,
  // Mock SVG elements that might appear in charts - using JSX syntax
  defs: ({ children }: any) => <div data-testid="defs">{children}</div>,
  linearGradient: ({ children }: any) => <div data-testid="linear-gradient">{children}</div>,
  stop: ({ children }: any) => <div data-testid="stop">{children}</div>,
}));

describe('Dashboard Component', () => {
  const defaultProps = {
    portfolioData: portfolioChartData.slice(0, 3), // Use subset for testing
    marketData: marketIndexData,
    economicIndicators: economicIndicatorsChart.slice(0, 2),
    sectorPerformance: sectorChartData.slice(0, 3),
    isLoading: false,
  };

  beforeEach(() => {
    // Reset any mocks before each test
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Dashboard {...defaultProps} />);
    expect(document.body).toBeTruthy();
  });

  it('displays welcome section with proper heading', () => {
    render(<Dashboard {...defaultProps} />);
    expect(screen.getByText(/Welcome back/)).toBeInTheDocument();
    expect(screen.getByText('Financial overview and market insights')).toBeInTheDocument();
  });

  it('renders market overview cards', () => {
    render(<Dashboard {...defaultProps} />);
    expect(screen.getByText('S&P 500')).toBeInTheDocument();
    expect(screen.getByText('NASDAQ')).toBeInTheDocument();
    expect(screen.getByText('Dow Jones')).toBeInTheDocument();
  });

  it('displays portfolio performance chart', () => {
    render(<Dashboard {...defaultProps} />);
    expect(screen.getByText('Portfolio Performance')).toBeInTheDocument();
    expect(screen.getByTestId('chart-container')).toBeInTheDocument();
  });

  it('renders sector performance section', () => {
    render(<Dashboard {...defaultProps} />);
    expect(screen.getByText('Sector Performance')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Healthcare')).toBeInTheDocument();
  });

  it('displays economic indicators', () => {
    render(<Dashboard {...defaultProps} />);
    expect(screen.getByText('Economic Indicators')).toBeInTheDocument();
    expect(screen.getByText('GDP Growth')).toBeInTheDocument();
    expect(screen.getByText('Inflation')).toBeInTheDocument();
  });

  it('renders quick action buttons', () => {
    render(<Dashboard {...defaultProps} />);
    expect(screen.getByText('Set New Goal')).toBeInTheDocument();
    expect(screen.getByText('Portfolio Analysis')).toBeInTheDocument();
    expect(screen.getByText('Get Advice')).toBeInTheDocument();
    expect(screen.getByText('Track Progress')).toBeInTheDocument();
  });

  it('displays loading state when isLoading is true', () => {
    render(<Dashboard {...defaultProps} isLoading={true} />);

    // Should not show main content when loading
    expect(screen.queryByText(/Welcome back/)).not.toBeInTheDocument();

    // Should show skeleton loaders
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('handles empty data gracefully', () => {
    render(<Dashboard
      portfolioData={[]}
      marketData={marketIndexData}
      economicIndicators={[]}
      sectorPerformance={[]}
    />);

    // Should still render main structure
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText(/Welcome back/)).toBeInTheDocument();
  });

  it('maintains accessibility standards', () => {
    render(<Dashboard {...defaultProps} />);

    // Check for proper ARIA labels
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveAttribute('aria-label', 'Financial Dashboard');

    // Check for proper heading hierarchy
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Welcome back/);

    // Check for accessible button elements
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);

    // Check that buttons have accessible labels
    buttons.forEach(button => {
      expect(button).toHaveAttribute('aria-label');
    });

    // Check for proper semantic structure
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders responsive layout elements', () => {
    render(<Dashboard {...defaultProps} />);

    // Check for responsive grid layouts
    const gridElements = screen.getAllByRole('list');
    expect(gridElements.length).toBeGreaterThan(0);
  });
});
