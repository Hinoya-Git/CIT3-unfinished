/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MapComponent } from './components/MapComponent';
import { SafetyGuidesModal } from './components/SafetyGuidesModal';
import { SafeZone, SAFE_ZONES } from './data';

export default function App() {
  const [viewMode, setViewMode] = useState<'standard' | 'satellite'>('standard');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [nearestSafeZone, setNearestSafeZone] = useState<SafeZone | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isGuidesOpen, setIsGuidesOpen] = useState(false);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const handleLocate = useCallback(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location: [number, number] = [latitude, longitude];
        setUserLocation(location);
        setIsLocating(false);

        // Find nearest safe zone
        let minDistance = Infinity;
        let nearest: SafeZone | null = null;

        SAFE_ZONES.forEach((zone) => {
          const dist = calculateDistance(latitude, longitude, zone.lat, zone.lng);
          if (dist < minDistance) {
            minDistance = dist;
            nearest = zone;
          }
        });

        setNearestSafeZone(nearest);
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsLocating(false);
        alert('Unable to retrieve your location. Please ensure location permissions are granted.');
      },
      { enableHighAccuracy: true }
    );
  }, []);

  const handleSelectZone = (zone: SafeZone) => {
    // If user has location, we might want to keep the nearest one as the "active" route
    // but for now, let's just highlight the selected one if we want to zoom to it.
    // In a real app, we might update the route.
    console.log('Selected zone:', zone.name);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-zinc-950 font-sans">
      <Header 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        onLocate={handleLocate}
        isLocating={isLocating}
        onOpenGuides={() => setIsGuidesOpen(true)}
      />
      
      <main className="flex flex-1 overflow-hidden">
        <Sidebar 
          nearestSafeZone={nearestSafeZone} 
          onSelectZone={handleSelectZone}
        />
        
        <div className="flex-1 relative">
          <MapComponent 
            viewMode={viewMode} 
            userLocation={userLocation}
            nearestSafeZone={nearestSafeZone}
          />
          
          {/* Overlay Status */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 p-3 rounded-lg shadow-xl">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-zinc-100 uppercase tracking-widest">System Online</span>
              </div>
              <p className="text-[9px] text-zinc-500 uppercase font-bold">Baguio Emergency Network</p>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-6 left-6 z-10 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 p-4 rounded-xl shadow-2xl max-w-xs">
            <h3 className="text-zinc-100 text-[10px] font-black uppercase tracking-widest mb-3">Map Legend</h3>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
                <span className="text-xs text-zinc-300 font-medium">Safe Zone / Evacuation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-red-500/40 border border-red-600 rounded-sm" />
                <span className="text-xs text-zinc-300 font-medium">Landslide Hazard Zone</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-red-500 bg-red-500/20" />
                <span className="text-xs text-zinc-300 font-medium">Recent Seismic Activity</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-1 bg-emerald-500 rounded-full border-t-2 border-dashed border-emerald-400" />
                <span className="text-xs text-zinc-300 font-medium">Emergency Route</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SafetyGuidesModal 
        isOpen={isGuidesOpen} 
        onClose={() => setIsGuidesOpen(false)} 
      />
    </div>
  );
}
