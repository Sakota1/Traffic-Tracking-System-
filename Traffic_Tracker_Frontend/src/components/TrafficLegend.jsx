import { Info } from 'lucide-react';

/**
 * TrafficLegend Component
 * Explains the color classification and speed/congestion thresholds
 * used throughout the map and analytics views.
 */
export default function TrafficLegend() {
  const legendItems = [
    {
      status: 'heavy',
      name: 'Heavy Congestion',
      threshold: '< 15 km/h avg speed (> 75% capacity)'
    },
    {
      status: 'moderate',
      name: 'Moderate Flow',
      threshold: '15 – 35 km/h (40% – 75% capacity)'
    },
    {
      status: 'low',
      name: 'Low Congestion / Free Flow',
      threshold: '> 35 km/h (< 40% capacity)'
    }
  ];

  return (
    <div className="traffic-legend-card" aria-label="Traffic Classification Legend">
      <div className="legend-title">
        <Info size={14} />
        <span>Traffic Classification Criteria</span>
      </div>
      <div className="legend-items-row">
        {legendItems.map((item) => (
          <div key={item.status} className="legend-item">
            <span className={`legend-color-bar ${item.status}`} />
            <div className="legend-labels">
              <span className="legend-name">{item.name}</span>
              <span className="legend-desc">{item.threshold}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
