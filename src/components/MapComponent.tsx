import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Circle, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { BAGUIO_CENTER, SAFE_ZONES, LANDSLIDE_ZONES, SafeZone } from '../data';
import { Map as MapIcon, Layers, Navigation, AlertTriangle, ShieldCheck } from 'lucide-react';

// Fix Leaflet default icon issue
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom icons
const safeZoneIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="bg-emerald-500 p-2 rounded-full border-2 border-white shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

const userIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="bg-blue-500 p-2 rounded-full border-2 border-white shadow-lg animate-pulse"><div class="w-3 h-3 bg-white rounded-full"></div></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

interface MapComponentProps {
  viewMode: 'standard' | 'satellite';
  userLocation: [number, number] | null;
  nearestSafeZone: SafeZone | null;
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);
  return null;
}

export const MapComponent: React.FC<MapComponentProps> = ({ viewMode, userLocation, nearestSafeZone }) => {
  const roadmapUrl = 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
  const satelliteUrl = 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={BAGUIO_CENTER}
        zoom={14}
        scrollWheelZoom={true}
        className="z-0"
      >
        <TileLayer
          url={viewMode === 'standard' ? roadmapUrl : satelliteUrl}
          attribution="&copy; Google Maps"
        />

        {/* Landslide Zones */}
        {LANDSLIDE_ZONES.map((zone) => (
          <Polygon
            key={zone.id}
            positions={zone.coordinates}
            pathOptions={{
              fillColor: '#ef4444',
              fillOpacity: 0.4,
              color: '#dc2626',
              weight: 2
            }}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-red-600 flex items-center gap-1">
                  <AlertTriangle size={14} /> High Risk: {zone.name}
                </h3>
                <p className="text-xs text-gray-600">Landslide-prone steep slope.</p>
              </div>
            </Popup>
          </Polygon>
        ))}

        {/* Safe Zones */}
        {SAFE_ZONES.map((zone) => (
          <Marker
            key={zone.id}
            position={[zone.lat, zone.lng]}
            icon={safeZoneIcon}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck size={14} /> {zone.name}
                </h3>
                <p className="text-xs text-gray-600">{zone.description}</p>
                <div className={`mt-2 text-[10px] font-bold uppercase px-2 py-0.5 rounded inline-block ${
                  zone.capacity === 'Safe/Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>
                  {zone.capacity}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* User Location */}
        {userLocation && (
          <>
            <Marker position={userLocation} icon={userIcon}>
              <Popup>You are here</Popup>
            </Marker>
            <MapUpdater center={userLocation} />
          </>
        )}

        {/* Path to Nearest Safe Zone */}
        {userLocation && nearestSafeZone && (
          <Polyline
            positions={[userLocation, [nearestSafeZone.lat, nearestSafeZone.lng]]}
            pathOptions={{
              color: '#10b981',
              weight: 4,
              dashArray: '10, 10',
              opacity: 0.8
            }}
          />
        )}
      </MapContainer>
    </div>
  );
};
