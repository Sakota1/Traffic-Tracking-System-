import { useState } from 'react';
import { Settings as SettingsIcon, Sliders, Bell, Globe, Check } from 'lucide-react';

/**
 * Settings Component
 * Operational configuration preferences for the Smart Traffic Tracker interface.
 */
export default function Settings() {
  const [unit, setUnit] = useState('kmh');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [mapMarkers, setMapMarkers] = useState(true);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  return (
    <div className="dashboard-content">
      <div className="placeholder-page" style={{ textAlign: 'left', alignItems: 'stretch' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="placeholder-icon-box" style={{ margin: '0 auto 16px' }}>
            <SettingsIcon size={30} />
          </div>
          <h2 className="placeholder-title">Operations Console Settings</h2>
          <p className="placeholder-description" style={{ margin: '0 auto' }}>
            Configure client-side telemetry preferences, measurement units, and map visualization layers.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Unit Preferences */}
          <div className="placeholder-feature-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Sliders size={16} color="#2563eb" />
              <strong style={{ fontSize: '13px' }}>Speed & Distance Measurement Units</strong>
            </div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="unit"
                  value="kmh"
                  checked={unit === 'kmh'}
                  onChange={() => setUnit('kmh')}
                />
                Metric (km/h & kilometers)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="unit"
                  value="mph"
                  checked={unit === 'mph'}
                  onChange={() => setUnit('mph')}
                />
                Imperial (mph & miles)
              </label>
            </div>
          </div>

          {/* Map Layer Controls */}
          <div className="placeholder-feature-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Globe size={16} color="#2563eb" />
              <strong style={{ fontSize: '13px' }}>Map Overlays & Pins</strong>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={mapMarkers}
                onChange={(e) => setMapMarkers(e.target.checked)}
              />
              Display corridor center markers and pulsation effects
            </label>
          </div>

          {/* Simulation Feed Options */}
          <div className="placeholder-feature-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Bell size={16} color="#2563eb" />
              <strong style={{ fontSize: '13px' }}>Simulation Telemetry Controls</strong>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
              />
              Auto-refresh simulation snapshots every 30 seconds
            </label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
            <span style={{ fontSize: '11.5px', color: 'var(--text-subtle)' }}>
              Client preferences stored locally in browser session
            </span>
            <button
              type="button"
              className="refresh-button"
              style={{ backgroundColor: 'var(--primary-600)', color: '#ffffff', border: 'none' }}
              onClick={handleSave}
            >
              {savedMessage ? <Check size={14} /> : null}
              <span>{savedMessage ? 'Preferences Saved' : 'Save Preferences'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
