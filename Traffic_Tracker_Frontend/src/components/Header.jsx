import { useState } from 'react';
import { RefreshCw, Bell } from 'lucide-react';
import SearchBar from './SearchBar';
import NotificationPanel from './NotificationPanel';

/**
 * Header Component
 * Provides global application header with page title, road search,
 * simulation refresh control, and notification management.
 */
export default function Header({
  pageTitle,
  pageSubtitle,
  roads,
  onSelectRoad,
  onRefresh,
  isRefreshing,
  lastUpdated,
  notifications,
  onMarkAllRead
}) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Count unread notifications
  const unreadCount = notifications ? notifications.filter((n) => n.unread).length : 0;

  return (
    <header className="app-header">
      {/* Page Title & Context */}
      <div className="header-left">
        <h1 className="header-title">{pageTitle}</h1>
        <div className="header-subtitle">
          <span>{pageSubtitle}</span>
          <span className="sim-badge" title="Demonstration dataset - not connected to live DOT API">
            SIMULATED FEED
          </span>
        </div>
      </div>

      {/* Header Controls: Search, Refresh, Notifications, Profile */}
      <div className="header-right">
        {/* Road Search */}
        <SearchBar roads={roads} onSelectRoad={onSelectRoad} />

        {/* Refresh Simulated Telemetry */}
        <button
          type="button"
          className={`refresh-button ${isRefreshing ? 'spinning' : ''}`}
          onClick={onRefresh}
          disabled={isRefreshing}
          title="Regenerate simulated traffic telemetry"
        >
          <RefreshCw size={14} />
          <span>{isRefreshing ? 'Updating...' : `Refresh (${lastUpdated})`}</span>
        </button>

        {/* Notification Bell & Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="header-icon-button"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            aria-label="View notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="notification-count-badge">{unreadCount}</span>
            )}
          </button>

          <NotificationPanel
            notifications={notifications}
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
            onSelectRoad={(roadId) => {
              const matchedRoad = roads.find((r) => r.id === roadId);
              if (matchedRoad) onSelectRoad(matchedRoad);
            }}
            onMarkAllRead={onMarkAllRead}
          />
        </div>

        {/* User Profile Placeholder */}
        <div className="header-profile-card">
          <div className="header-avatar" title="Operations User">
            OP
          </div>
          <div className="header-profile-info">
            <span className="header-profile-name">Traffic Control Room</span>
            <span className="header-profile-role">Lucknow TMC</span>
          </div>
        </div>
      </div>
    </header>
  );
}
