import React, { useState } from 'react';
import { Gender } from '../../../types/project';
import { X, ArrowRight, User, Shirt, Maximize } from 'lucide-react';

interface Props {
  onCancel: () => void;
  onGenerate: (config: { gender: Gender, dressType: string, size: string }) => void;
}

export const ProjectSetup: React.FC<Props> = ({ onCancel, onGenerate }) => {
  const [gender, setGender] = useState<Gender>('Male');
  const [dressType, setDressType] = useState('Formal Shirt');
  const [size, setSize] = useState('M');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-atelier-paper/80 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="w-full max-w-2xl bg-white rounded-[40px] shadow-2xl shadow-black/10 border border-white overflow-hidden flex flex-col animate-in zoom-in-95 duration-500">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <div>
            <h2 className="font-serif text-3xl text-atelier-ink">Initialize Project</h2>
            <p className="text-xs font-bold uppercase tracking-widest text-atelier-gold mt-1">Scientific Configuration</p>
          </div>
          <button onClick={onCancel} className="p-3 hover:bg-slate-50 rounded-full transition-colors">
            <X size={24} className="text-slate-300" />
          </button>
        </div>

        <div className="p-10 space-y-12">
          {/* Gender Select */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <User size={16} className="text-atelier-gold" />
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Gender Profile</h3>
            </div>
            <div className="flex gap-4">
              {(['Male', 'Female', 'Other'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex-1 py-4 rounded-2xl border-2 transition-all font-bold text-sm ${
                    gender === g 
                    ? 'bg-atelier-ink text-white border-atelier-ink shadow-lg shadow-black/20' 
                    : 'bg-white text-slate-400 border-slate-100 hover:border-atelier-gold/30'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </section>

          {/* Dress Type */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Shirt size={16} className="text-atelier-gold" />
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Apparel Category</h3>
            </div>
            <div className="relative">
              <select 
                value={dressType}
                onChange={(e) => setDressType(e.target.value)}
                className="w-full p-5 bg-slate-50 border-none rounded-2xl appearance-none outline-none font-serif italic text-xl text-atelier-ink cursor-pointer focus:ring-2 focus:ring-atelier-gold/20 transition-all"
              >
                <option value="Formal Shirt">Bespoke Formal Shirt</option>
                <option value="Trousers">Tailored Trousers</option>
                <option value="Skirt">Pencil Skirt</option>
                <option value="Jacket">Structured Jacket</option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-atelier-gold">
                ▼
              </div>
            </div>
          </section>

          {/* Size Select */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Maximize size={16} className="text-atelier-gold" />
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Standard Size Reference</h3>
            </div>
            <div className="flex gap-4">
              {(['S', 'M', 'L', 'XL'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-16 h-16 rounded-2xl border-2 transition-all font-serif italic text-xl flex items-center justify-center ${
                    size === s 
                    ? 'bg-atelier-gold text-white border-atelier-gold shadow-lg shadow-atelier-gold/20' 
                    : 'bg-white text-slate-400 border-slate-100 hover:border-atelier-gold/30'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="p-8 bg-slate-50 mt-auto flex justify-end">
          <button 
            onClick={() => onGenerate({ gender, dressType, size })}
            className="group flex items-center gap-4 bg-atelier-ink text-white px-10 py-5 rounded-full font-bold text-xs tracking-[0.2em] uppercase hover:scale-105 transition-all shadow-xl shadow-black/10"
          >
            Generate Workspace <ArrowRight size={18} className="text-atelier-gold group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
