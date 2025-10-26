import React from 'react';

// Skeleton loading components with shimmer animation
export const CardSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`glass-card animate-pulse ${className}`} data-testid="skeleton">
    <div className="space-y-3">
      <div className="h-4 bg-neutral-700/50 rounded w-3/4 animate-shimmer"></div>
      <div className="h-6 bg-neutral-700/50 rounded w-1/2 animate-shimmer"></div>
      <div className="h-3 bg-neutral-700/50 rounded w-full animate-shimmer"></div>
    </div>
  </div>
);

export const ChartSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`glass-card p-6 ${className}`} data-testid="skeleton">
    <div className="h-4 bg-neutral-700/50 rounded w-1/3 mb-6 animate-shimmer"></div>
    <div className="h-64 bg-neutral-800/30 rounded animate-shimmer"></div>
  </div>
);

export const ListSkeleton = ({
  items = 3,
  className = ''
}: {
  items?: number;
  className?: string;
}) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="glass-card p-4" data-testid="skeleton">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-neutral-700/50 rounded-full animate-shimmer"></div>
            <div className="space-y-2">
              <div className="h-4 bg-neutral-700/50 rounded w-24 animate-shimmer"></div>
              <div className="h-3 bg-neutral-700/50 rounded w-16 animate-shimmer"></div>
            </div>
          </div>
          <div className="h-4 bg-neutral-700/50 rounded w-12 animate-shimmer"></div>
        </div>
      </div>
    ))}
  </div>
);

export const TableSkeleton = ({
  rows = 5,
  cols = 4,
  className = ''
}: {
  rows?: number;
  cols?: number;
  className?: string;
}) => (
  <div className={`glass-card ${className}`} data-testid="skeleton">
    <div className="p-6 border-b border-white/10">
      <div className="h-5 bg-neutral-700/50 rounded w-1/4 animate-shimmer"></div>
    </div>
    <div className="divide-y divide-white/10">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="p-4">
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: cols }).map((_, colIndex) => (
              <div
                key={colIndex}
                className="h-4 bg-neutral-700/50 rounded animate-shimmer"
                style={{ animationDelay: `${rowIndex * colIndex * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
