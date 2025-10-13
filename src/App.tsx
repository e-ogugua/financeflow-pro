import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Dashboard } from './components/pages/Dashboard';
import { Portfolio } from './components/pages/Portfolio';
import { Advisor } from './components/pages/Advisor';
import { Goals } from './components/pages/Goals';
import { portfolioChartData, allocationChartData, recommendationsChart, financialGoalsChart, marketIndexData, economicIndicatorsChart, sectorChartData } from './data/mockData';

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
          />
        );
      case 'portfolio':
        return <Portfolio allocationData={allocationChartData} />;
      case 'advisor':
        return <Advisor recommendations={recommendationsChart} />;
      case 'goals':
        return <Goals financialGoals={financialGoalsChart} />;
      default:
        return (
          <Dashboard
            portfolioData={portfolioChartData}
            marketData={marketIndexData}
            economicIndicators={economicIndicatorsChart}
            sectorPerformance={sectorChartData}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary text-white overflow-x-hidden">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
