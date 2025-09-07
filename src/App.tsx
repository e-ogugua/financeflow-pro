import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Shield, 
  MessageSquare,
  Settings,
  Bell,
  User,
  ChevronRight,
  Star,
  CheckCircle,
  AlertTriangle,
  Lightbulb
} from 'lucide-react'
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart as RechartsPieChart, Pie, Cell } from 'recharts'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('moderate')

  // Mock data
  const portfolioData = [
    { time: 'Jan', value: 10000, benchmark: 10000 },
    { time: 'Feb', value: 10500, benchmark: 10200 },
    { time: 'Mar', value: 11200, benchmark: 10800 },
    { time: 'Apr', value: 10800, benchmark: 10600 },
    { time: 'May', value: 12100, benchmark: 11200 },
    { time: 'Jun', value: 12800, benchmark: 11800 }
  ]

  const allocationData = [
    { name: 'Stocks', value: 60, color: '#2563EB' },
    { name: 'Bonds', value: 25, color: '#10B981' },
    { name: 'Real Estate', value: 10, color: '#8B5CF6' },
    { name: 'Commodities', value: 5, color: '#F59E0B' }
  ]

  const aiRecommendations = [
    {
      type: 'Buy',
      asset: 'VTSAX (Total Stock Market)',
      confidence: 92,
      reason: 'Strong market fundamentals and low expense ratio',
      impact: '+2.3% expected annual return'
    },
    {
      type: 'Rebalance',
      asset: 'Bond Allocation',
      confidence: 87,
      reason: 'Current allocation exceeds target by 5%',
      impact: 'Reduce risk by 8%'
    },
    {
      type: 'Hold',
      asset: 'Tech Sector ETF',
      confidence: 78,
      reason: 'Recent volatility suggests waiting for better entry',
      impact: 'Avoid potential 12% loss'
    }
  ]

  const financialGoals = [
    { name: 'Emergency Fund', current: 15000, target: 20000, progress: 75, timeframe: '6 months' },
    { name: 'Retirement', current: 125000, target: 1000000, progress: 12.5, timeframe: '25 years' },
    { name: 'House Down Payment', current: 35000, target: 80000, progress: 43.75, timeframe: '3 years' },
    { name: 'Vacation Fund', current: 2500, target: 5000, progress: 50, timeframe: '1 year' }
  ]

  const riskProfiles = [
    { level: 'conservative', label: 'Conservative', return: '4-6%', risk: 'Low', description: 'Capital preservation focused' },
    { level: 'moderate', label: 'Moderate', return: '6-8%', risk: 'Medium', description: 'Balanced growth and stability' },
    { level: 'aggressive', label: 'Aggressive', return: '8-12%', risk: 'High', description: 'Maximum growth potential' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <motion.header 
        className="bg-black/20 backdrop-blur-sm border-b border-white/10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-ai-blue to-ai-purple rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-serif">AI Finance Advisor</h1>
                <p className="text-sm text-ai-blue">Intelligent Financial Planning</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`hover:text-ai-blue transition-colors ${activeTab === 'dashboard' ? 'text-ai-blue' : ''}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setActiveTab('portfolio')}
                className={`hover:text-ai-blue transition-colors ${activeTab === 'portfolio' ? 'text-ai-blue' : ''}`}
              >
                Portfolio
              </button>
              <button 
                onClick={() => setActiveTab('advisor')}
                className={`hover:text-ai-blue transition-colors ${activeTab === 'advisor' ? 'text-ai-blue' : ''}`}
              >
                AI Advisor
              </button>
              <button 
                onClick={() => setActiveTab('goals')}
                className={`hover:text-ai-blue transition-colors ${activeTab === 'goals' ? 'text-ai-blue' : ''}`}
              >
                Goals
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              <Bell className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
              <Settings className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
              <div className="w-8 h-8 bg-ai-blue rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Portfolio Value</p>
                    <p className="text-2xl font-bold text-ai-green">$128,450</p>
                    <p className="text-sm text-ai-green">+12.8% (YTD)</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-ai-green" />
                </div>
              </motion.div>

              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">AI Score</p>
                    <p className="text-2xl font-bold text-ai-blue">8.7/10</p>
                    <p className="text-sm text-ai-blue">Excellent</p>
                  </div>
                  <Brain className="w-8 h-8 text-ai-blue" />
                </div>
              </motion.div>

              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Monthly Savings</p>
                    <p className="text-2xl font-bold">$2,850</p>
                    <p className="text-sm text-ai-green">+5.2% vs target</p>
                  </div>
                  <Target className="w-8 h-8 text-ai-purple" />
                </div>
              </motion.div>

              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Risk Level</p>
                    <p className="text-2xl font-bold">Moderate</p>
                    <p className="text-sm text-ai-orange">6-8% expected</p>
                  </div>
                  <Shield className="w-8 h-8 text-ai-orange" />
                </div>
              </motion.div>
            </div>

            {/* Portfolio Performance Chart */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Portfolio Performance</h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-ai-blue text-white rounded text-sm">6M</button>
                  <button className="px-3 py-1 bg-white/10 rounded text-sm hover:bg-white/20">1Y</button>
                  <button className="px-3 py-1 bg-white/10 rounded text-sm hover:bg-white/20">5Y</button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={portfolioData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area type="monotone" dataKey="value" stroke="#2563EB" fill="rgba(37,99,235,0.1)" />
                  <Line type="monotone" dataKey="benchmark" stroke="#6B7280" strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* AI Insights */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="w-5 h-5 text-ai-orange" />
                <h3 className="text-lg font-bold">AI Insights</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-ai-green" />
                    <span className="text-sm font-medium">Portfolio Health</span>
                  </div>
                  <p className="text-xs text-gray-300">Your diversification is excellent with low correlation risk.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-ai-orange" />
                    <span className="text-sm font-medium">Rebalancing Due</span>
                  </div>
                  <p className="text-xs text-gray-300">Consider rebalancing your bond allocation next week.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-ai-blue" />
                    <span className="text-sm font-medium">Market Opportunity</span>
                  </div>
                  <p className="text-xs text-gray-300">Tech sector showing strong fundamentals for Q4.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'portfolio' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Asset Allocation */}
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                whileHover={{ scale: 1.01 }}
              >
                <h2 className="text-xl font-bold mb-6">Asset Allocation</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPieChart>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {allocationData.map((item) => (
                    <div key={item.name} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm">{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Risk Profile */}
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                whileHover={{ scale: 1.01 }}
              >
                <h2 className="text-xl font-bold mb-6">Risk Profile</h2>
                <div className="space-y-4">
                  {riskProfiles.map((profile) => (
                    <motion.div
                      key={profile.level}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedRiskLevel === profile.level 
                          ? 'border-ai-blue bg-ai-blue/10' 
                          : 'border-white/20 bg-white/5 hover:bg-white/10'
                      }`}
                      onClick={() => setSelectedRiskLevel(profile.level)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{profile.label}</h3>
                          <p className="text-sm text-gray-300">{profile.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-ai-green">{profile.return}</p>
                          <p className="text-sm text-gray-400">{profile.risk} Risk</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {activeTab === 'advisor' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* AI Recommendations */}
              <div className="lg:col-span-2">
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center space-x-2 mb-6">
                    <Brain className="w-6 h-6 text-ai-blue" />
                    <h2 className="text-xl font-bold">AI Recommendations</h2>
                  </div>
                  <div className="space-y-4">
                    {aiRecommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/5 rounded-lg p-4 border border-white/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              rec.type === 'Buy' ? 'bg-ai-green text-white' :
                              rec.type === 'Sell' ? 'bg-ai-red text-white' :
                              rec.type === 'Hold' ? 'bg-ai-orange text-white' :
                              'bg-ai-blue text-white'
                            }`}>
                              {rec.type}
                            </span>
                            <h3 className="font-medium">{rec.asset}</h3>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-ai-orange" />
                            <span className="text-sm font-medium">{rec.confidence}%</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">{rec.reason}</p>
                        <p className="text-sm text-ai-green font-medium">{rec.impact}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* AI Chat Interface */}
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-ai-purple" />
                  <h3 className="text-lg font-bold">Ask AI Advisor</h3>
                </div>
                <div className="space-y-4 mb-4 h-64 overflow-y-auto">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm text-gray-300">Hello! I'm your AI financial advisor. How can I help you today?</p>
                  </div>
                  <div className="bg-ai-blue/20 rounded-lg p-3 ml-8">
                    <p className="text-sm">Should I invest more in tech stocks?</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm text-gray-300">Based on your current allocation and risk profile, I'd recommend maintaining your current tech exposure at 15%. The sector is showing volatility, and diversification is key for your moderate risk strategy.</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    placeholder="Ask about your finances..."
                    className="flex-1 bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-ai-blue"
                  />
                  <button className="bg-ai-blue hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {activeTab === 'goals' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-6">Financial Goals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {financialGoals.map((goal, index) => (
                <motion.div
                  key={goal.name}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">{goal.name}</h3>
                    <span className="text-sm text-gray-400">{goal.timeframe}</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>${goal.current.toLocaleString()}</span>
                      <span>${goal.target.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-ai-blue to-ai-green h-2 rounded-full transition-all duration-500"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">{goal.progress.toFixed(1)}% complete</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">
                      ${(goal.target - goal.current).toLocaleString()} remaining
                    </span>
                    <button className="text-ai-blue hover:text-blue-400 text-sm font-medium">
                      Adjust Goal
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <motion.footer 
        className="bg-black/20 backdrop-blur-sm border-t border-white/10 mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="w-6 h-6 text-ai-blue" />
                <span className="font-bold">AI Finance Advisor</span>
              </div>
              <p className="text-gray-300 text-sm">
                Intelligent financial planning platform powered by advanced AI algorithms.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Services</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Portfolio Analysis</li>
                <li>• Investment Recommendations</li>
                <li>• Risk Assessment</li>
                <li>• Goal Planning</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">AI Features</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Machine Learning Models</li>
                <li>• Predictive Analytics</li>
                <li>• Real-time Optimization</li>
                <li>• Behavioral Analysis</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Security</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Bank-level Encryption</li>
                <li>• Data Privacy Protection</li>
                <li>• Regulatory Compliance</li>
                <li>• Secure API Integration</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-300 text-sm">
            <p>&copy; 2025 AI Finance Advisor by Emmanuel Chukwuka Ogugua. Part of EmmanuelOS Digital Empire.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default App
