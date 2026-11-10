import { 
  LayoutDashboard, 
  Radio, 
  History, 
  Settings, 
  Activity
} from 'lucide-react';

/**
 * Sidebar Component
 * Provides primary application navigation, active route indication,
 * and system telemetry status.
 */
export default function Sidebar({ currentPage, onNavigate }) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Overview',
      icon: LayoutDashboard,
      badge: 'Live'
    },
    {
      id: 'live',
      label: 'Live Traffic',
      icon: Radio,
      badge: null
    },
    {
      id: 'history',
      label: 'Traffic History',
      icon: History,
      badge: 'V2'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside className="sidebar" aria-label="Main Navigation">
      {/* Brand & Logo Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo-icon">
          <Activity size={22} strokeWidth={2.4} />
        </div>
        <div className="sidebar-brand-text">
          <span className="sidebar-brand-title">TrafficTracker</span>
          <span className="sidebar-brand-version">OPERATIONS V1.0</span>
        </div>
      </div>

      {/* Main Navigation Section */}
      <nav className="sidebar-nav">
        <div className="sidebar-nav-section-title">Navigation</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="sidebar-nav-item-badge">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer System Status Box */}
      <div className="sidebar-footer">
        <div className="sidebar-status-box">
          <div className="sidebar-status-title">
            <span className="sidebar-status-dot"></span>
            <span>SIMULATION ACTIVE</span>
          </div>
          <p className="sidebar-status-text">
            Lucknow Metropolitan Telemetry Feed (Simulated V1)
          </p>
        </div>
      </div>
    </aside>
  );
}
