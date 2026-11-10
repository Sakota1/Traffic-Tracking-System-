import { 
  X, 
  Gauge, 
  Car, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Compass,
  ArrowRight
} from 'lucide-react';

/**
 * TrafficDetails Component
 * Displays comprehensive telemetry, speed ratios, and incident diagnostics
 * for the currently selected road corridor.
 */
export default function TrafficDetails({ selectedRoad, onClose, onCenterOnMap }) {
  if (!selectedRoad) {
    return (
      <div className="traffic-details-card">
        <div className="details-empty-state">
          <div className="details-empty-icon">
            <Compass size={24} />
          </div>
          <div className="details-empty-title">No Road Selected</div>
          <p className="details-empty-text">
            Click any road segment or pin on the map, or use the search bar above to inspect corridor telemetry.
          </p>
        </div>
      </div>
    );
  }

  const speedPercentage = Math.min(
    100, 
    Math.round((selectedRoad.averageSpeed / selectedRoad.speedLimit) * 100)
  );

  return (
    <div className="traffic-details-card" aria-label="Road Details Panel">
      {/* Header */}
      <div className="details-header">
        <div className="details-title-group">
          <div className="details-road-name">
            <span>{selectedRoad.name}</span>
            <span className="details-road-code">{selectedRoad.code}</span>
          </div>
          <span className="details-road-zone">
            <MapPin size={12} style={{ display: 'inline', marginRight: 4 }} />
            {selectedRoad.zone}
          </span>
        </div>
        <button
          type="button"
          className="details-close-btn"
          onClick={onClose}
          title="Deselect road"
        >
          <X size={18} />
        </button>
      </div>

      {/* Body Details */}
      <div className="details-body">
        {/* Congestion Level Bar */}
        <div className="details-congestion-section">
          <div className="details-congestion-label-row">
            <span>Congestion Capacity</span>
            <span className={`status-pill ${selectedRoad.status}`}>
              <span className="status-pill-dot"></span>
              {selectedRoad.congestionLevel}% • {selectedRoad.congestionLabel}
            </span>
          </div>
          <div className="details-progress-track">
            <div
              className={`details-progress-fill ${selectedRoad.status}`}
              style={{ width: `${selectedRoad.congestionLevel}%` }}
            />
          </div>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="details-metrics-grid">
          {/* Average Speed */}
          <div className="details-metric-item">
            <div className="details-metric-title">
              <Gauge size={13} />
              <span>Average Speed</span>
            </div>
            <div className="details-metric-val">{selectedRoad.averageSpeed} km/h</div>
            <div className="details-metric-sub">
              Limit: {selectedRoad.speedLimit} km/h ({speedPercentage}% efficiency)
            </div>
          </div>

          {/* Vehicle Count */}
          <div className="details-metric-item">
            <div className="details-metric-title">
              <Car size={13} />
              <span>Est. Vehicle Volume</span>
            </div>
            <div className="details-metric-val">
              {selectedRoad.vehicleCount.toLocaleString()}
            </div>
            <div className="details-metric-sub">vehicles / hour</div>
          </div>

          {/* Estimated Travel Delay */}
          <div className="details-metric-item">
            <div className="details-metric-title">
              <Clock size={13} />
              <span>Corridor Delay</span>
            </div>
            <div className="details-metric-val">
              +{selectedRoad.delayMinutes} min
            </div>
            <div className="details-metric-sub">vs. free-flow baseline</div>
          </div>

          {/* Road Length */}
          <div className="details-metric-item">
            <div className="details-metric-title">
              <Compass size={13} />
              <span>Segment Length</span>
            </div>
            <div className="details-metric-val">{selectedRoad.lengthKm} km</div>
            <div className="details-metric-sub">Central transit corridor</div>
          </div>
        </div>

        {/* Incident / Condition Diagnostics */}
        <div className={`details-incident-box ${selectedRoad.status === 'low' ? 'clean' : ''}`}>
          {selectedRoad.status === 'low' ? (
            <CheckCircle2 size={16} className="details-incident-icon" />
          ) : (
            <AlertTriangle size={16} className="details-incident-icon" />
          )}
          <div className="details-incident-text">
            <strong>Condition: </strong>
            {selectedRoad.incident}
          </div>
        </div>

        {/* Center / Focus on Map button */}
        {onCenterOnMap && (
          <button
            type="button"
            className="refresh-button"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => onCenterOnMap(selectedRoad)}
          >
            <span>Focus Corridor on Map</span>
            <ArrowRight size={14} />
          </button>
        )}

        {/* Simulation note footer */}
        <div className="details-footer-note">
          Simulated telemetry • Updated {selectedRoad.lastReported}
        </div>
      </div>
    </div>
  );
}
