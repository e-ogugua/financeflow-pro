import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  variant?: 'default' | 'elevated' | 'outlined';
  animation?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  padding = 'lg',
  variant = 'default',
  animation = true
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const variantClasses = {
    default: 'glass-card',
    elevated: 'glass-card shadow-2xl border-white/30',
    outlined: 'bg-transparent border-2 border-brand-accent/30'
  };

  const hoverClasses = hover
    ? 'glass-card-hover'
    : '';

  const cardContent = (
    <div className={`${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );

  if (animation) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};
