import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, DollarSign, Target, Shield, Lightbulb, CheckCircle, AlertTriangle, BarChart3, PieChart } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Line, BarChart, Bar } from 'recharts';
import { StatCard } from '../ui/StatCard';

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
    >
      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          className="glass-card p-6"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-brand-accent" />
              <h3 className="font-semibold text-white">S&P 500</h3>
            </div>
            <span className="text-xs text-neutral-400">INDEX</span>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-white">{marketData?.sp500.current.toLocaleString() || '4,250.67'}</p>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-brand-success" />
              <span className="text-sm text-brand-success font-medium">{marketData?.sp500.change || '+1.23%'}</span>
              <span className="text-sm text-neutral-400">({marketData?.sp500.changePoints || '+51.45'})</span>
            </div>
            <div className="text-xs text-neutral-400">
              Vol: {marketData?.sp500.volume || '3.2B'} • Cap: {marketData?.sp500.marketCap || '$38.2T'}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass-card p-6"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-brand-accent" />
              <h3 className="font-semibold text-white">NASDAQ</h3>
            </div>
            <span className="text-xs text-neutral-400">INDEX</span>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-white">{marketData?.nasdaq.current.toLocaleString() || '13,250.11'}</p>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-brand-success" />
              <span className="text-sm text-brand-success font-medium">{marketData?.nasdaq.change || '+2.15%'}</span>
              <span className="text-sm text-neutral-400">({marketData?.nasdaq.changePoints || '+278.92'})</span>
            </div>
            <div className="text-xs text-neutral-400">
              Vol: {marketData?.nasdaq.volume || '4.1B'} • Cap: {marketData?.nasdaq.marketCap || '$16.8T'}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass-card p-6"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-brand-accent" />
              <h3 className="font-semibold text-white">Dow Jones</h3>
            </div>
            <span className="text-xs text-neutral-400">INDEX</span>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-white">{marketData?.dowJones.current.toLocaleString() || '33,800.45'}</p>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-brand-success" />
              <span className="text-sm text-brand-success font-medium">{marketData?.dowJones.change || '+0.87%'}</span>
              <span className="text-sm text-neutral-400">({marketData?.dowJones.changePoints || '+291.23'})</span>
            </div>
            <div className="text-xs text-neutral-400">
              Vol: {marketData?.dowJones.volume || '890M'} • Cap: {marketData?.dowJones.marketCap || '$12.1T'}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Portfolio Performance Chart */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Portfolio Performance</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-brand-accent text-white rounded text-sm font-medium">1Y</button>
              <button className="px-3 py-1 bg-white/10 rounded text-sm hover:bg-white/20 transition-colors">3Y</button>
              <button className="px-3 py-1 bg-white/10 rounded text-sm hover:bg-white/20 transition-colors">5Y</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={portfolioData}>
              <defs>
                <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#portfolioGradient)"
              />
              <Line
                type="monotone"
                dataKey="benchmark"
                stroke="#64748B"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Sector Performance */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Sector Performance</h2>
            <PieChart className="w-5 h-5 text-brand-accent" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sectorPerformance} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis type="number" stroke="#94A3B8" fontSize={12} tickFormatter={(value) => `${value}`} />
              <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={12} width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: any) => [`${value}`, 'Performance']}
              />
              <Bar dataKey="performance" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Economic Indicators & Financial Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Economic Indicators */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center space-x-2 mb-6">
            <Activity className="w-5 h-5 text-brand-accent" />
            <h3 className="text-lg font-bold text-white">Economic Indicators</h3>
          </div>
          <div className="space-y-4">
            {economicIndicators.slice(0, 4).map((indicator, index) => (
              <motion.div
                key={indicator.name}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div>
                  <p className="font-medium text-white text-sm">{indicator.name}</p>
                  <p className="text-xs text-neutral-400">{indicator.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">{indicator.current}</p>
                  <div className="flex items-center space-x-1">
                    {indicator.trend === 'improving' && <TrendingUp className="w-3 h-3 text-brand-success" />}
                    {indicator.trend === 'declining' && <TrendingDown className="w-3 h-3 text-brand-error" />}
                    {indicator.trend === 'stable' && <Activity className="w-3 h-3 text-neutral-400" />}
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

        {/* Financial Insights */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex items-center space-x-2 mb-6">
            <Lightbulb className="w-5 h-5 text-brand-warning" />
            <h3 className="text-lg font-bold text-white">Financial Insights</h3>
          </div>
          <div className="space-y-4">
            <motion.div
              className="bg-white/5 rounded-lg p-4 border border-white/10"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-4 h-4 text-brand-success" />
                <span className="text-sm font-medium text-white">Portfolio Health</span>
              </div>
              <p className="text-xs text-neutral-300">Your diversified portfolio shows strong performance with 15.2% YTD growth, outperforming major market indices.</p>
            </motion.div>
            <motion.div
              className="bg-white/5 rounded-lg p-4 border border-white/10"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-brand-warning" />
                <span className="text-sm font-medium text-white">Rebalancing Opportunity</span>
              </div>
              <p className="text-xs text-neutral-300">Technology sector exposure at 18% exceeds target. Consider reducing to 12% for optimal risk management.</p>
            </motion.div>
            <motion.div
              className="bg-white/5 rounded-lg p-4 border border-white/10"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-4 h-4 text-brand-accent" />
                <span className="text-sm font-medium text-white">Goal Achievement</span>
              </div>
              <p className="text-xs text-neutral-300">Emergency fund goal reached! Consider increasing retirement contributions to maximize compound growth.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
