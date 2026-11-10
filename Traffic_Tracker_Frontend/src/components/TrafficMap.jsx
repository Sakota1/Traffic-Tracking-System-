import { useEffect, useState, Fragment } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Polyline, 
  Marker, 
  Popup, 
  Tooltip, 
  useMap 
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RotateCcw } from 'lucide-react';

// Default map center: Lucknow Metropolitan Area (Hazratganj / Gomti Nagar / Shaheed Path)
const DEFAULT_CENTER = [26.8500, 80.9500];
const DEFAULT_ZOOM = 12;

/**
 * Helper to generate Leaflet DivIcons with color-coded traffic status
 */
function createTrafficPinIcon(status, isSelected) {
  return L.divIcon({
    className: 'custom-traffic-pin',
    html: `
      <div class="traffic-pin-inner ${status} ${isSelected ? 'selected' : ''}" 
           style="${isSelected ? 'transform: scale(1.35); outline: 3px solid #2563eb;' : ''}">
        <span class="pin-dot"></span>
      </div>
    `,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -12]
  });
}

/**
 * Returns hex color code corresponding to road traffic status
 */
function getStatusColor(status) {
  switch (status) {
    case 'heavy':
      return '#dc2626';
    case 'moderate':
      return '#d97706';
    case 'low':
    default:
      return '#16a34a';
  }
}

/**
 * Child component to smoothly animate camera to selected road
 */
function MapCameraManager({ selectedRoad, resetSignal }) {
  const map = useMap();

  useEffect(() => {
    if (selectedRoad && selectedRoad.center) {
      map.flyTo(selectedRoad.center, 14, {
        duration: 1.2,
        easeLinearity: 0.25
      });
    }
  }, [selectedRoad, map]);

  useEffect(() => {
    if (resetSignal) {
      map.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM, {
        duration: 1.0
      });
    }
  }, [resetSignal, map]);

  return null;
}

/**
 * TrafficMap Component
 * Interactive Leaflet map rendering demonstration corridors,
 * live-colored road polylines, status markers, and telemetry popups.
 */
export default function TrafficMap({
  roads,
  selectedRoad,
  onSelectRoad,
  height = '520px'
}) {
  const [resetCount, setResetCount] = useState(0);

  const handleResetView = () => {
    setResetCount((prev) => prev + 1);
  };

  return (
    <div className="traffic-map-wrapper" style={{ height }}>
      {/* Simulation Notice Overlay */}
      <div className="map-disclaimer-overlay">
        <span className="map-disclaimer-dot" />
        <span>Simulated Traffic Overlays • OpenStreetMap Demonstration</span>
      </div>

      {/* Recenter Map Button */}
      <button
        type="button"
        className="map-reset-btn"
        onClick={handleResetView}
        title="Reset camera to Lucknow Metropolitan overview"
      >
        <RotateCcw size={14} />
        <span>Reset View</span>
      </button>

      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        {/* OpenStreetMap Standard Basemap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* Camera Fly Controller */}
        <MapCameraManager 
          selectedRoad={selectedRoad} 
          resetSignal={resetCount} 
        />

        {/* Render Road Polylines & Markers */}
        {roads.map((road) => {
          const isSelected = selectedRoad && selectedRoad.id === road.id;
          const statusColor = getStatusColor(road.status);

          return (
            <Fragment key={road.id}>
              {/* Road Polyline Segment */}
              <Polyline
                positions={road.coordinates}
                pathOptions={{
                  color: isSelected ? '#1d4ed8' : statusColor,
                  weight: isSelected ? 8 : 5,
                  opacity: isSelected ? 1.0 : 0.82,
                  lineCap: 'round',
                  lineJoin: 'round'
                }}
                eventHandlers={{
                  click: () => onSelectRoad(road)
                }}
              >
                <Tooltip sticky direction="top" offset={[0, -5]}>
                  <strong>{road.name} ({road.code})</strong>
                  <br />
                  <span>{road.status.toUpperCase()} • {road.averageSpeed} km/h</span>
                </Tooltip>
              </Polyline>

              {/* Status Pin Marker at Corridor Center */}
              <Marker
                position={road.center}
                icon={createTrafficPinIcon(road.status, isSelected)}
                eventHandlers={{
                  click: () => onSelectRoad(road)
                }}
              >
                <Popup>
                  <div className="map-popup-card">
                    <div className="map-popup-header">
                      <span className="map-popup-title">{road.name}</span>
                      <span className={`status-pill ${road.status}`}>
                        {road.status}
                      </span>
                    </div>
                    <div className="map-popup-metric-row">
                      <span>Average Speed:</span>
                      <span className="map-popup-metric-value">{road.averageSpeed} km/h</span>
                    </div>
                    <div className="map-popup-metric-row">
                      <span>Vehicle Volume:</span>
                      <span className="map-popup-metric-value">{road.vehicleCount.toLocaleString()} /hr</span>
                    </div>
                    <div className="map-popup-metric-row">
                      <span>Delay:</span>
                      <span className="map-popup-metric-value">+{road.delayMinutes} min</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
}
