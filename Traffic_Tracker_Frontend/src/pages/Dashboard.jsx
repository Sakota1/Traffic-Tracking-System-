import { useState } from 'react';
import { 
  Car, 
  AlertTriangle, 
  Clock, 
  CheckCircle2
} from 'lucide-react';
import TrafficCard from '../components/TrafficCard';
import TrafficMap from '../components/TrafficMap';
import TrafficDetails from '../components/TrafficDetails';
import TrafficLegend from '../components/TrafficLegend';

/**
 * Dashboard Component
 * Primary view assembling high-level KPIs, spatial map telemetry,
 * corridor diagnostics, and a tabular road overview.
 */
export default function Dashboard({
  roads,
  stats,
  selectedRoad,
  onSelectRoad,
  onClearSelection
}) {
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter roads for the telemetry overview table
  const filteredRoads = roads.filter((road) => {
    if (activeFilter === 'all') return true;
    return road.status === activeFilter;
  });

  return (
    <div className="dashboard-content">
      {/* 1. Four Reusable Traffic Summary Overview Cards */}
      <section className="traffic-cards-grid" aria-label="Traffic Summary Statistics">
        {/* Card 1: Total Monitored Roads */}
        <TrafficCard
          title="Monitored Corridors"
          value={stats.totalRoads}
          icon={Car}
          statusVariant="primary"
          description={`Across ${stats.totalVehicles.toLocaleString()} active simulated vehicles`}
          badgeText="Lucknow TMC"
        />

        {/* Card 2: Heavy Congestion */}
        <TrafficCard
          title="Severe Congestion"
          value={stats.heavyCount}
          icon={AlertTriangle}
          statusVariant="heavy"
          description="Average speed below 15 km/h"
          badgeText={stats.heavyCount > 0 ? 'Critical' : 'Nominal'}
        />

        {/* Card 3: Moderate Congestion */}
        <TrafficCard
          title="Moderate Flow"
          value={stats.moderateCount}
          icon={Clock}
          statusVariant="moderate"
          description="Speeds between 15 – 35 km/h"
          badgeText="Elevated Density"
        />

        {/* Card 4: Low Congestion */}
        <TrafficCard
          title="Free Flow Corridors"
          value={stats.lowCount}
          icon={CheckCircle2}
          statusVariant="low"
          description="Near or at posted speed limits"
          badgeText="Optimal"
        />
      </section>

      {/* 2. Interactive Traffic Map & Selected Road Details Pane */}
      <section className="dashboard-map-section">
        <div className="map-pane">
          <TrafficMap
            roads={roads}
            selectedRoad={selectedRoad}
            onSelectRoad={onSelectRoad}
            height="540px"
          />
          <TrafficLegend />
        </div>

        <div className="side-pane">
          <TrafficDetails
            selectedRoad={selectedRoad}
            onClose={onClearSelection}
          />
        </div>
      </section>

      {/* 3. Detailed Road Telemetry Table */}
      <section className="dashboard-table-card">
        <div className="table-header-toolbar">
          <div className="table-title-group">
            <span className="table-title">Corridor Telemetry & Status Feed</span>
            <span className="table-count-badge">
              {filteredRoads.length} of {roads.length} corridors
            </span>
          </div>

          {/* Status Filter Tabs */}
          <div className="table-filter-tabs" role="tablist">
            <button
              type="button"
              className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
              role="tab"
            >
              All ({roads.length})
            </button>
            <button
              type="button"
              className={`filter-tab ${activeFilter === 'heavy' ? 'active' : ''}`}
              onClick={() => setActiveFilter('heavy')}
              role="tab"
            >
              Heavy ({stats.heavyCount})
            </button>
            <button
              type="button"
              className={`filter-tab ${activeFilter === 'moderate' ? 'active' : ''}`}
              onClick={() => setActiveFilter('moderate')}
              role="tab"
            >
              Moderate ({stats.moderateCount})
            </button>
            <button
              type="button"
              className={`filter-tab ${activeFilter === 'low' ? 'active' : ''}`}
              onClick={() => setActiveFilter('low')}
              role="tab"
            >
              Low ({stats.lowCount})
            </button>
          </div>
        </div>

        <div className="traffic-table-wrapper">
          <table className="traffic-table">
            <thead>
              <tr>
                <th>Corridor Name</th>
                <th>Zone</th>
                <th>Status</th>
                <th>Congestion</th>
                <th>Average Speed</th>
                <th>Est. Volume</th>
                <th>Delay</th>
                <th>Current Condition</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoads.map((road) => {
                const isSelected = selectedRoad && selectedRoad.id === road.id;

                return (
                  <tr
                    key={road.id}
                    className={isSelected ? 'selected' : ''}
                    onClick={() => onSelectRoad(road)}
                    title="Click to view corridor details and center on map"
                  >
                    <td>
                      <div className="road-name-cell">
                        <span>{road.name}</span>
                        <span className="road-code-badge">{road.code}</span>
                      </div>
                    </td>
                    <td>{road.zone}</td>
                    <td>
                      <span className={`status-pill ${road.status}`}>
                        <span className="status-pill-dot"></span>
                        {road.status}
                      </span>
                    </td>
                    <td>
                      <div className="metric-bar-cell">
                        <div className="metric-mini-bar">
                          <div
                            className={`metric-mini-fill ${road.status}`}
                            style={{
                              width: `${road.congestionLevel}%`,
                              backgroundColor:
                                road.status === 'heavy'
                                  ? '#dc2626'
                                  : road.status === 'moderate'
                                  ? '#d97706'
                                  : '#16a34a'
                            }}
                          />
                        </div>
                        <span>{road.congestionLevel}%</span>
                      </div>
                    </td>
                    <td>
                      <strong>{road.averageSpeed} km/h</strong>{' '}
                      <span style={{ color: 'var(--text-subtle)', fontSize: '11px' }}>
                        / {road.speedLimit} max
                      </span>
                    </td>
                    <td>{road.vehicleCount.toLocaleString()} vph</td>
                    <td>
                      <span style={{ color: road.delayMinutes > 10 ? '#dc2626' : 'inherit' }}>
                        +{road.delayMinutes} min
                      </span>
                    </td>
                    <td style={{ fontSize: '12px' }}>{road.incident}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
