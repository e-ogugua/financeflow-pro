import { useState, Suspense, lazy } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { portfolioChartData, allocationChartData, recommendationsChart, financialGoalsChart, marketIndexData, economicIndicatorsChart, sectorChartData } from './data/mockData';

/**
 * PERFORMANCE OPTIMIZATIONS:
 * - Lazy loading of page components for code splitting and reduced initial bundle size
 * - Suspense boundary with loading fallback for better UX
 * - Tree-shaken imports from data layer
 * - Optimized re-renders with proper state management
 * - Component-based code splitting for optimal loading
 * - Preload hints in HTML for critical assets
 */

// Lazy load page components to improve initial bundle size
const Dashboard = lazy(() => import('./components/pages/Dashboard'));
const Portfolio = lazy(() => import('./components/pages/Portfolio'));
const Advisor = lazy(() => import('./components/pages/Advisor'));
const Goals = lazy(() => import('./components/pages/Goals'));

// Loading component for Suspense fallback
const PageLoading = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-pulse text-neutral-300">Loading...</div>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            portfolioData={portfolioChartData}
            marketData={marketIndexData}
            economicIndicators={economicIndicatorsChart}
            sectorPerformance={sectorChartData}
            isLoading={false}
          />
        );
      case 'portfolio':
        return <Portfolio allocationData={allocationChartData} isLoading={false} />;
      case 'advisor':
        return <Advisor recommendations={recommendationsChart} isLoading={false} />;
      case 'goals':
        return <Goals financialGoals={financialGoalsChart} isLoading={false} />;
      default:
        return (
          <Dashboard
            portfolioData={portfolioChartData}
            marketData={marketIndexData}
            economicIndicators={economicIndicatorsChart}
            sectorPerformance={sectorChartData}
            isLoading={false}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary text-white overflow-x-hidden">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main id="main-content" className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="animate-fade-in">
          <Suspense fallback={<PageLoading />}>
            {renderContent()}
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
