export interface PortfolioItem {
  symbol: string;
  name: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  marketValue: number;
  gainLoss: number;
  gainLossPercent: number;
  sector: string;
}

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
}

export interface EconomicIndicator {
  name: string;
  value: number;
  change: number;
  unit: string;
  frequency: string;
}

export interface SectorPerformance {
  sector: string;
  performance: number;
  marketCap: number;
  volume: number;
}

export interface AllocationData {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface Recommendation {
  id: string;
  type: 'BUY' | 'SELL' | 'HOLD';
  symbol: string;
  company: string;
  currentPrice: number;
  targetPrice: number;
  confidence: number;
  reasoning: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'ON_TRACK' | 'BEHIND' | 'AHEAD';
}

// Chart-specific data structures for Dashboard component
export interface PortfolioChartData {
  time: string;
  value: number;
  benchmark: number;
}

export interface MarketIndexData {
  sp500: {
    current: number;
    change: string;
    changePoints: string;
    volume: string;
    marketCap: string;
  };
  nasdaq: {
    current: number;
    change: string;
    changePoints: string;
    volume: string;
    marketCap: string;
  };
  dowJones: {
    current: number;
    change: string;
    changePoints: string;
    volume: string;
    marketCap: string;
  };
}

export interface EconomicIndicatorChart {
  name: string;
  current: string;
  previous: string;
  trend: 'improving' | 'declining' | 'stable';
  description: string;
}

export interface SectorChartData {
  name: string;
  performance: string;
  color: string;
}

export interface AllocationChartData {
  name: string;
  value: number;
  color: string;
}

export interface RecommendationChart {
  type: string;
  asset: string;
  confidence: number;
  reason: string;
  impact: string;
  riskLevel?: string;
  timeHorizon?: string;
}

export interface GoalChart {
  name: string;
  current: number;
  target: number;
  progress: number;
  timeframe: string;
  description?: string;
  priority?: "Low" | "Medium" | "High";
  monthlyContribution?: number;
  projectedCompletion?: string;
}

// Mock Portfolio Data
export const portfolioData: PortfolioItem[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 150,
    avgCost: 145.50,
    currentPrice: 175.25,
    marketValue: 26287.50,
    gainLoss: 4487.50,
    gainLossPercent: 20.61,
    sector: 'Technology'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    shares: 100,
    avgCost: 250.00,
    currentPrice: 335.80,
    marketValue: 33580.00,
    gainLoss: 8580.00,
    gainLossPercent: 34.32,
    sector: 'Technology'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    shares: 75,
    avgCost: 125.75,
    currentPrice: 138.50,
    marketValue: 10387.50,
    gainLoss: 956.25,
    gainLossPercent: 10.11,
    sector: 'Technology'
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    shares: 50,
    avgCost: 220.00,
    currentPrice: 245.75,
    marketValue: 12287.50,
    gainLoss: 1287.50,
    gainLossPercent: 11.70,
    sector: 'Consumer Discretionary'
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    shares: 80,
    avgCost: 120.00,
    currentPrice: 875.25,
    marketValue: 70020.00,
    gainLoss: 60820.00,
    gainLossPercent: 629.38,
    sector: 'Technology'
  }
];

// Portfolio performance chart data
export const portfolioChartData: PortfolioChartData[] = [
  { time: 'Jan', value: 150000, benchmark: 145000 },
  { time: 'Feb', value: 158000, benchmark: 148000 },
  { time: 'Mar', value: 165000, benchmark: 152000 },
  { time: 'Apr', value: 172000, benchmark: 158000 },
  { time: 'May', value: 185000, benchmark: 165000 },
  { time: 'Jun', value: 195000, benchmark: 172000 },
  { time: 'Jul', value: 210000, benchmark: 185000 },
  { time: 'Aug', value: 215000, benchmark: 192000 },
  { time: 'Sep', value: 220000, benchmark: 198000 },
  { time: 'Oct', value: 228000, benchmark: 205000 },
  { time: 'Nov', value: 235000, benchmark: 212000 },
  { time: 'Dec', value: 245000, benchmark: 220000 }
];

// Market Data
export const marketData: MarketData[] = [
  { symbol: 'SPY', price: 450.25, change: 2.15, changePercent: 0.48, volume: 125000000, marketCap: 420000000000 },
  { symbol: 'QQQ', price: 380.75, change: -1.25, changePercent: -0.33, volume: 85000000, marketCap: 180000000000 },
  { symbol: 'VTI', price: 235.60, change: 1.80, changePercent: 0.77, volume: 45000000, marketCap: 320000000000 },
  { symbol: 'VYM', price: 115.40, change: 0.65, changePercent: 0.57, volume: 15000000, marketCap: 45000000000 },
  { symbol: 'VNQ', price: 88.90, change: -0.35, changePercent: -0.39, volume: 25000000, marketCap: 35000000000 }
];

// Market indices data for dashboard
export const marketIndexData: MarketIndexData = {
  sp500: {
    current: 4250.67,
    change: '+1.23%',
    changePoints: '+51.45',
    volume: '3.2B',
    marketCap: '$38.2T'
  },
  nasdaq: {
    current: 13250.11,
    change: '+0.87%',
    changePoints: '+114.23',
    volume: '2.1B',
    marketCap: '$18.5T'
  },
  dowJones: {
    current: 33850.45,
    change: '+0.95%',
    changePoints: '+318.76',
    volume: '890M',
    marketCap: '$12.8T'
  }
};

// Economic Indicators
export const economicIndicators: EconomicIndicator[] = [
  { name: 'GDP Growth Rate', value: 2.1, change: 0.3, unit: '%', frequency: 'Quarterly' },
  { name: 'Inflation Rate', value: 3.2, change: -0.1, unit: '%', frequency: 'Monthly' },
  { name: 'Unemployment Rate', value: 3.8, change: -0.2, unit: '%', frequency: 'Monthly' },
  { name: 'Federal Funds Rate', value: 5.25, change: 0.0, unit: '%', frequency: 'Monthly' },
  { name: 'Consumer Confidence', value: 102.5, change: 2.1, unit: 'Index', frequency: 'Monthly' },
  { name: 'Manufacturing PMI', value: 52.3, change: 1.2, unit: 'Index', frequency: 'Monthly' }
];

// Economic indicators chart data
export const economicIndicatorsChart: EconomicIndicatorChart[] = [
  {
    name: 'GDP Growth',
    current: '2.1%',
    previous: '1.8%',
    trend: 'improving',
    description: 'Quarterly GDP growth showing steady improvement'
  },
  {
    name: 'Inflation',
    current: '3.2%',
    previous: '3.3%',
    trend: 'improving',
    description: 'Inflation rate trending downward gradually'
  },
  {
    name: 'Employment',
    current: '3.8%',
    previous: '4.0%',
    trend: 'improving',
    description: 'Unemployment rate at healthy levels'
  }
];

// Sector Performance
export const sectorPerformance: SectorPerformance[] = [
  { sector: 'Technology', performance: 15.2, marketCap: 8500000000000, volume: 1250000000 },
  { sector: 'Healthcare', performance: 8.7, marketCap: 6200000000000, volume: 890000000 },
  { sector: 'Financial Services', performance: 12.1, marketCap: 5800000000000, volume: 950000000 },
  { sector: 'Consumer Discretionary', performance: 9.8, marketCap: 4200000000000, volume: 780000000 },
  { sector: 'Communication Services', performance: 11.5, marketCap: 3800000000000, volume: 650000000 },
  { sector: 'Industrials', performance: 7.3, marketCap: 3200000000000, volume: 520000000 },
  { sector: 'Consumer Staples', performance: 4.2, marketCap: 2800000000000, volume: 380000000 },
  { sector: 'Energy', performance: -2.1, marketCap: 2100000000000, volume: 450000000 },
  { sector: 'Utilities', performance: 3.8, marketCap: 1200000000000, volume: 280000000 },
  { sector: 'Real Estate', performance: 1.5, marketCap: 1100000000000, volume: 220000000 }
];

// Sector performance chart data
export const sectorChartData: SectorChartData[] = [
  { name: 'Technology', performance: '+15.2%', color: '#3B82F6' },
  { name: 'Healthcare', performance: '+8.7%', color: '#10B981' },
  { name: 'Financials', performance: '+12.1%', color: '#F59E0B' },
  { name: 'Consumer', performance: '+9.8%', color: '#EF4444' },
  { name: 'Communications', performance: '+11.5%', color: '#8B5CF6' }
];

// Portfolio Allocation Data
export const allocationData: AllocationData[] = [
  { category: 'Technology', amount: 140275, percentage: 65.2, color: '#3B82F6' },
  { category: 'Consumer Discretionary', amount: 12287.50, percentage: 5.7, color: '#10B981' },
  { category: 'Cash', amount: 62500, percentage: 29.1, color: '#F59E0B' }
];

// Allocation chart data
export const allocationChartData: AllocationChartData[] = [
  { name: 'Technology', value: 65.2, color: '#3B82F6' },
  { name: 'Consumer Discretionary', value: 5.7, color: '#10B981' },
  { name: 'Cash', value: 29.1, color: '#F59E0B' }
];

// Financial Recommendations
export const recommendations: Recommendation[] = [
  {
    id: '1',
    type: 'BUY',
    symbol: 'NVDA',
    company: 'NVIDIA Corporation',
    currentPrice: 875.25,
    targetPrice: 950.00,
    confidence: 85,
    reasoning: 'Strong growth in AI and data center markets, positive earnings outlook',
    riskLevel: 'MEDIUM'
  },
  {
    id: '2',
    type: 'HOLD',
    symbol: 'AAPL',
    company: 'Apple Inc.',
    currentPrice: 175.25,
    targetPrice: 185.00,
    confidence: 78,
    reasoning: 'Stable revenue streams but facing market saturation in smartphones',
    riskLevel: 'LOW'
  },
  {
    id: '3',
    type: 'SELL',
    symbol: 'TSLA',
    company: 'Tesla Inc.',
    currentPrice: 245.75,
    targetPrice: 220.00,
    confidence: 72,
    reasoning: 'Valuation appears stretched, increased competition in EV market',
    riskLevel: 'HIGH'
  }
];

// Recommendations chart data
export const recommendationsChart: RecommendationChart[] = [
  {
    type: 'BUY',
    asset: 'NVIDIA',
    confidence: 85,
    reason: 'Strong AI market growth',
    impact: 'High',
    riskLevel: 'Medium',
    timeHorizon: '6-12 months'
  },
  {
    type: 'HOLD',
    asset: 'Apple',
    confidence: 78,
    reason: 'Stable revenue streams',
    impact: 'Medium',
    riskLevel: 'Low',
    timeHorizon: '12+ months'
  },
  {
    type: 'SELL',
    asset: 'Tesla',
    confidence: 72,
    reason: 'Stretched valuation',
    impact: 'High',
    riskLevel: 'High',
    timeHorizon: '3-6 months'
  }
];

// Financial Goals
export const financialGoals: FinancialGoal[] = [
  {
    id: '1',
    title: 'Emergency Fund',
    targetAmount: 15000,
    currentAmount: 12000,
    targetDate: '2024-12-31',
    category: 'Savings',
    priority: 'HIGH',
    status: 'ON_TRACK'
  },
  {
    id: '2',
    title: 'Vacation Fund',
    targetAmount: 5000,
    currentAmount: 3200,
    targetDate: '2024-06-01',
    category: 'Travel',
    priority: 'MEDIUM',
    status: 'ON_TRACK'
  },
  {
    id: '3',
    title: 'Retirement Account',
    targetAmount: 500000,
    currentAmount: 125000,
    targetDate: '2045-12-31',
    category: 'Retirement',
    priority: 'HIGH',
    status: 'BEHIND'
  },
  {
    id: '4',
    title: 'Home Down Payment',
    targetAmount: 75000,
    currentAmount: 45000,
    targetDate: '2025-08-01',
    category: 'Housing',
    priority: 'MEDIUM',
    status: 'AHEAD'
  }
];

// Goals chart data
export const financialGoalsChart: GoalChart[] = [
  {
    name: 'Emergency Fund',
    current: 12000,
    target: 15000,
    progress: 80,
    timeframe: '6 months',
    description: 'Building financial security',
    priority: 'High',
    monthlyContribution: 500,
    projectedCompletion: 'Dec 2024'
  },
  {
    name: 'Vacation Fund',
    current: 3200,
    target: 5000,
    progress: 64,
    timeframe: '3 months',
    description: 'Summer vacation savings',
    priority: 'Medium',
    monthlyContribution: 600,
    projectedCompletion: 'Jun 2024'
  },
  {
    name: 'Retirement',
    current: 125000,
    target: 500000,
    progress: 25,
    timeframe: '20 years',
    description: 'Long-term retirement planning',
    priority: 'High',
    monthlyContribution: 800,
    projectedCompletion: '2045'
  }
];

// Export both the original data and chart-specific data
export {
  portfolioData as portfolioItems,
  marketData as marketItems,
  economicIndicators as economicItems,
  sectorPerformance as sectorItems,
  allocationData as allocationItems,
  recommendations as recommendationItems,
  financialGoals as goalItems
};
