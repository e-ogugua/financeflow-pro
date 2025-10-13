import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Calendar, DollarSign, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Progress } from '../ui/Progress';
import { Button } from '../ui/Button';

interface GoalsProps {
  financialGoals: Array<{
    name: string;
    current: number;
    target: number;
    progress: number;
    timeframe: string;
    description?: string;
    priority?: 'Low' | 'Medium' | 'High';
    monthlyContribution?: number;
    projectedCompletion?: string;
  }>;
}

export const Goals: React.FC<GoalsProps> = ({ financialGoals }) => {
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'High': return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'Low': return 'text-green-400 bg-green-400/10 border-green-400/30';
      default: return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
    }
  };

  const getDaysUntilTarget = (projectedCompletion?: string) => {
    if (!projectedCompletion) return null;
    const targetDate = new Date(projectedCompletion);
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Financial Goals</h2>
          <p className="text-neutral-400">Track progress towards your financial objectives</p>
        </div>
        <Button variant="outline" size="sm">
          <Target className="w-4 h-4 mr-2" />
          Add New Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {financialGoals.map((goal, index) => {
          const daysUntilTarget = getDaysUntilTarget(goal.projectedCompletion);
          const isOnTrack = goal.progress >= 50;

          return (
            <motion.div
              key={goal.name}
              className="glass-card p-6 hover:bg-white/15 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white">{goal.name}</h3>
                    {goal.priority && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(goal.priority)}`}>
                        {goal.priority}
                      </span>
                    )}
                  </div>
                  {goal.description && (
                    <p className="text-sm text-neutral-300 mb-3">{goal.description}</p>
                  )}
                </div>
                <div className="text-right">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isOnTrack ? 'bg-green-400/20' : 'bg-yellow-400/20'}`}>
                    {isOnTrack ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-400">Progress</span>
                  <span className="font-medium text-white">{goal.progress.toFixed(1)}%</span>
                </div>

                <Progress
                  value={goal.progress}
                  showLabel={false}
                  color={isOnTrack ? 'green' : 'blue'}
                />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-neutral-400 mb-1">Current</p>
                    <p className="font-semibold text-white">${goal.current.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-neutral-400 mb-1">Target</p>
                    <p className="font-semibold text-white">${goal.target.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <Calendar className="w-4 h-4" />
                    <span>{goal.timeframe}</span>
                    {daysUntilTarget !== null && (
                      <span className="text-brand-accent">• {daysUntilTarget} days left</span>
                    )}
                  </div>

                  {goal.monthlyContribution && (
                    <div className="flex items-center gap-1 text-sm text-neutral-400">
                      <DollarSign className="w-3 h-3" />
                      <span>${goal.monthlyContribution.toLocaleString()}/mo</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Adjust Goal
                  </Button>
                  <Button variant="ghost" size="sm">
                    <TrendingUp className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Card */}
      <motion.div
        className="mt-8 bg-gradient-to-r from-brand-accent/10 to-purple-500/10 rounded-xl p-6 border border-brand-accent/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Goals Summary</h3>
            <p className="text-neutral-300">
              {financialGoals.filter(g => g.progress >= 75).length} of {financialGoals.length} goals on track for completion
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-brand-accent">
              ${financialGoals.reduce((sum, goal) => sum + (goal.monthlyContribution || 0), 0).toLocaleString()}
            </p>
            <p className="text-sm text-neutral-400">Total Monthly Contributions</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
