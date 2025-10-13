import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <motion.footer
      className="glass-card border-t border-white/10 mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="w-6 h-6 text-brand-accent" />
              <span className="font-bold text-white">FinanceFlow Pro</span>
            </div>
            <p className="text-neutral-300 text-sm">
              Professional financial planning platform designed for modern wealth management and investment strategy optimization.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-white">Services</h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>• Portfolio Analysis & Optimization</li>
              <li>• Investment Strategy Development</li>
              <li>• Risk Assessment & Management</li>
              <li>• Financial Goal Planning</li>
              <li>• Market Research & Insights</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-white">Features</h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>• Real-time Market Data</li>
              <li>• Advanced Analytics Dashboard</li>
              <li>• Automated Portfolio Rebalancing</li>
              <li>• Goal Progress Tracking</li>
              <li>• Professional Reporting</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-white">Security & Trust</h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>• Bank-grade Security</li>
              <li>• Data Privacy Protection</li>
              <li>• Regulatory Compliance</li>
              <li>• Secure API Integration</li>
              <li>• Transparent Operations</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-neutral-300 text-sm">
          <p>&copy; 2025 FinanceFlow Pro by Emmanuel Chukwuka Ogugua. Professional Financial Technology Solutions for Modern Wealth Management.</p>
        </div>
      </div>
    </motion.footer>
  );
};
