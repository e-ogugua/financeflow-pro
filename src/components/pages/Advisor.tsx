import React, { useState, useMemo } from 'react';
import { Brain, MessageSquare, TrendingUp, TrendingDown, Clock, CheckCircle, Target, Send, Activity } from 'lucide-react';
import { CardSkeleton, ListSkeleton } from '../ui/Skeleton';

/**
 * PERFORMANCE OPTIMIZATIONS:
 * - useMemo for conversation processing and calculations
 * - Responsive design with unified breakpoint system
 * - Accessibility: ARIA labels, keyboard navigation, screen reader support
 * - Simplified animations: limited opacity and transform chains
 * - Optimized state management for chat functionality
 */

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
  isLoading?: boolean;
}

interface Conversation {
  type: 'user' | 'assistant';
  message: string;
  timestamp?: string;
}

export const Advisor: React.FC<AdvisorProps> = ({ recommendations, isLoading = false }) => {
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      type: 'assistant',
      message: "Hello! I'm your dedicated financial advisor. I analyze market trends, your portfolio, and economic indicators to provide personalized investment recommendations. How can I help you achieve your financial goals today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  // Memoize recommendations processing
  const processedRecommendations = useMemo(() => ({
    buy: recommendations.filter(r => r.type.toLowerCase() === 'buy'),
    hold: recommendations.filter(r => r.type.toLowerCase() === 'hold'),
    sell: recommendations.filter(r => r.type.toLowerCase() === 'sell')
  }), [recommendations]);

  const getRecommendationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'buy': return <TrendingUp className="w-4 h-4 text-brand-success" />;
      case 'sell': return <TrendingDown className="w-4 h-4 text-brand-error" />;
      case 'hold': return <Target className="w-4 h-4 text-yellow-400" />;
      default: return <CheckCircle className="w-4 h-4 text-brand-accent" />;
    }
  };

  const getRecommendationColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'buy': return 'bg-brand-success/20 text-brand-success border-brand-success/30';
      case 'sell': return 'bg-brand-error/20 text-brand-error border-brand-error/30';
      case 'hold': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-brand-accent/20 text-brand-accent border-brand-accent/30';
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newConversation: Conversation = {
      type: 'user',
      message,
      timestamp: new Date().toLocaleTimeString()
    };

    setConversations(prev => [...prev, newConversation]);
    setMessage('');

    // Simulate AI response (in real app, this would call an API)
    setTimeout(() => {
      const aiResponse: Conversation = {
        type: 'assistant',
        message: "Thank you for your question. I'm analyzing your portfolio and market conditions to provide the best recommendation. Based on current trends, I suggest diversifying into quality dividend stocks for stability while maintaining growth exposure.",
        timestamp: new Date().toLocaleTimeString()
      };
      setConversations(prev => [...prev, aiResponse]);
    }, 1500);
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

        {/* Chat and Recommendations Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <CardSkeleton className="p-6" />
          <ListSkeleton items={4} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8" role="main" aria-label="Financial Advisor">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4" aria-labelledby="advisor-heading">
        <div>
          <h1 id="advisor-heading" className="text-xl sm:text-2xl lg:text-3xl font-bold font-display mb-2">
            Financial <span className="gradient-text">Advisor</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-300">
            AI-powered investment recommendations and market insights
          </p>
        </div>
        <div className="flex-shrink-0">
          <div className="flex items-center space-x-2 glass-card px-3 sm:px-4 py-2 rounded-lg">
            <Brain className="w-4 h-4 text-brand-accent" aria-hidden="true" />
            <span className="text-sm sm:text-base text-white font-medium">AI Assistant Online</span>
          </div>
        </div>
      </section>

      {/* Chat and Recommendations */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8" aria-labelledby="chat-recommendations-heading">
        <h2 id="chat-recommendations-heading" className="sr-only">Chat Interface and Investment Recommendations</h2>

        {/* AI Chat Interface */}
        <div className="glass-card-strong p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-white">AI Assistant</h3>
            <div className="flex items-center space-x-2 text-xs sm:text-sm">
              <div className="w-2 h-2 bg-brand-success rounded-full animate-pulse"></div>
              <span className="text-neutral-300">Active</span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto" role="log" aria-label="Chat conversation">
            {conversations.map((conv, index) => (
              <div
                key={index}
                className={`flex ${conv.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 sm:space-x-3 max-w-[85%] ${
                  conv.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    conv.type === 'user' ? 'bg-brand-accent' : 'bg-neutral-700'
                  }`}>
                    {conv.type === 'user' ? (
                      <MessageSquare className="w-4 h-4 text-white" aria-hidden="true" />
                    ) : (
                      <Brain className="w-4 h-4 text-brand-accent" aria-hidden="true" />
                    )}
                  </div>
                  <div className={`glass-card p-3 rounded-lg ${
                    conv.type === 'user'
                      ? 'bg-brand-accent/20 border border-brand-accent/30'
                      : 'bg-neutral-800/50'
                  }`}>
                    <p className="text-sm sm:text-base text-white leading-relaxed">{conv.message}</p>
                    {conv.timestamp && (
                      <p className="text-xs text-neutral-400 mt-2">{conv.timestamp}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="flex gap-2 sm:gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me about your portfolio, market trends, or investment strategies..."
              className="flex-1 glass-card px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-transparent"
              aria-label="Type your message to the financial advisor"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="btn-primary p-2 sm:p-3 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </button>
          </form>
        </div>

        {/* Investment Recommendations */}
        <div className="glass-card-strong p-4 sm:p-6 lg:p-8">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Investment Recommendations</h3>

          <div className="space-y-4 sm:space-y-6" role="list" aria-label="Investment recommendations list">
            {/* Buy Recommendations */}
            {processedRecommendations.buy.length > 0 && (
              <div>
                <h4 className="text-sm sm:text-base font-medium text-brand-success mb-3 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" aria-hidden="true" />
                  <span>Buy Recommendations</span>
                </h4>
                <div className="space-y-3">
                  {processedRecommendations.buy.map((rec, index) => (
                    <div
                      key={index}
                      className="glass-card p-3 sm:p-4 rounded-lg hover:bg-white/5 transition-colors"
                      role="listitem"
                      tabIndex={0}
                      aria-label={`Buy recommendation for ${rec.asset}: ${rec.reason}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getRecommendationIcon(rec.type)}
                          <span className="font-semibold text-white text-sm sm:text-base">{rec.asset}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRecommendationColor(rec.type)}`}>
                          {rec.confidence}% confidence
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-300 mb-2">{rec.reason}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-400">Impact: {rec.impact}</span>
                        {rec.timeHorizon && <span className="text-neutral-400">Horizon: {rec.timeHorizon}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hold Recommendations */}
            {processedRecommendations.hold.length > 0 && (
              <div>
                <h4 className="text-sm sm:text-base font-medium text-yellow-400 mb-3 flex items-center space-x-2">
                  <Target className="w-4 h-4" aria-hidden="true" />
                  <span>Hold Recommendations</span>
                </h4>
                <div className="space-y-3">
                  {processedRecommendations.hold.map((rec, index) => (
                    <div
                      key={index}
                      className="glass-card p-3 sm:p-4 rounded-lg hover:bg-white/5 transition-colors"
                      role="listitem"
                      tabIndex={0}
                      aria-label={`Hold recommendation for ${rec.asset}: ${rec.reason}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getRecommendationIcon(rec.type)}
                          <span className="font-semibold text-white text-sm sm:text-base">{rec.asset}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRecommendationColor(rec.type)}`}>
                          {rec.confidence}% confidence
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-300 mb-2">{rec.reason}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-400">Impact: {rec.impact}</span>
                        {rec.timeHorizon && <span className="text-neutral-400">Horizon: {rec.timeHorizon}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sell Recommendations */}
            {processedRecommendations.sell.length > 0 && (
              <div>
                <h4 className="text-sm sm:text-base font-medium text-brand-error mb-3 flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4" aria-hidden="true" />
                  <span>Sell Recommendations</span>
                </h4>
                <div className="space-y-3">
                  {processedRecommendations.sell.map((rec, index) => (
                    <div
                      key={index}
                      className="glass-card p-3 sm:p-4 rounded-lg hover:bg-white/5 transition-colors"
                      role="listitem"
                      tabIndex={0}
                      aria-label={`Sell recommendation for ${rec.asset}: ${rec.reason}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getRecommendationIcon(rec.type)}
                          <span className="font-semibold text-white text-sm sm:text-base">{rec.asset}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRecommendationColor(rec.type)}`}>
                          {rec.confidence}% confidence
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-300 mb-2">{rec.reason}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-400">Impact: {rec.impact}</span>
                        {rec.timeHorizon && <span className="text-neutral-400">Horizon: {rec.timeHorizon}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Market Insights */}
      <section aria-labelledby="insights-heading">
        <h2 id="insights-heading" className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
          Market Insights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="glass-card p-4 sm:p-6 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Activity className="w-5 h-5 text-brand-accent" aria-hidden="true" />
              <h4 className="font-semibold text-white text-sm sm:text-base">Market Sentiment</h4>
            </div>
            <p className="text-2xl font-bold text-brand-success mb-1">Positive</p>
            <p className="text-xs sm:text-sm text-neutral-300">Based on current economic indicators</p>
          </div>

          <div className="glass-card p-4 sm:p-6 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-5 h-5 text-brand-accent" aria-hidden="true" />
              <h4 className="font-semibold text-white text-sm sm:text-base">Next Update</h4>
            </div>
            <p className="text-2xl font-bold text-white mb-1">2 hours</p>
            <p className="text-xs sm:text-sm text-neutral-300">Real-time analysis refresh</p>
          </div>

          <div className="glass-card p-4 sm:p-6 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Target className="w-5 h-5 text-brand-accent" aria-hidden="true" />
              <h4 className="font-semibold text-white text-sm sm:text-base">Accuracy Rate</h4>
            </div>
            <p className="text-2xl font-bold text-brand-success mb-1">94%</p>
            <p className="text-xs sm:text-sm text-neutral-300">Historical recommendation accuracy</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Advisor;
