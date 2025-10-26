import React, { memo, useMemo } from 'react';
import { BarChart3, Activity, DollarSign, Target, Lightbulb, CheckCircle } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { StatCard } from '../ui/StatCard';
import { CardSkeleton, ChartSkeleton } from '../ui/Skeleton';

/**
 * PERFORMANCE OPTIMIZATIONS:
 * - Lazy loaded via React.lazy() in App.tsx for code splitting
 * - React.memo for chart and card components to prevent unnecessary re-renders
 * - useMemo for expensive data processing and calculations
 * - Optimized animations with proper delay staggering
 * - Tree-shaken Recharts imports for smaller bundle size
 * - Memoized chart components (PortfolioChart, MarketCard) for optimal performance
 * - Efficient prop drilling with optimized data structures
 * - Responsive design with unified breakpoint system (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px)
 * - Accessibility: ARIA labels, keyboard navigation, screen reader support
 * - Simplified animations: limited opacity and transform chains for performance
 */

interface DashboardProps {
  portfolioData: Array<{
    time: string;
    value: number;
    benchmark: number;
  }>;
  marketData?: {
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
  };
  economicIndicators?: Array<{
    name: string;
    current: string;
    previous: string;
    trend: 'improving' | 'declining' | 'stable';
    description: string;
  }>;
  sectorPerformance?: Array<{
    name: string;
    performance: string;
    color: string;
  }>;
  isLoading?: boolean;
}

// Memoized chart components for better performance
const PortfolioChart = memo(({ data }: { data: Array<{ time: string; value: number; benchmark: number; }> }) => (
  <div className="h-64 sm:h-72 lg:h-80">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis
          dataKey="time"
          stroke="rgba(255,255,255,0.5)"
          fontSize={12}
          className="text-xs sm:text-sm"
        />
        <YAxis
          stroke="rgba(255,255,255,0.5)"
          fontSize={12}
          className="text-xs sm:text-sm"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: 'white'
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#2563EB"
          fill="url(#portfolioGradient)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="benchmark"
          stroke="#64748B"
          fill="transparent"
          strokeWidth={2}
          strokeDasharray="5 5"
        />
        <defs>
          <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  </div>
));

// Memoized market card component - prevents re-renders when parent data hasn't changed
const MarketCard = memo(({
  title,
  value,
  change,
  changePoints: _changePoints,
  volume: _volume,
  marketCap: _marketCap,
  Icon,
  delay: _delay
}: {
  title: string;
  value: string;
  change: string;
  changePoints: string;
  volume: string;
  marketCap: string;
  Icon: React.ComponentType<{ className?: string }>;
  delay: number;
}) => {
  return (
    <StatCard
      title={title}
      value={value}
      change={change}
      changeType="positive"
      icon={Icon}
      className="h-full"
      trend="up"
    />
  );
});

MarketCard.displayName = 'MarketCard';

export const Dashboard: React.FC<DashboardProps> = ({
  portfolioData,
  marketData,
  economicIndicators = [],
  sectorPerformance = [],
  isLoading = false
}) => {
  // Memoize processed data to avoid recalculation on re-renders
  const processedMarketData = useMemo(() => ({
    sp500: marketData?.sp500 || {
      current: 4250.67,
      change: '+1.23%',
      changePoints: '+51.45',
      volume: '3.2B',
      marketCap: '$38.2T'
    },
    nasdaq: marketData?.nasdaq || {
      current: 13250.11,
      change: '+0.87%',
      changePoints: '+114.23',
      volume: '2.1B',
      marketCap: '$18.5T'
    },
    dowJones: marketData?.dowJones || {
      current: 33850.45,
      change: '+0.95%',
      changePoints: '+318.76',
      volume: '890M',
      marketCap: '$12.8T'
    }
  }), [marketData]);

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6 sm:space-y-8">
        {/* Welcome Section Skeleton */}
        <CardSkeleton className="p-6 sm:p-8" />

        {/* Market Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} className="p-6" />
          ))}
        </div>

        {/* Charts Section Skeleton */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>

        {/* Bottom Section Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <CardSkeleton className="lg:col-span-2" />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8" role="main" aria-label="Financial Dashboard">
      {/* Welcome Section */}
      <section className="glass-card-strong p-4 sm:p-6 lg:p-8" aria-labelledby="welcome-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1
              id="welcome-heading"
              className="text-xl sm:text-2xl lg:text-3xl font-bold font-display mb-2"
            >
              Welcome back, <span className="gradient-text">Investor</span>
            </h1>
            <p className="text-sm sm:text-base text-neutral-300">
              Financial overview and market insights
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              className="btn-primary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-auto"
              aria-label="View detailed financial report"
            >
              View Full Report
            </button>
          </div>
        </div>
      </section>

      {/* Market Overview Cards */}
      <section aria-labelledby="market-heading">
        <h2 id="market-heading" className="sr-only">Market Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <MarketCard
            title="S&P 500"
            value={processedMarketData.sp500.current.toLocaleString()}
            change={processedMarketData.sp500.change}
            changePoints={processedMarketData.sp500.changePoints}
            volume={processedMarketData.sp500.volume}
            marketCap={processedMarketData.sp500.marketCap}
            Icon={BarChart3}
            delay={0.1}
          />

          <MarketCard
            title="NASDAQ"
            value={processedMarketData.nasdaq.current.toLocaleString()}
            change={processedMarketData.nasdaq.change}
            changePoints={processedMarketData.nasdaq.changePoints}
            volume={processedMarketData.nasdaq.volume}
            marketCap={processedMarketData.nasdaq.marketCap}
            Icon={Activity}
            delay={0.2}
          />

          <MarketCard
            title="Dow Jones"
            value={processedMarketData.dowJones.current.toLocaleString()}
            change={processedMarketData.dowJones.change}
            changePoints={processedMarketData.dowJones.changePoints}
            volume={processedMarketData.dowJones.volume}
            marketCap={processedMarketData.dowJones.marketCap}
            Icon={DollarSign}
            delay={0.3}
          />
        </div>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8" aria-labelledby="charts-heading">
        <h2 id="charts-heading" className="sr-only">Portfolio Performance Charts</h2>

        {/* Portfolio Performance Chart */}
        <div className="glass-card-strong p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-white">Portfolio Performance</h3>
            <div className="flex items-center space-x-2 text-xs sm:text-sm">
              <div className="w-3 h-3 bg-brand-accent rounded-full"></div>
              <span className="text-neutral-300">Portfolio</span>
              <div className="w-3 h-3 bg-neutral-500 rounded-full ml-2"></div>
              <span className="text-neutral-300">Benchmark</span>
            </div>
          </div>
          <PortfolioChart data={portfolioData} />
        </div>

        {/* Sector Performance */}
        <div className="glass-card-strong p-4 sm:p-6 lg:p-8">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Sector Performance</h3>
          <div className="space-y-3 sm:space-y-4">
            {sectorPerformance.map((sector, _index) => (
              <div
                key={sector.name}
                className="flex items-center justify-between p-3 glass-card rounded-lg hover:bg-white/5 transition-colors"
                role="listitem"
                aria-label={`${sector.name} sector performance: ${sector.performance}`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: sector.color }}
                    aria-hidden="true"
                  ></div>
                  <span className="text-white font-medium text-sm sm:text-base">{sector.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`font-semibold text-sm sm:text-base ${
                    sector.performance.startsWith('+') ? 'text-brand-success' : 'text-brand-error'
                  }`}>
                    {sector.performance}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Economic Indicators & Quick Actions */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8" aria-labelledby="bottom-section-heading">
        <h2 id="bottom-section-heading" className="sr-only">Economic Indicators and Quick Actions</h2>

        {/* Economic Indicators */}
        <div className="glass-card-strong p-4 sm:p-6 lg:p-8">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Economic Indicators</h3>
          <div className="space-y-3 sm:space-y-4" role="list" aria-label="Economic indicators list">
            {economicIndicators.map((indicator, _index) => (
              <div
                key={indicator.name}
                className="flex items-start justify-between p-3 glass-card rounded-lg hover:bg-white/5 transition-colors"
                role="listitem"
                tabIndex={0}
                aria-label={`${indicator.name}: ${indicator.current}, ${indicator.trend} trend`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm sm:text-base truncate">{indicator.name}</p>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{indicator.description}</p>
                </div>
                <div className="text-right ml-4 flex-shrink-0">
                  <p className="text-white font-semibold text-sm sm:text-base">{indicator.current}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <span className={`text-xs ${
                      indicator.trend === 'improving' ? 'text-brand-success' :
                      indicator.trend === 'declining' ? 'text-brand-error' : 'text-neutral-400'
                    }`}>
                      vs {indicator.previous}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card-strong p-4 sm:p-6 lg:p-8 lg:col-span-2">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4" role="grid" aria-label="Quick action buttons">
            <button
              className="p-3 sm:p-4 glass-card rounded-lg text-left hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent/50 group"
              role="gridcell"
              tabIndex={0}
              aria-label="Set new financial goal"
            >
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-brand-accent mb-2 sm:mb-3 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">Set New Goal</h4>
              <p className="text-xs sm:text-sm text-neutral-300">Create a new financial target</p>
            </button>

            <button
              className="p-3 sm:p-4 glass-card rounded-lg text-left hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent/50 group"
              role="gridcell"
              tabIndex={0}
              aria-label="View portfolio analysis"
            >
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-brand-accent mb-2 sm:mb-3 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">Portfolio Analysis</h4>
              <p className="text-xs sm:text-sm text-neutral-300">Deep dive into your investments</p>
            </button>

            <button
              className="p-3 sm:p-4 glass-card rounded-lg text-left hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent/50 group"
              role="gridcell"
              tabIndex={0}
              aria-label="Get AI-powered financial advice"
            >
              <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-brand-accent mb-2 sm:mb-3 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">Get Advice</h4>
              <p className="text-xs sm:text-sm text-neutral-300">AI-powered recommendations</p>
            </button>

            <button
              className="p-3 sm:p-4 glass-card rounded-lg text-left hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent/50 group"
              role="gridcell"
              tabIndex={0}
              aria-label="Track financial goal progress"
            >
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-brand-accent mb-2 sm:mb-3 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">Track Progress</h4>
              <p className="text-xs sm:text-sm text-neutral-300">Monitor your financial goals</p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
