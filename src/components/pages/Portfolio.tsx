import React, { memo, useState, useMemo } from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { DollarSign, Target, Activity } from 'lucide-react';
import { StatCard } from '../ui/StatCard';
import { Progress } from '../ui/Progress';
import { CardSkeleton, TableSkeleton } from '../ui/Skeleton';

/**
 * PERFORMANCE OPTIMIZATIONS:
 * - React.memo for expensive chart components
 * - useMemo for data processing and calculations
 * - Responsive design with unified breakpoint system
 * - Accessibility: ARIA labels, keyboard navigation, screen reader support
 * - Simplified animations: limited opacity and transform chains
 */

interface PortfolioProps {
  allocationData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  isLoading?: boolean;
}

interface RiskProfile {
  level: string;
  label: string;
  return: string;
  risk: string;
  description: string;
  allocation: { stocks: number; bonds: number; alternatives: number };
  SharpeRatio: number;
  maxDrawdown: string;
  volatility: string;
}

// Memoized chart components for better performance
const AllocationChart = memo(({ data }: { data: Array<{ name: string; value: number; color: string }> }) => (
  <div className="h-64 sm:h-72 lg:h-80">
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius="60%"
          innerRadius="30%"
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: 'white'
          }}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  </div>
));

AllocationChart.displayName = 'AllocationChart';

export const Portfolio: React.FC<PortfolioProps> = ({ allocationData, isLoading = false }) => {
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('moderate');

  const riskProfiles: RiskProfile[] = [
    {
      level: 'conservative',
      label: 'Conservative',
      return: '4-6%',
      risk: 'Low',
      description: 'Capital preservation with minimal volatility. Suitable for risk-averse investors nearing retirement or with short time horizons.',
      allocation: { stocks: 30, bonds: 60, alternatives: 10 },
      SharpeRatio: 0.8,
      maxDrawdown: '-8%',
      volatility: '6%'
    },
    {
      level: 'moderate',
      label: 'Moderate',
      return: '6-8%',
      risk: 'Medium',
      description: 'Balanced approach combining growth and stability. Appropriate for most individual investors with medium-term horizons.',
      allocation: { stocks: 55, bonds: 35, alternatives: 10 },
      SharpeRatio: 1.2,
      maxDrawdown: '-15%',
      volatility: '12%'
    },
    {
      level: 'aggressive',
      label: 'Aggressive',
      return: '8-12%',
      risk: 'High',
      description: 'Growth-oriented strategy maximizing long-term returns. Best suited for young investors with high risk tolerance and long time horizons.',
      allocation: { stocks: 80, bonds: 15, alternatives: 5 },
      SharpeRatio: 1.4,
      maxDrawdown: '-25%',
      volatility: '18%'
    }
  ];

  // Memoize current risk profile
  const currentProfile = useMemo(() =>
    riskProfiles.find(profile => profile.level === selectedRiskLevel) || riskProfiles[1],
    [selectedRiskLevel]
  );

  // Memoize portfolio metrics
  const portfolioMetrics = useMemo(() => ({
    totalValue: allocationData.reduce((sum, item) => sum + item.value, 0),
    topHolding: allocationData.reduce((max, item) =>
      item.value > max.value ? item : max, allocationData[0]
    ),
    diversification: allocationData.length > 3 ? 'High' : allocationData.length > 1 ? 'Medium' : 'Low'
  }), [allocationData]);

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6 sm:space-y-8">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardSkeleton className="h-16 w-full sm:w-1/2" />
          <CardSkeleton className="h-10 w-full sm:w-32" />
        </div>

        {/* Metrics Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} className="p-6" />
          ))}
        </div>

        {/* Chart and Table Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <CardSkeleton className="p-6" />
          <TableSkeleton rows={5} cols={3} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8" role="main" aria-label="Portfolio Management">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4" aria-labelledby="portfolio-heading">
        <div>
          <h1 id="portfolio-heading" className="text-xl sm:text-2xl lg:text-3xl font-bold font-display mb-2">
            Portfolio <span className="gradient-text">Management</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-300">
            Asset allocation and risk management overview
          </p>
        </div>
        <div className="flex-shrink-0">
          <select
            value={selectedRiskLevel}
            onChange={(e) => setSelectedRiskLevel(e.target.value)}
            className="glass-card px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
            aria-label="Select risk profile"
          >
            <option value="conservative">Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </div>
      </section>

      {/* Portfolio Metrics */}
      <section aria-labelledby="metrics-heading">
        <h2 id="metrics-heading" className="sr-only">Portfolio Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <StatCard
            title="Total Portfolio Value"
            value={`$${portfolioMetrics.totalValue.toLocaleString()}`}
            change="+12.5%"
            changeType="positive"
            icon={DollarSign}
            trend="up"
            className="h-full"
          />

          <StatCard
            title="Top Holding"
            value={portfolioMetrics.topHolding?.name || 'N/A'}
            change={`${portfolioMetrics.topHolding?.value.toLocaleString() || 0}`}
            changeType="neutral"
            icon={Target}
            trend="stable"
            className="h-full"
          />

          <StatCard
            title="Diversification"
            value={portfolioMetrics.diversification}
            change={`${allocationData.length} assets`}
            changeType="positive"
            icon={Activity}
            trend="up"
            className="h-full"
          />
        </div>
      </section>

      {/* Charts and Analysis */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8" aria-labelledby="analysis-heading">
        <h2 id="analysis-heading" className="sr-only">Portfolio Analysis</h2>

        {/* Asset Allocation Chart */}
        <div className="glass-card-strong p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-white">Asset Allocation</h3>
            <div className="flex items-center space-x-2 text-xs sm:text-sm">
              <span className="text-neutral-300">Current Distribution</span>
            </div>
          </div>
          <AllocationChart data={allocationData} />
          <div className="mt-4 space-y-2">
            {allocationData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  ></div>
                  <span className="text-white">{item.name}</span>
                </div>
                <span className="text-neutral-300 font-medium">
                  {item.value.toLocaleString()} ({((item.value / portfolioMetrics.totalValue) * 100).toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Profile Analysis */}
        <div className="glass-card-strong p-4 sm:p-6 lg:p-8">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Risk Profile Analysis</h3>

          {/* Current Profile */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm sm:text-base font-medium text-white">Current Profile</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                currentProfile.risk === 'Low' ? 'bg-green-500/20 text-green-400' :
                currentProfile.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {currentProfile.risk} Risk
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 mb-4">{currentProfile.description}</p>

            {/* Allocation Bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-1">
                  <span className="text-neutral-300">Stocks</span>
                  <span className="text-white">{currentProfile.allocation.stocks}%</span>
                </div>
                <Progress value={currentProfile.allocation.stocks} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-1">
                  <span className="text-neutral-300">Bonds</span>
                  <span className="text-white">{currentProfile.allocation.bonds}%</span>
                </div>
                <Progress value={currentProfile.allocation.bonds} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-1">
                  <span className="text-neutral-300">Alternatives</span>
                  <span className="text-white">{currentProfile.allocation.alternatives}%</span>
                </div>
                <Progress value={currentProfile.allocation.alternatives} className="h-2" />
              </div>
            </div>
          </div>

          {/* Risk Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-3 rounded-lg">
              <p className="text-xs text-neutral-400 mb-1">Expected Return</p>
              <p className="text-sm sm:text-base font-semibold text-brand-success">{currentProfile.return}</p>
            </div>
            <div className="glass-card p-3 rounded-lg">
              <p className="text-xs text-neutral-400 mb-1">Sharpe Ratio</p>
              <p className="text-sm sm:text-base font-semibold text-white">{currentProfile.SharpeRatio}</p>
            </div>
            <div className="glass-card p-3 rounded-lg">
              <p className="text-xs text-neutral-400 mb-1">Max Drawdown</p>
              <p className="text-sm sm:text-base font-semibold text-brand-error">{currentProfile.maxDrawdown}</p>
            </div>
            <div className="glass-card p-3 rounded-lg">
              <p className="text-xs text-neutral-400 mb-1">Volatility</p>
              <p className="text-sm sm:text-base font-semibold text-white">{currentProfile.volatility}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Holdings Table */}
      <section aria-labelledby="holdings-heading">
        <h2 id="holdings-heading" className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
          Current Holdings
        </h2>
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" role="table" aria-label="Portfolio holdings table">
              <thead className="border-b border-white/10">
                <tr className="text-left">
                  <th className="p-4 text-xs sm:text-sm font-medium text-neutral-400 uppercase tracking-wider">
                    Asset
                  </th>
                  <th className="p-4 text-xs sm:text-sm font-medium text-neutral-400 uppercase tracking-wider">
                    Allocation
                  </th>
                  <th className="p-4 text-xs sm:text-sm font-medium text-neutral-400 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="p-4 text-xs sm:text-sm font-medium text-neutral-400 uppercase tracking-wider">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {allocationData.map((holding, _index) => (
                  <tr
                    key={holding.name}
                    className="hover:bg-white/5 transition-colors"
                    role="row"
                    tabIndex={0}
                    aria-label={`${holding.name} holding: ${holding.value.toLocaleString()} value`}
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: holding.color }}
                          aria-hidden="true"
                        ></div>
                        <span className="text-white font-medium text-sm sm:text-base">{holding.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Progress
                          value={(holding.value / portfolioMetrics.totalValue) * 100}
                          className="w-16 sm:w-20 h-1.5"
                        />
                        <span className="text-xs sm:text-sm text-neutral-300">
                          {((holding.value / portfolioMetrics.totalValue) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-sm sm:text-base font-semibold text-white">
                      ${holding.value.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span className="text-xs sm:text-sm text-brand-success font-medium">
                        +2.3%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
