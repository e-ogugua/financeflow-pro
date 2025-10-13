import React from 'react';
import { motion } from 'framer-motion';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  color?: 'blue' | 'green' | 'purple' | 'orange';
  size?: 'sm' | 'md' | 'lg';
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  className = '',
  showLabel = false,
  color = 'blue',
  size = 'md'
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const colorClasses = {
    blue: 'from-brand-accent to-blue-500',
    green: 'from-brand-success to-green-500',
    purple: 'from-purple-600 to-purple-500',
    orange: 'from-brand-warning to-orange-500'
  };

  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm mb-2">
          <span className="text-neutral-300">Progress</span>
          <span className="font-medium text-white">{percentage.toFixed(1)}%</span>
        </div>
      )}
      <div className={`w-full bg-white/10 rounded-full ${heightClasses[size]} overflow-hidden`}>
        <motion.div
          className={`bg-gradient-to-r ${colorClasses[color]} ${heightClasses[size]} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${percentage}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
