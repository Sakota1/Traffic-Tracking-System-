import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

/**
 * SearchBar Component
 * Enables instantaneous road lookup across the simulated dataset.
 * Supports dropdown autocomplete with traffic status and average speed indicators.
 */
export default function SearchBar({ roads, onSelectRoad }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Filter matching roads by name, code, or zone
  const matches = query.trim() === '' 
    ? [] 
    : roads.filter((road) => {
        const q = query.toLowerCase();
        return (
          road.name.toLowerCase().includes(q) ||
          road.code.toLowerCase().includes(q) ||
          road.zone.toLowerCase().includes(q)
        );
      });

  // Handle outside clicks to close the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (road) => {
    onSelectRoad(road);
    setQuery('');
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="search-bar-container" ref={containerRef}>
      <div className="search-input-wrapper">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search road, code, or area..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsOpen(false);
            }
          }}
          aria-label="Search roads"
        />
        {query && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={handleClear}
            title="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {isOpen && query.trim() !== '' && (
        <div className="search-dropdown" role="listbox">
          {matches.length > 0 ? (
            matches.map((road) => (
              <button
                key={road.id}
                type="button"
                className="search-dropdown-item"
                onClick={() => handleSelect(road)}
                role="option"
                aria-selected="false"
              >
                <div className="search-item-info">
                  <span className="search-item-name">{road.name} ({road.code})</span>
                  <span className="search-item-zone">{road.zone}</span>
                </div>
                <div className="search-item-right">
                  <span className="search-item-speed">{road.averageSpeed} km/h</span>
                  <span className={`status-pill ${road.status}`}>
                    <span className="status-pill-dot"></span>
                    {road.status}
                  </span>
                </div>
              </button>
            ))
          ) : (
            <div className="search-empty">
              No matching roads found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
