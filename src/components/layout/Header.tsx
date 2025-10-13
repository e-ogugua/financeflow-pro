import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Bell, Settings, User } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'advisor', label: 'Financial Advisor' },
    { id: 'goals', label: 'Goals' }
  ];

  return (
    <motion.header
      className="glass-card shadow-2xl sticky top-0 z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-brand-accent via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
              <Brain className="w-7 h-7 text-white relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 to-purple-600/20 animate-pulse-gentle"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif text-white tracking-tight">
                FinanceFlow <span className="gradient-text">Pro</span>
              </h1>
              <p className="text-sm text-neutral-300 font-medium">Professional Financial Management</p>
            </div>
          </motion.div>

          <nav className="hidden md:flex space-x-1">
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? 'text-brand-accent bg-brand-accent/10 shadow-sm border border-brand-accent/30'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div
                    className="absolute inset-0 bg-brand-accent/5 rounded-lg"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <motion.div
              className="w-10 h-10 glass-card flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5 text-neutral-300" />
            </motion.div>
            <motion.div
              className="w-10 h-10 glass-card flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings className="w-5 h-5 text-neutral-300" />
            </motion.div>
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-brand-accent to-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow-md relative overflow-hidden"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <User className="w-5 h-5 text-white" />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 to-blue-600/20 animate-pulse-gentle"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
