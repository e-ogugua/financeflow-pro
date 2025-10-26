import React, { useMemo } from 'react';
import { Target, TrendingUp, Calendar, DollarSign, AlertCircle, CheckCircle2, Plus } from 'lucide-react';
import { Progress } from '../ui/Progress';
import { CardSkeleton, ListSkeleton } from '../ui/Skeleton';

/**
 * PERFORMANCE OPTIMIZATIONS:
 * - useMemo for goal calculations and processing
 * - Responsive design with unified breakpoint system
 * - Accessibility: ARIA labels, keyboard navigation, screen reader support
 * - Simplified animations: limited opacity and transform chains
 * - Optimized progress calculations
 */

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
  isLoading?: boolean;
}

export const Goals: React.FC<GoalsProps> = ({ financialGoals, isLoading = false }) => {
  // Memoize goal processing
  const processedGoals = useMemo(() => ({
    totalContributions: financialGoals.reduce((sum, goal) => sum + (goal.monthlyContribution || 0), 0),
    completedGoals: financialGoals.filter(goal => goal.progress >= 100).length,
    onTrackGoals: financialGoals.filter(goal => goal.progress >= 50 && goal.progress < 100).length,
    behindGoals: financialGoals.filter(goal => goal.progress < 50).length,
    totalProgress: financialGoals.length > 0
      ? Math.round(financialGoals.reduce((sum, goal) => sum + goal.progress, 0) / financialGoals.length)
      : 0
  }), [financialGoals]);

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getStatusIcon = (progress: number) => {
    if (progress >= 100) return <CheckCircle2 className="w-5 h-5 text-brand-success" />;
    if (progress >= 50) return <Target className="w-5 h-5 text-yellow-400" />;
    return <AlertCircle className="w-5 h-5 text-brand-error" />;
  };

  const getDaysUntilTarget = (projectedCompletion?: string) => {
    if (!projectedCompletion) return null;
    const targetDate = new Date(projectedCompletion);
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6 sm:space-y-8">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardSkeleton className="h-16 w-full sm:w-1/2" />
          <CardSkeleton className="h-10 w-full sm:w-32" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} className="p-6" />
          ))}
        </div>

        {/* Goals List Skeleton */}
        <ListSkeleton items={3} />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8" role="main" aria-label="Financial Goals Management">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4" aria-labelledby="goals-heading">
        <div>
          <h1 id="goals-heading" className="text-xl sm:text-2xl lg:text-3xl font-bold font-display mb-2">
            Financial <span className="gradient-text">Goals</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-300">
            Track progress towards your financial objectives
          </p>
        </div>
        <div className="flex-shrink-0">
          <button
            className="btn-primary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-auto flex items-center space-x-2"
            aria-label="Add new financial goal"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Add Goal</span>
          </button>
        </div>
      </section>

      {/* Goals Overview Stats */}
      <section aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="sr-only">Goals Overview Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-card p-4 sm:p-6 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Target className="w-5 h-5 text-brand-accent" aria-hidden="true" />
              <h4 className="font-semibold text-white text-sm sm:text-base">Total Goals</h4>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{financialGoals.length}</p>
            <p className="text-xs sm:text-sm text-neutral-300">Active financial targets</p>
          </div>

          <div className="glass-card p-4 sm:p-6 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-brand-success" aria-hidden="true" />
              <h4 className="font-semibold text-white text-sm sm:text-base">Completed</h4>
            </div>
            <p className="text-2xl font-bold text-brand-success mb-1">{processedGoals.completedGoals}</p>
            <p className="text-xs sm:text-sm text-neutral-300">Goals achieved</p>
          </div>

          <div className="glass-card p-4 sm:p-6 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="w-5 h-5 text-yellow-400" aria-hidden="true" />
              <h4 className="font-semibold text-white text-sm sm:text-base">On Track</h4>
            </div>
            <p className="text-2xl font-bold text-yellow-400 mb-1">{processedGoals.onTrackGoals}</p>
            <p className="text-xs sm:text-sm text-neutral-300">≥50% progress</p>
          </div>

          <div className="glass-card p-4 sm:p-6 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <DollarSign className="w-5 h-5 text-brand-accent" aria-hidden="true" />
              <h4 className="font-semibold text-white text-sm sm:text-base">Monthly Savings</h4>
            </div>
            <p className="text-2xl font-bold text-white mb-1">
              ${processedGoals.totalContributions.toLocaleString()}
            </p>
            <p className="text-xs sm:text-sm text-neutral-300">Total contributions</p>
          </div>
        </div>
      </section>

      {/* Goals List */}
      <section aria-labelledby="goals-list-heading">
        <h2 id="goals-list-heading" className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
          Your Financial Goals
        </h2>
        <div className="space-y-4 sm:space-y-6" role="list" aria-label="Financial goals list">
          {financialGoals.map((goal, _index) => (
            <div
              key={goal.name}
              className="glass-card p-4 sm:p-6 lg:p-8 rounded-lg hover:bg-white/5 transition-colors"
              role="listitem"
              tabIndex={0}
              aria-label={`Goal: ${goal.name}, ${goal.progress}% complete, target ${goal.target.toLocaleString()}`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(goal.progress)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-base sm:text-lg font-semibold text-white truncate">{goal.name}</h3>
                      {goal.priority && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(goal.priority)}`}>
                          {goal.priority}
                        </span>
                      )}
                    </div>
                    {goal.description && (
                      <p className="text-sm text-neutral-300 mb-3 line-clamp-2">{goal.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex-shrink-0 text-right">
                  <div className="text-2xl font-bold text-white mb-1">
                    ${goal.current.toLocaleString()}
                  </div>
                  <div className="text-sm text-neutral-400">
                    of ${goal.target.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-neutral-300">Progress</span>
                  <span className={`text-sm font-medium ${
                    goal.progress >= 100 ? 'text-brand-success' :
                    goal.progress >= 50 ? 'text-yellow-400' : 'text-brand-error'
                  }`}>
                    {goal.progress}%
                  </span>
                </div>
                <Progress
                  value={goal.progress}
                  className={`h-2 ${goal.progress >= 100 ? 'progress-complete' : ''}`}
                  aria-label={`Goal progress: ${goal.progress}%`}
                />
              </div>

              {/* Goal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-neutral-400" aria-hidden="true" />
                  <div>
                    <p className="text-neutral-400">Target Date</p>
                    <p className="text-white font-medium">{goal.timeframe}</p>
                  </div>
                </div>

                {goal.monthlyContribution && (
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-neutral-400" aria-hidden="true" />
                    <div>
                      <p className="text-neutral-400">Monthly</p>
                      <p className="text-white font-medium">${goal.monthlyContribution.toLocaleString()}</p>
                    </div>
                  </div>
                )}

                {goal.projectedCompletion && (
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-neutral-400" aria-hidden="true" />
                    <div>
                      <p className="text-neutral-400">Est. Completion</p>
                      <p className="text-white font-medium">
                        {getDaysUntilTarget(goal.projectedCompletion)} days
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t border-white/10">
                <button
                  className="flex-1 glass-card px-3 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
                  aria-label={`Update ${goal.name} goal`}
                >
                  Update Goal
                </button>
                <button
                  className="flex-1 glass-card px-3 py-2 rounded-lg text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
                  aria-label={`View details for ${goal.name} goal`}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Empty State */}
      {financialGoals.length === 0 && (
        <section className="text-center py-12" aria-labelledby="empty-state-heading">
          <h2 id="empty-state-heading" className="text-lg sm:text-xl font-semibold text-white mb-4">
            No Financial Goals Yet
          </h2>
          <p className="text-neutral-300 mb-6 max-w-md mx-auto">
            Start your financial journey by setting your first goal. Whether it's building an emergency fund or saving for a dream vacation, every journey begins with a single step.
          </p>
          <button
            className="btn-primary px-6 py-3 flex items-center space-x-2 mx-auto"
            aria-label="Create your first financial goal"
          >
            <Plus className="w-5 h-5" aria-hidden="true" />
            <span>Create Your First Goal</span>
          </button>
        </section>
      )}
    </div>
  );
};

export default Goals;
