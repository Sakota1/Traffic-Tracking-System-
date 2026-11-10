
/**
 * TrafficCard Component
 * Reusable metric summary card adhering to SaaS analytics patterns.
 *
 * Props:
 * - title: string (e.g. 'Heavy Congestion')
 * - value: number | string (e.g. 4)
 * - icon: React component (Lucide icon)
 * - statusVariant: 'primary' | 'heavy' | 'moderate' | 'low'
 * - description: string (e.g. 'Average speeds below 15 km/h')
 * - badgeText: string (optional metric tag e.g. 'Critical Attention')
 */
export default function TrafficCard({
  title,
  value,
  icon: Icon,
  statusVariant = 'primary',
  description,
  badgeText
}) {
  return (
    <div className="traffic-card">
      <div className="traffic-card-top">
        <div className={`traffic-card-icon-container ${statusVariant}`}>
          {Icon && <Icon size={20} strokeWidth={2.2} />}
        </div>
        {badgeText && (
          <span className={`traffic-card-badge ${statusVariant}`}>
            {badgeText}
          </span>
        )}
      </div>

      <div className="traffic-card-value">{value}</div>
      <div className="traffic-card-title">{title}</div>
      {description && (
        <div className="traffic-card-description">{description}</div>
      )}
    </div>
  );
}
