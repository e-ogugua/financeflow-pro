import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface PortfolioProps {
  allocationData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export const Portfolio: React.FC<PortfolioProps> = ({ allocationData }) => {
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('moderate');

  const riskProfiles = [
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

  const currentProfile = riskProfiles.find(p => p.level === selectedRiskLevel) || riskProfiles[1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Asset Allocation */}
        <motion.div
          className="glass-card p-6"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Asset Allocation</h2>
            <div className="text-sm text-neutral-400">Current Portfolio</div>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <RechartsPieChart>
              <Pie
                data={allocationData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {allocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-2 gap-3 mt-4">
            {allocationData.map((item) => (
              <motion.div
                key={item.name}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/5 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-neutral-300">{item.name}</span>
                  <span className="text-sm text-white ml-auto block">{item.value}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Risk Profile Analysis */}
        <motion.div
          className="glass-card p-6"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Risk Profile Analysis</h2>
            <div className="text-sm text-neutral-400">Risk Assessment</div>
          </div>

          <div className="space-y-4">
            {riskProfiles.map((profile) => (
              <motion.div
                key={profile.level}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedRiskLevel === profile.level
                    ? 'border-brand-accent bg-brand-accent/10 shadow-lg ring-2 ring-brand-accent/20'
                    : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30'
                }`}
                onClick={() => setSelectedRiskLevel(profile.level)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-white">{profile.label}</h3>
                    <p className="text-sm text-neutral-300">{profile.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-brand-success">{profile.return}</p>
                    <p className="text-sm text-neutral-400">{profile.risk} Risk</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div className="text-center">
                    <p className="text-neutral-400 mb-1">Sharpe Ratio</p>
                    <p className="font-semibold text-white">{profile.SharpeRatio}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-neutral-400 mb-1">Max Drawdown</p>
                    <p className="font-semibold text-red-400">{profile.maxDrawdown}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-neutral-400 mb-1">Volatility</p>
                    <p className="font-semibold text-white">{profile.volatility}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex justify-between text-xs text-neutral-400 mb-2">
                    <span>Allocation:</span>
                    <span>Stocks {profile.allocation?.stocks}% • Bonds {profile.allocation?.bonds}% • Alternatives {profile.allocation?.alternatives}%</span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 flex-1" style={{ width: `${profile.allocation?.stocks}%` }}></div>
                    <div className="bg-green-500 flex-1" style={{ width: `${profile.allocation?.bonds}%` }}></div>
                    <div className="bg-purple-500 flex-1" style={{ width: `${profile.allocation?.alternatives}%` }}></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Current Profile Summary */}
          <motion.div
            className="mt-6 p-4 bg-gradient-to-r from-brand-accent/10 to-blue-500/10 rounded-lg border border-brand-accent/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-semibold text-white mb-2">Current Profile: {currentProfile.label}</h4>
            <p className="text-sm text-neutral-300 mb-3">
              Your portfolio is optimized for {currentProfile.risk.toLowerCase()} risk tolerance with expected returns of {currentProfile.return}.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-neutral-400">Risk Level</p>
                <p className="font-semibold text-white">{currentProfile.risk}</p>
              </div>
              <div>
                <p className="text-neutral-400">Sharpe Ratio</p>
                <p className="font-semibold text-white">{currentProfile.SharpeRatio}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
