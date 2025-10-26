import React from 'react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <motion.footer
      className="glass-card-strong border-t border-white/10 mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/logo.svg"
                alt="FinanceFlow Pro"
                className="w-8 h-8"
              />
              <span className="font-bold text-white text-lg">FinanceFlow Pro</span>
            </div>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Professional financial planning platform for scalable portfolio intelligence and wealth management optimization.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li className="hover:text-white transition-colors cursor-pointer">Portfolio Analysis & Optimization</li>
              <li className="hover:text-white transition-colors cursor-pointer">Investment Strategy Development</li>
              <li className="hover:text-white transition-colors cursor-pointer">Risk Assessment & Management</li>
              <li className="hover:text-white transition-colors cursor-pointer">Financial Goal Planning</li>
              <li className="hover:text-white transition-colors cursor-pointer">Market Research & Insights</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Features</h3>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li className="hover:text-white transition-colors cursor-pointer">Real-time Market Data</li>
              <li className="hover:text-white transition-colors cursor-pointer">Advanced Analytics Dashboard</li>
              <li className="hover:text-white transition-colors cursor-pointer">Automated Portfolio Rebalancing</li>
              <li className="hover:text-white transition-colors cursor-pointer">Goal Progress Tracking</li>
              <li className="hover:text-white transition-colors cursor-pointer">Professional Reporting</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Security & Trust</h3>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li className="hover:text-white transition-colors cursor-pointer">Bank-grade Security</li>
              <li className="hover:text-white transition-colors cursor-pointer">Data Privacy Protection</li>
              <li className="hover:text-white transition-colors cursor-pointer">Regulatory Compliance</li>
              <li className="hover:text-white transition-colors cursor-pointer">Secure API Integration</li>
              <li className="hover:text-white transition-colors cursor-pointer">Transparent Operations</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <p className="text-neutral-300 text-sm mb-4 sm:mb-0">
              &copy; 2025 FinanceFlow Pro by EmmanuelOS / CEO – Chukwuka Emmanuel Ogugua.
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> • </span>
              Scalable Financial Technology Solutions for Portfolio Intelligence.
            </p>
            <div className="flex items-center space-x-6 text-sm text-neutral-400">
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
              <span className="hover:text-white transition-colors cursor-pointer">Support</span>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
