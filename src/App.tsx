/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MapComponent } from './components/MapComponent';
import { SafetyGuidesModal } from './components/SafetyGuidesModal';
import { HazardReportModal } from './components/HazardReportModal';
import { SafeZone, SAFE_ZONES, LANDSLIDE_ZONES } from './data';
import { isPointInPolygon } from './lib/geoUtils';
import { AlertCircle, Megaphone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

export default function App() {
  const [viewMode, setViewMode] = useState<'standard' | 'satellite'>('standard');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [nearestSafeZone, setNearestSafeZone] = useState<SafeZone | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isGuidesOpen, setIsGuidesOpen] = useState(false);
  const [isReportingOpen, setIsReportingOpen] = useState(false);
  const [isInHazardZone, setIsInHazardZone] = useState(false);

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

  const checkHazardProximity = useCallback((location: [number, number]) => {
    const inZone = LANDSLIDE_ZONES.some(zone => isPointInPolygon(location, zone.coordinates));
    setIsInHazardZone(inZone);
  }, []);

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
        
        checkHazardProximity(location);

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
  }, [checkHazardProximity]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-zinc-950 font-sans relative">
      <Header 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        onLocate={handleLocate}
        isLocating={isLocating}
        onOpenGuides={() => setIsGuidesOpen(true)}
      />

      <AnimatePresence>
        {isInHazardZone && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-red-600 border-b border-red-500 overflow-hidden z-20"
          >
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-1.5 rounded-lg animate-pulse">
                  <AlertCircle className="text-white" size={18} />
                </div>
                <div>
                  <h2 className="text-white font-black uppercase tracking-tighter text-sm leading-none">Emergency Warning</h2>
                  <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-1">You are currently in a high-risk landslide zone. Evacuate immediately.</p>
                </div>
              </div>
              {nearestSafeZone && (
                <div className="flex items-center gap-4">
                  <div className="hidden md:block text-right">
                    <p className="text-white/60 text-[9px] font-bold uppercase">Nearest Safe Zone</p>
                    <p className="text-white font-bold text-xs">{nearestSafeZone.name}</p>
                  </div>
                  <div className="bg-white text-red-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase flex items-center gap-2 shadow-lg">
                    Follow Green Route <ArrowRight size={12} />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className="flex flex-1 overflow-hidden">
        <Sidebar 
          nearestSafeZone={nearestSafeZone} 
          onSelectZone={(zone) => console.log('Selected:', zone.name)}
        />
        
        <div className="flex-1 relative">
          <MapComponent 
            viewMode={viewMode} 
            userLocation={userLocation}
            nearestSafeZone={nearestSafeZone}
            isAlertActive={isInHazardZone}
          />
          
          {/* Overlay Status */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 p-3 rounded-lg shadow-xl">
              <div className="flex items-center gap-2 mb-1">
                <div className={cn("w-2 h-2 rounded-full animate-pulse", isInHazardZone ? "bg-red-500" : "bg-emerald-500")} />
                <span className="text-[10px] font-bold text-zinc-100 uppercase tracking-widest">
                  {isInHazardZone ? 'Hazard Detected' : 'System Online'}
                </span>
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
                <div className="w-4 h-1 bg-emerald-500 rounded-full border-t-2 border-dashed border-emerald-400" />
                <span className="text-xs text-zinc-300 font-medium">Emergency Route</span>
              </div>
            </div>
          </div>

          {/* Report Hazard FAB */}
          <button
            onClick={() => setIsReportingOpen(true)}
            className="absolute bottom-8 right-8 z-20 group flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-red-900/40 transition-all hover:scale-105 active:scale-95"
          >
            <div className="bg-white/20 p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <Megaphone size={20} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Report Hazard</p>
              <p className="text-white/80 text-[8px] font-bold uppercase tracking-widest leading-none">Alert Authorities</p>
            </div>
          </button>
        </div>
      </main>

      <SafetyGuidesModal 
        isOpen={isGuidesOpen} 
        onClose={() => setIsGuidesOpen(false)} 
      />

      <HazardReportModal
        isOpen={isReportingOpen}
        onClose={() => setIsReportingOpen(false)}
        userLocation={userLocation}
      />
    </div>
  );
}
