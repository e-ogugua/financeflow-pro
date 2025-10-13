import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, DollarSign, Target, Lightbulb, CheckCircle, BarChart3 } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

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
}

export const Dashboard: React.FC<DashboardProps> = ({
  portfolioData,
  marketData,
  economicIndicators = [],
  sectorPerformance = []
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Welcome Section */}
      <motion.div
        className="glass-card-strong p-6 sm:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display mb-2">
              Welcome back, <span className="gradient-text">Emmanuel</span>
            </h1>
            <p className="text-neutral-300 text-sm sm:text-base">
              Here's your financial overview for today
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <motion.button
              className="btn-primary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Full Report
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="glass-card p-6 card-interactive"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-brand-accent" />
              <h3 className="font-semibold text-white">S&P 500</h3>
            </div>
            <span className="text-xs text-neutral-400 bg-neutral-800/50 px-2 py-1 rounded-full">INDEX</span>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-white">{marketData?.sp500.current.toLocaleString() || '4,250.67'}</p>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-brand-success" />
              <span className="text-sm text-brand-success font-medium">{marketData?.sp500.change || '+1.23%'}</span>
              <span className="text-sm text-neutral-400">({marketData?.sp500.changePoints || '+51.45'})</span>
            </div>
            <div className="text-xs text-neutral-400 flex items-center space-x-4">
              <span>Vol: {marketData?.sp500.volume || '3.2B'}</span>
              <span>Cap: {marketData?.sp500.marketCap || '$38.2T'}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass-card p-6 card-interactive"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-brand-accent" />
              <h3 className="font-semibold text-white">NASDAQ</h3>
            </div>
            <span className="text-xs text-neutral-400 bg-neutral-800/50 px-2 py-1 rounded-full">INDEX</span>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-white">{marketData?.nasdaq.current.toLocaleString() || '13,250.11'}</p>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-brand-success" />
              <span className="text-sm text-brand-success font-medium">{marketData?.nasdaq.change || '+0.87%'}</span>
              <span className="text-sm text-neutral-400">({marketData?.nasdaq.changePoints || '+114.23'})</span>
            </div>
            <div className="text-xs text-neutral-400 flex items-center space-x-4">
              <span>Vol: {marketData?.nasdaq.volume || '2.1B'}</span>
              <span>Cap: {marketData?.nasdaq.marketCap || '$18.5T'}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass-card p-6 card-interactive"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-brand-accent" />
              <h3 className="font-semibold text-white">Dow Jones</h3>
            </div>
            <span className="text-xs text-neutral-400 bg-neutral-800/50 px-2 py-1 rounded-full">INDEX</span>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-white">{marketData?.dowJones.current.toLocaleString() || '33,850.45'}</p>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-brand-success" />
              <span className="text-sm text-brand-success font-medium">{marketData?.dowJones.change || '+0.95%'}</span>
              <span className="text-sm text-neutral-400">({marketData?.dowJones.changePoints || '+318.76'})</span>
            </div>
            <div className="text-xs text-neutral-400 flex items-center space-x-4">
              <span>Vol: {marketData?.dowJones.volume || '890M'}</span>
              <span>Cap: {marketData?.dowJones.marketCap || '$12.8T'}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Portfolio Performance Chart */}
        <motion.div
          className="glass-card-strong p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Portfolio Performance</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-brand-accent rounded-full"></div>
              <span className="text-sm text-neutral-300">Portfolio</span>
              <div className="w-3 h-3 bg-neutral-500 rounded-full ml-2"></div>
              <span className="text-sm text-neutral-300">Benchmark</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
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
        </motion.div>

        {/* Sector Performance */}
        <motion.div
          className="glass-card-strong p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-white mb-6">Sector Performance</h3>
          <div className="space-y-4">
            {sectorPerformance.map((sector, index) => (
              <motion.div
                key={sector.name}
                className="flex items-center justify-between p-3 glass-card rounded-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: sector.color }}
                  ></div>
                  <span className="text-white font-medium">{sector.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {sector.performance.startsWith('+') ? (
                    <TrendingUp className="w-4 h-4 text-brand-success" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-brand-error" />
                  )}
                  <span className={`font-semibold ${
                    sector.performance.startsWith('+') ? 'text-brand-success' : 'text-brand-error'
                  }`}>
                    {sector.performance}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Economic Indicators & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Economic Indicators */}
        <motion.div
          className="glass-card-strong p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-lg font-semibold text-white mb-6">Economic Indicators</h3>
          <div className="space-y-4">
            {economicIndicators.map((indicator, index) => (
              <motion.div
                key={indicator.name}
                className="flex items-start justify-between p-3 glass-card rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{indicator.name}</p>
                  <p className="text-xs text-neutral-400 mt-1">{indicator.description}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-white font-semibold">{indicator.current}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {indicator.trend === 'improving' ? (
                      <TrendingUp className="w-3 h-3 text-brand-success" />
                    ) : indicator.trend === 'declining' ? (
                      <TrendingDown className="w-3 h-3 text-brand-error" />
                    ) : (
                      <Activity className="w-3 h-3 text-neutral-400" />
                    )}
                    <span className={`text-xs ${
                      indicator.trend === 'improving' ? 'text-brand-success' :
                      indicator.trend === 'declining' ? 'text-brand-error' : 'text-neutral-400'
                    }`}>
                      vs {indicator.previous}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="glass-card-strong p-6 lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.button
              className="p-4 glass-card rounded-lg text-left hover:bg-white/10 transition-colors group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Target className="w-6 h-6 text-brand-accent mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-white mb-1">Set New Goal</h4>
              <p className="text-sm text-neutral-300">Create a new financial target</p>
            </motion.button>

            <motion.button
              className="p-4 glass-card rounded-lg text-left hover:bg-white/10 transition-colors group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <BarChart3 className="w-6 h-6 text-brand-accent mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-white mb-1">Portfolio Analysis</h4>
              <p className="text-sm text-neutral-300">Deep dive into your investments</p>
            </motion.button>

            <motion.button
              className="p-4 glass-card rounded-lg text-left hover:bg-white/10 transition-colors group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Lightbulb className="w-6 h-6 text-brand-accent mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-white mb-1">Get Advice</h4>
              <p className="text-sm text-neutral-300">AI-powered recommendations</p>
            </motion.button>

            <motion.button
              className="p-4 glass-card rounded-lg text-left hover:bg-white/10 transition-colors group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CheckCircle className="w-6 h-6 text-brand-accent mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-white mb-1">Track Progress</h4>
              <p className="text-sm text-neutral-300">Monitor your financial goals</p>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
