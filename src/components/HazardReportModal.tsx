import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Megaphone, MapPin, Camera, Send, CheckCircle2 } from 'lucide-react';

interface HazardReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  userLocation: [number, number] | null;
}

export const HazardReportModal: React.FC<HazardReportModalProps> = ({ isOpen, onClose, userLocation }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hazardType, setHazardType] = useState('landslide');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-md h-fit bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl z-[101] overflow-hidden"
          >
            {isSubmitted ? (
              <div className="p-12 flex flex-col items-center text-center space-y-4">
                <div className="bg-emerald-500/20 p-4 rounded-full">
                  <CheckCircle2 className="text-emerald-500" size={48} />
                </div>
                <h2 className="text-white font-bold text-xl">Report Submitted</h2>
                <p className="text-zinc-400 text-sm">
                  Authorities have been notified of the hazard at your coordinates. Stay safe.
                </p>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-500/20 p-2 rounded-lg">
                      <Megaphone className="text-red-500" size={20} />
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-lg">Report Hazard</h2>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Immediate Alert to Authorities</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Hazard Type</label>
                      <select 
                        value={hazardType}
                        onChange={(e) => setHazardType(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
                      >
                        <option value="landslide">Landslide / Soil Erosion</option>
                        <option value="flooding">Flash Flood</option>
                        <option value="structural">Structural Damage</option>
                        <option value="roadblock">Road Blockage</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Description</label>
                      <textarea 
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the hazard..."
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white text-sm h-24 resize-none focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>

                    <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-zinc-400">
                          <MapPin size={14} className="text-red-500" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Auto-Captured Location</span>
                        </div>
                        <span className="text-[10px] text-emerald-500 font-bold uppercase">GPS Verified</span>
                      </div>
                      <div className="text-xs font-mono text-zinc-500">
                        {userLocation ? `${userLocation[0].toFixed(6)}, ${userLocation[1].toFixed(6)}` : 'Detecting location...'}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold transition-all"
                    >
                      <Camera size={16} />
                      Attach Photo
                    </button>
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-900/20"
                    >
                      <Send size={16} />
                      Send Alert
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
