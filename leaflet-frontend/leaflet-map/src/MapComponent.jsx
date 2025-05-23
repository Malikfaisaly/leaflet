import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Leaflet marker icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const MapComponent = ({ theme, toggleTheme }) => {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMarkers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/markers');
      setMarkers(response.data);
    } catch (err) {
      setError('Data fetch mein error aaya!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarkers();
  }, []);

  return (
    <div className="relative p-6 rounded-2xl dark:bg-gray-900 bg-white">
      {/* Header Toolbar */}
      <div className="flex justify-between items-center mb-4 p-4 rounded-xl dark:bg-gray-800 bg-blue-600">
        <h2 className="text-xl font-bold text-white">Locations ({markers.length})</h2>
        <div className="flex gap-3">
  <button
    onClick={fetchMarkers}
    className="relative px-5 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 dark:from-gray-600 dark:to-gray-500 dark:hover:from-gray-700 dark:hover:to-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
  >
    <span className="flex items-center gap-2">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h5m11 11v-5h-5m7-7a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Refresh
    </span>
  </button>
  <button
    onClick={toggleTheme}
    className="relative px-5 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-800 dark:hover:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
  >
    <span className="flex items-center gap-2">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={theme === 'light' ? 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' : 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'} />
      </svg>
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </span>
  </button>
</div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center dark:bg-gray-900/50 bg-gray-900/50 rounded-2xl z-10">
          <ClipLoader color={theme === 'light' ? '#3b82f6' : '#93c5fd'} size={60} />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center dark:bg-red-900/80 bg-red-100/80 rounded-2xl z-10">
          <div className="p-4 rounded-lg dark:bg-gray-800 bg-white flex items-center gap-2">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-semibold dark:text-red-300 text-red-600">{error}</p>
          </div>
        </div>
      )}

      {/* Map Container */}
      <MapContainer
        center={[51.505, -0.09]}
        zoom={3}
        className="h-[65vh] w-full rounded-xl dark:border-gray-700 border-gray-200"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {markers.map((marker) => (
          <Marker key={marker.id} position={[marker.lat, marker.lng]}>
            <Popup>
              <div className="p-2 text-center dark:bg-gray-800 bg-white rounded-lg">
                <h3 className="font-bold dark:text-indigo-300 text-indigo-600">{marker.name}</h3>
                <p className="text-sm dark:text-gray-300 text-gray-600">Lat: {marker.lat.toFixed(4)}</p>
                <p className="text-sm dark:text-gray-300 text-gray-600">Lng: {marker.lng.toFixed(4)}</p>
                <button className="mt-2 px-3 py-1 rounded-md dark:bg-indigo-700 bg-indigo-500 text-white hover:bg-opacity-80">
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating Controls */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 p-2 rounded-lg dark:bg-gray-800 bg-white">
        <button
          onClick={() => document.querySelector('.leaflet-control-zoom-in').click()}
          className="px-3 py-1 rounded-md dark:bg-indigo-700 bg-indigo-500 text-white hover:bg-opacity-80"
        >
          +
        </button>
        <button
          onClick={() => document.querySelector('.leaflet-control-zoom-out').click()}
          className="px-3 py-1 rounded-md dark:bg-indigo-700 bg-indigo-500 text-white hover:bg-opacity-80"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default MapComponent;