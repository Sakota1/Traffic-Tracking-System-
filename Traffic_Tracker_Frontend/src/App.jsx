import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import LiveTraffic from './pages/LiveTraffic';
import TrafficHistory from './pages/TrafficHistory';
import Settings from './pages/Settings';
import { 
  INITIAL_TRAFFIC_DATA, 
  INITIAL_NOTIFICATIONS, 
  calculateTrafficStats, 
  generateSimulatedTrafficUpdate 
} from './data/trafficData';

/**
 * App Root Component
 * Central state coordinator for navigation, corridor telemetry,
 * selection state, and simulation updates.
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [trafficData, setTrafficData] = useState(INITIAL_TRAFFIC_DATA);
  const [selectedRoad, setSelectedRoad] = useState(INITIAL_TRAFFIC_DATA[0]); // Default to first corridor for immediate context
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('16:47:35');

  // Compute aggregate statistics dynamically from state
  const trafficStats = calculateTrafficStats(trafficData);

  // Refresh simulated dataset with subtle randomized variation
  const handleRefresh = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      const updatedData = generateSimulatedTrafficUpdate(trafficData);
      setTrafficData(updatedData);

      // Keep selected road telemetry synchronized if one is active
      if (selectedRoad) {
        const refreshedSelected = updatedData.find((r) => r.id === selectedRoad.id);
        if (refreshedSelected) {
          setSelectedRoad(refreshedSelected);
        }
      }

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
      setLastUpdated(timeStr);
      setIsRefreshing(false);
    }, 400);
  };

  // Road selection handler
  const handleSelectRoad = (road) => {
    // If passed a road object or ID
    if (typeof road === 'string') {
      const matched = trafficData.find((r) => r.id === road);
      if (matched) setSelectedRoad(matched);
    } else {
      setSelectedRoad(road);
    }
  };

  const handleClearSelection = () => {
    setSelectedRoad(null);
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Determine current page titles
  const getPageHeaderInfo = () => {
    switch (currentPage) {
      case 'dashboard':
        return {
          title: 'TRAFF TRACKS',
          subtitle: 'Monitor Traffics Across Corridors'
        };
      case 'live':
        return {
          title: 'Live Traffic Monitor',
          subtitle: 'Real-Time Simulated GIS Corridors'
        };
      case 'history':
        return {
          title: 'Traffic History & Analytics',
          subtitle: 'Historical Trend Analysis & Database Storage (Planned for V2)'
        };
      case 'settings':
        return {
          title: 'Operations Settings',
          subtitle: 'System Configuration, Alerts & Display Parameters'
        };
      default:
        return {
          title: 'Traffic Tracker',
          subtitle: 'Operations Console'
        };
    }
  };

  const headerInfo = getPageHeaderInfo();

  return (
    <div className="app-layout">
      {/* 1. Collapsible / Persistent Navigation Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
      />

      {/* 2. Main Application Body */}
      <main className="app-main">
        {/* Global Application Header */}
        <Header
          pageTitle={headerInfo.title}
          pageSubtitle={headerInfo.subtitle}
          roads={trafficData}
          onSelectRoad={handleSelectRoad}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          lastUpdated={lastUpdated}
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
        />

        {/* View Router */}
        {currentPage === 'dashboard' && (
          <Dashboard
            roads={trafficData}
            stats={trafficStats}
            selectedRoad={selectedRoad}
            onSelectRoad={handleSelectRoad}
            onClearSelection={handleClearSelection}
          />
        )}

        {currentPage === 'live' && (
          <LiveTraffic
            roads={trafficData}
            selectedRoad={selectedRoad}
            onSelectRoad={handleSelectRoad}
            onClearSelection={handleClearSelection}
          />
        )}

        {currentPage === 'history' && <TrafficHistory />}

        {currentPage === 'settings' && <Settings />}
      </main>
    </div>
  );
}
