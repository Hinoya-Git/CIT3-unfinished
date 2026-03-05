import React from 'react';
import { SafeZone, SAFE_ZONES, EMERGENCY_CONTACTS } from '../data';
import { Shield, Users, Info, MapPin, AlertCircle, Phone, LifeBuoy, Ambulance, Flame } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  nearestSafeZone: SafeZone | null;
  onSelectZone: (zone: SafeZone) => void;
}

const ContactIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'Police': return <Shield size={14} className="text-blue-400" />;
    case 'Medical': return <Ambulance size={14} className="text-red-400" />;
    case 'Rescue': return <LifeBuoy size={14} className="text-emerald-400" />;
    case 'Fire': return <Flame size={14} className="text-orange-400" />;
    default: return <Phone size={14} className="text-zinc-400" />;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({ nearestSafeZone, onSelectZone }) => {
  return (
    <div className="w-80 h-full bg-zinc-900 border-r border-zinc-800 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
        <h2 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
          <Shield size={14} className="text-emerald-500" /> Emergency Safe Zones
        </h2>
        
        {nearestSafeZone && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <p className="text-[10px] text-emerald-500 font-bold uppercase mb-1">Nearest Recommended</p>
            <h3 className="text-emerald-50 font-bold text-sm">{nearestSafeZone.name}</h3>
            <p className="text-xs text-emerald-500/80 mt-1 flex items-center gap-1">
              <MapPin size={10} /> Route active on map
            </p>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {SAFE_ZONES.map((zone) => (
            <button
              key={zone.id}
              onClick={() => onSelectZone(zone)}
              className={cn(
                "w-full text-left p-3 rounded-lg border transition-all duration-200 group",
                nearestSafeZone?.id === zone.id 
                  ? "bg-zinc-800 border-emerald-500/50" 
                  : "bg-zinc-800/50 border-zinc-700 hover:border-zinc-500"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-zinc-100 font-bold text-sm group-hover:text-white transition-colors">
                  {zone.name}
                </h4>
                <span className={cn(
                  "text-[9px] font-bold px-1.5 py-0.5 rounded uppercase",
                  zone.capacity === 'Safe/Available' 
                    ? "bg-emerald-500/20 text-emerald-400" 
                    : "bg-red-500/20 text-red-400"
                )}>
                  {zone.capacity === 'Safe/Available' ? 'Available' : 'Full'}
                </span>
              </div>
              <p className="text-xs text-zinc-400 line-clamp-2 mb-2">
                {zone.description}
              </p>
              <div className="flex items-center gap-3 text-[10px] text-zinc-500">
                <span className="flex items-center gap-1">
                  <Users size={10} /> 85% Capacity
                </span>
                <span className="flex items-center gap-1">
                  <Info size={10} /> Primary Site
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-zinc-800 bg-zinc-950/30">
          <h2 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <Phone size={14} className="text-amber-500" /> Emergency Contacts
          </h2>
          <div className="space-y-2">
            {EMERGENCY_CONTACTS.map((contact) => (
              <div key={contact.id} className="p-2 bg-zinc-900/50 rounded-lg border border-zinc-800 flex items-center gap-3">
                <div className="p-2 bg-zinc-800 rounded-lg">
                  <ContactIcon type={contact.type} />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight">{contact.name}</p>
                  <p className="text-xs text-zinc-200 font-mono">{contact.number}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-zinc-950 border-t border-zinc-800">
        <div className="flex items-center gap-2 text-amber-500 mb-2">
          <AlertCircle size={14} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Emergency Notice</span>
        </div>
        <p className="text-[10px] text-zinc-500 leading-relaxed">
          In case of immediate danger, follow local authorities' instructions. This map is for guidance only.
        </p>
      </div>
    </div>
  );
};
