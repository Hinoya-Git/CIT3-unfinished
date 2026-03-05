import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, AlertCircle, Info, Wind, Zap } from 'lucide-react';

interface SafetyGuidesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyGuidesModal: React.FC<SafetyGuidesModalProps> = ({ isOpen, onClose }) => {
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
            className="fixed inset-0 m-auto w-full max-w-2xl h-fit max-h-[90vh] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl z-[101] overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500/20 p-2 rounded-lg">
                  <BookOpen className="text-amber-500" size={20} />
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg">Emergency Safety Guides</h2>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Actionable advice for Baguio residents</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Earthquake Section */}
              <section>
                <div className="flex items-center gap-2 text-red-500 mb-4">
                  <Zap size={18} />
                  <h3 className="font-black uppercase tracking-tighter text-xl">Earthquake Protocol</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700">
                    <h4 className="text-zinc-100 font-bold mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      During Shaking
                    </h4>
                    <ul className="text-sm text-zinc-400 space-y-2 list-disc pl-4">
                      <li><strong className="text-zinc-200">DROP, COVER, and HOLD ON.</strong> Get under a sturdy table.</li>
                      <li>Stay away from glass, windows, and heavy furniture.</li>
                      <li>If outdoors, move to an open area away from buildings and power lines.</li>
                      <li>Do not use elevators.</li>
                    </ul>
                  </div>
                  <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700">
                    <h4 className="text-zinc-100 font-bold mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      After Shaking
                    </h4>
                    <ul className="text-sm text-zinc-400 space-y-2 list-disc pl-4">
                      <li>Check yourself and others for injuries.</li>
                      <li>Expect aftershocks. Each time one occurs, Drop, Cover, and Hold on.</li>
                      <li>Listen to local radio or emergency apps for updates.</li>
                      <li>Evacuate if the building is damaged or if authorities advise.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Landslide Section */}
              <section>
                <div className="flex items-center gap-2 text-amber-500 mb-4">
                  <Wind size={18} />
                  <h3 className="font-black uppercase tracking-tighter text-xl">Landslide Awareness</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700">
                    <h4 className="text-zinc-100 font-bold mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Warning Signs
                    </h4>
                    <ul className="text-sm text-zinc-400 space-y-2 list-disc pl-4">
                      <li>New cracks appearing in plaster, tile, brick, or foundations.</li>
                      <li>Doors or windows stick or jam for the first time.</li>
                      <li>Bulging ground at the base of a slope.</li>
                      <li>Sudden decrease or increase in water flow in streams.</li>
                    </ul>
                  </div>
                  <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700">
                    <h4 className="text-zinc-100 font-bold mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      Immediate Action
                    </h4>
                    <ul className="text-sm text-zinc-400 space-y-2 list-disc pl-4">
                      <li><strong className="text-zinc-200">Evacuate immediately</strong> if you suspect a landslide is imminent.</li>
                      <li>Stay alert and awake during intense rainfall.</li>
                      <li>Listen for unusual sounds like trees cracking or boulders knocking.</li>
                      <li>If you cannot escape, curl into a tight ball and protect your head.</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            <div className="p-6 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-500">
                <AlertCircle size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Source: Baguio CDRRMO</span>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-bold transition-all"
              >
                Understood
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
