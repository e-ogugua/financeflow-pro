import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
  className?: string;
  trend?: 'up' | 'down' | 'stable';
  size?: 'sm' | 'md' | 'lg';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  className = '',
  trend = 'stable',
  size = 'md'
}) => {
  const changeColorClasses = {
    positive: 'text-brand-success',
    negative: 'text-brand-error',
    neutral: 'text-neutral-400'
  };

  const trendIcons = {
    up: '↗',
    down: '↘',
    stable: '→'
  };

  const sizeClasses = {
    sm: {
      container: 'p-4',
      title: 'text-sm',
      value: 'text-lg',
      icon: 'w-6 h-6',
      change: 'text-xs'
    },
    md: {
      container: 'p-6',
      title: 'text-sm',
      value: 'text-2xl',
      icon: 'w-8 h-8',
      change: 'text-sm'
    },
    lg: {
      container: 'p-8',
      title: 'text-base',
      value: 'text-3xl',
      icon: 'w-10 h-10',
      change: 'text-base'
    }
  };

  return (
    <motion.div
      className={`glass-card hover:bg-white/15 transition-all duration-300 ${sizeClasses[size].container} ${className}`}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={`font-medium mb-1 text-neutral-300 ${sizeClasses[size].title}`}>{title}</p>
          <p className={`font-bold mb-2 text-white ${sizeClasses[size].value}`}>{value}</p>
          {change && (
            <div className="flex items-center gap-1">
              <span className={`font-medium ${changeColorClasses[changeType]} ${sizeClasses[size].change}`}>
                {trendIcons[trend]} {change}
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <motion.div
            className={`ml-4 ${sizeClasses[size].icon} text-brand-accent`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Icon />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
