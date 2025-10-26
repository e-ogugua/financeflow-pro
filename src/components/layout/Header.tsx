import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Settings, User, Menu, X, BarChart3, Briefcase, TrendingUp, Target } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (_id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'advisor', label: 'Investment Advisor', icon: TrendingUp },
    { id: 'goals', label: 'Financial Goals', icon: Target }
  ];

  return (
    <motion.header
      className="glass-card-strong sticky top-0 z-50 border-b border-white/10"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-3 sm:space-x-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-brand-accent via-brand-accent-light to-brand-accent-dark rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden group">
              <img
                src="/logo.svg"
                alt="FinanceFlow Pro Logo"
                className="w-6 h-6 sm:w-7 sm:h-7"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                FinanceFlow <span className="gradient-text">Pro</span>
              </h1>
              <p className="text-xs sm:text-sm text-neutral-300 font-medium">Wealth Management Platform</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold font-display text-white tracking-tight">
                FinanceFlow <span className="gradient-text">Pro</span>
              </h1>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1" role="navigation" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`relative px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 ${
                  activeTab === item.id
                    ? 'nav-item-active'
                    : 'nav-item'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                role="tab"
                aria-selected={activeTab === item.id}
                aria-controls={`panel-${item.id}`}
                id={`tab-${item.id}`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm sm:text-base">{item.label}</span>
                {activeTab === item.id && (
                  <motion.div
                    className="absolute inset-0 bg-brand-accent/5 rounded-lg border border-brand-accent/30"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <motion.div
              className="w-8 h-8 sm:w-10 sm:h-10 glass-card flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors group focus:outline-none focus:ring-2 focus:ring-brand-accent/50 rounded-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              title="Notifications"
              tabIndex={0}
              role="button"
              aria-label="View notifications"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  // Handle notifications click
                }
              }}
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-300 group-hover:text-white transition-colors" />
            </motion.div>
            <motion.div
              className="w-8 h-8 sm:w-10 sm:h-10 glass-card flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors group focus:outline-none focus:ring-2 focus:ring-brand-accent/50 rounded-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              title="Settings"
              tabIndex={0}
              role="button"
              aria-label="Open settings"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  // Handle settings click
                }
              }}
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-300 group-hover:text-white transition-colors" />
            </motion.div>
            <motion.div
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-brand-accent to-brand-accent-dark rounded-full flex items-center justify-center cursor-pointer shadow-md relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(37, 99, 235, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              title="Profile"
              tabIndex={0}
              role="button"
              aria-label="Open user profile menu"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  // Handle profile click
                }
              }}
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden w-8 h-8 glass-card flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-accent/50 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.nav
            className="md:hidden mt-4 pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile navigation menu"
          >
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 ${
                    activeTab === item.id
                      ? 'bg-brand-accent/10 text-brand-accent border border-brand-accent/30'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                  whileTap={{ scale: 0.98 }}
                  role="menuitem"
                  aria-current={activeTab === item.id ? 'page' : undefined}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};
