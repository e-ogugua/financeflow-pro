import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, MessageSquare, ChevronRight, Star, TrendingUp, TrendingDown, Clock, AlertTriangle, CheckCircle, Target } from 'lucide-react';

interface AdvisorProps {
  recommendations: Array<{
    type: string;
    asset: string;
    confidence: number;
    reason: string;
    impact: string;
    riskLevel?: string;
    timeHorizon?: string;
  }>;
}

export const Advisor: React.FC<AdvisorProps> = ({ recommendations }) => {
  const [message, setMessage] = useState('');

  const conversations = [
    {
      type: 'assistant',
      message: "Hello! I'm your dedicated financial advisor. I analyze market trends, your portfolio, and economic indicators to provide personalized investment recommendations. How can I help you achieve your financial goals today?"
    },
    {
      type: 'user',
      message: "Should I invest more in technology stocks given the recent market volatility?"
    },
    {
      type: 'assistant',
      message: "Based on your moderate risk profile and current 18% technology allocation, I'd recommend maintaining your current exposure. While tech fundamentals remain strong, recent volatility suggests waiting for better entry points. Consider diversifying into quality dividend stocks for stability."
    }
  ];

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'Buy': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'Sell': return <TrendingDown className="w-4 h-4 text-red-400" />;
      case 'Hold': return <Target className="w-4 h-4 text-yellow-400" />;
      case 'Rebalance': return <AlertTriangle className="w-4 h-4 text-orange-400" />;
      default: return <CheckCircle className="w-4 h-4 text-blue-400" />;
    }
  };

  const getRecommendationColor = (type: string) => {
    switch (type) {
      case 'Buy': return 'bg-green-600 text-white';
      case 'Sell': return 'bg-red-600 text-white';
      case 'Hold': return 'bg-yellow-600 text-white';
      case 'Rebalance': return 'bg-orange-600 text-white';
      default: return 'bg-blue-600 text-white';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 80) return 'text-blue-400';
    if (confidence >= 70) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Investment Recommendations */}
        <div className="lg:col-span-2">
          <motion.div
            className="glass-card p-6"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <Brain className="w-6 h-6 text-brand-accent" />
              <h2 className="text-xl font-bold text-white">Investment Recommendations</h2>
            </div>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getRecommendationColor(rec.type)}`}>
                        {getRecommendationIcon(rec.type)}
                        <span className="ml-1">{rec.type}</span>
                      </span>
                      <h3 className="font-medium text-white">{rec.asset}</h3>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className={`w-4 h-4 ${getConfidenceColor(rec.confidence)}`} />
                      <span className={`text-sm font-medium ${getConfidenceColor(rec.confidence)}`}>
                        {rec.confidence}%
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-neutral-300 mb-3">{rec.reason}</p>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-green-400 font-medium">{rec.impact}</p>
                    <div className="flex items-center space-x-3 text-xs text-neutral-400">
                      {rec.riskLevel && (
                        <span className="flex items-center space-x-1">
                          <span>Risk:</span>
                          <span className={`font-medium ${
                            rec.riskLevel === 'Low' ? 'text-green-400' :
                            rec.riskLevel === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {rec.riskLevel}
                          </span>
                        </span>
                      )}
                      {rec.timeHorizon && (
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{rec.timeHorizon}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Chat Interface */}
        <motion.div
          className="glass-card p-6"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold text-white">Financial Consultation</h3>
          </div>
          <div className="space-y-4 mb-4 h-64 overflow-y-auto">
            {conversations.map((conv, index) => (
              <motion.div
                key={index}
                className={`p-3 rounded-lg ${
                  conv.type === 'user'
                    ? 'bg-brand-accent/20 ml-8'
                    : 'bg-white/5'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.2 }}
              >
                <p className="text-sm text-neutral-300">{conv.message}</p>
              </motion.div>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about your investments..."
              className="flex-1 bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-accent"
            />
            <motion.button
              className="bg-brand-accent hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
