import { useRef, useEffect } from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

/**
 * NotificationPanel Component
 * Displays actionable simulated traffic alerts and operational notices.
 */
export default function NotificationPanel({
  notifications,
  isOpen,
  onClose,
  onSelectRoad,
  onMarkAllRead
}) {
  const panelRef = useRef(null);

  // Close when clicking outside panel
  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'critical':
        return <AlertCircle size={15} />;
      case 'warning':
        return <AlertTriangle size={15} />;
      case 'info':
      default:
        return <Info size={15} />;
    }
  };

  return (
    <div className="notification-popover" ref={panelRef} role="dialog" aria-label="Notifications">
      <div className="notification-header">
        <span className="notification-header-title">Traffic Alerts & Notices</span>
        <div className="notification-header-actions">
          <button
            type="button"
            className="notification-action-link"
            onClick={onMarkAllRead}
          >
            Mark all read
          </button>
        </div>
      </div>

      <div className="notification-list">
        {notifications && notifications.length > 0 ? (
          notifications.map((item) => (
            <div
              key={item.id}
              className={`notification-item ${item.unread ? 'unread' : ''}`}
              onClick={() => {
                if (item.roadId && onSelectRoad) {
                  onSelectRoad(item.roadId);
                }
                onClose();
              }}
            >
              <div className={`notification-item-icon ${item.type}`}>
                {getIcon(item.type)}
              </div>
              <div className="notification-content">
                <span className="notification-item-title">{item.title}</span>
                <p className="notification-item-message">{item.message}</p>
                <span className="notification-item-time">{item.time}</span>
              </div>
              {item.unread && <span className="notification-unread-dot" />}
            </div>
          ))
        ) : (
          <div className="notification-empty">
            No active alerts at this moment.
          </div>
        )}
      </div>
    </div>
  );
}
