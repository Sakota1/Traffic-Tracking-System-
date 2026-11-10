import { useState } from 'react';
import { Radio, Search } from 'lucide-react';
import TrafficMap from '../components/TrafficMap';
import TrafficLegend from '../components/TrafficLegend';

/**
 * LiveTraffic Component
 * Dedicated full-screen live operations monitor featuring a dominant map
 * and real-time corridor telemetry stream.
 */
export default function LiveTraffic({
  roads,
  selectedRoad,
  onSelectRoad
}) {
  const [filter, setFilter] = useState('all');
  const [localSearch, setLocalSearch] = useState('');

  // Filter roads by status & local query
  const visibleRoads = roads.filter((road) => {
    const matchesFilter = filter === 'all' || road.status === filter;
    const matchesQuery = 
      localSearch.trim() === '' ||
      road.name.toLowerCase().includes(localSearch.toLowerCase()) ||
      road.code.toLowerCase().includes(localSearch.toLowerCase()) ||
      road.zone.toLowerCase().includes(localSearch.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="dashboard-content">
      <div className="live-traffic-container">
        {/* Dominant Map Monitor */}
        <div className="map-pane" style={{ height: '100%' }}>
          <TrafficMap
            roads={visibleRoads}
            selectedRoad={selectedRoad}
            onSelectRoad={onSelectRoad}
            height="100%"
          />
          <TrafficLegend />
        </div>

        {/* Live Feed Sidebar */}
        <div className="live-feed-sidebar">
          <div className="live-feed-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio size={18} color="#dc2626" />
              <span style={{ fontWeight: 700, fontSize: '14px' }}>Live Corridor Stream</span>
            </div>
            <span className="sim-badge">LIVE SIMULATION</span>
          </div>

          {/* Search & Quick Filter */}
          <div style={{ padding: '12px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="search-input-wrapper">
              <Search size={14} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Filter corridor stream..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                style={{ height: '34px' }}
              />
            </div>

            <div className="table-filter-tabs" style={{ width: '100%', justifyContent: 'space-between' }}>
              <button
                type="button"
                className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
                style={{ flex: 1, textAlign: 'center' }}
              >
                All
              </button>
              <button
                type="button"
                className={`filter-tab ${filter === 'heavy' ? 'active' : ''}`}
                onClick={() => setFilter('heavy')}
                style={{ flex: 1, textAlign: 'center' }}
              >
                Heavy
              </button>
              <button
                type="button"
                className={`filter-tab ${filter === 'moderate' ? 'active' : ''}`}
                onClick={() => setFilter('moderate')}
                style={{ flex: 1, textAlign: 'center' }}
              >
                Mod
              </button>
              <button
                type="button"
                className={`filter-tab ${filter === 'low' ? 'active' : ''}`}
                onClick={() => setFilter('low')}
                style={{ flex: 1, textAlign: 'center' }}
              >
                Low
              </button>
            </div>
          </div>

          {/* Scrollable Feed List */}
          <div className="live-feed-list">
            {visibleRoads.map((road) => {
              const isSelected = selectedRoad && selectedRoad.id === road.id;

              return (
                <div
                  key={road.id}
                  className={`live-feed-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => onSelectRoad(road)}
                >
                  <div className="live-feed-card-header">
                    <div>
                      <span style={{ fontWeight: 700, fontSize: '13px' }}>{road.name}</span>
                      <span className="road-code-badge" style={{ marginLeft: '6px' }}>{road.code}</span>
                    </div>
                    <span className={`status-pill ${road.status}`}>
                      <span className="status-pill-dot" />
                      {road.status}
                    </span>
                  </div>

                  <div className="live-feed-stats">
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>Speed</div>
                      <div className="live-stat-val">{road.averageSpeed} km/h</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>Capacity</div>
                      <div className="live-stat-val">{road.congestionLevel}%</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>Vehicles</div>
                      <div className="live-stat-val">{road.vehicleCount} vph</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{road.zone}</span>
                    <span style={{ color: road.delayMinutes > 8 ? '#dc2626' : 'var(--text-secondary)' }}>
                      +{road.delayMinutes} min delay
                    </span>
                  </div>
                </div>
              );
            })}

            {visibleRoads.length === 0 && (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
                No corridors match current filter
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
