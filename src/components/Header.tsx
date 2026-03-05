import React from 'react';
import { Map as MapIcon, Navigation, Layers, Satellite, Crosshair, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeaderProps {
  viewMode: 'standard' | 'satellite';
  setViewMode: (mode: 'standard' | 'satellite') => void;
  onLocate: () => void;
  isLocating: boolean;
  onOpenGuides: () => void;
}

export const Header: React.FC<HeaderProps> = ({ viewMode, setViewMode, onLocate, isLocating, onOpenGuides }) => {
  return (
    <header className="h-16 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-3">
        <div className="bg-emerald-500 p-2 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <MapIcon className="text-white" size={20} />
        </div>
        <div>
          <h1 className="text-white font-black text-lg tracking-tight uppercase">
            Baguio <span className="text-emerald-500">Resilience</span> Map
          </h1>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
            Emergency Response Dashboard • Live Status
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onOpenGuides}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded-lg text-xs font-bold transition-all"
        >
          <BookOpen size={14} className="text-amber-500" />
          Safety Guides
        </button>

        <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          <button
            onClick={() => setViewMode('standard')}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all",
              viewMode === 'standard' 
                ? "bg-zinc-800 text-white shadow-sm" 
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            <Layers size={14} /> Standard
          </button>
          <button
            onClick={() => setViewMode('satellite')}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all",
              viewMode === 'satellite' 
                ? "bg-zinc-800 text-white shadow-sm" 
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            <Satellite size={14} /> Satellite
          </button>
        </div>

        <button
          onClick={onLocate}
          disabled={isLocating}
          className={cn(
            "flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-lg shadow-emerald-900/20 active:scale-95 disabled:opacity-50",
            isLocating && "animate-pulse"
          )}
        >
          <Crosshair size={14} />
          {isLocating ? 'Locating...' : 'Find My Location'}
        </button>
      </div>
    </header>
  );
};
