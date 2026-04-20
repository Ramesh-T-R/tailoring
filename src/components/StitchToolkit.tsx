import React from 'react';
import { FabricProperty, PatternPiece } from '../types/project';

import { CheckCircle2, AlertCircle, Pipette, Zap, Ruler } from 'lucide-react';

interface Props {
  fabric: FabricProperty;
  pieces: PatternPiece[];
}

export const StitchToolkit: React.FC<Props> = ({ fabric, pieces }) => {
  const missingPieces = [
    !pieces.find(p => p.name.toLowerCase().includes('collar')) && 'Collar Lining',
    !pieces.find(p => p.name.toLowerCase().includes('cuff')) && 'Sleeve Cuffs',
    pieces.length < 3 && 'Core Pattern Set'
  ].filter(Boolean) as string[];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="bg-atelier-ink p-6 text-white flex justify-between items-center">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-atelier-gold mb-1">Stitching Protocol</h2>
          <p className="font-serif italic text-lg">{fabric.type} Workflow</p>
        </div>
        <Pipette className="text-atelier-gold opacity-50" size={24} />
      </div>

      <div className="p-8 space-y-8">
        {/* Tool Cards */}
        <div className="grid grid-cols-1 gap-4">
          {[
            { label: 'Precision Needle', value: fabric.recommendedNeedle, icon: <Zap size={14} /> },
            { label: 'Atelier Foot', value: fabric.recommendedFoot, icon: <Ruler size={14} /> },
            { label: 'Thread Selection', value: fabric.recommendedThread, icon: <Pipette size={14} /> }
          ].map((tool, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-atelier-paper rounded-xl border border-slate-50 group hover:border-atelier-gold/30 transition-colors">
              <div className="bg-white p-2 rounded-lg shadow-sm text-atelier-gold group-hover:scale-110 transition-transform">
                {tool.icon}
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{tool.label}</p>
                <p className="text-sm font-semibold text-slate-800">{tool.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Readiness Status */}
        <div className={`p-6 rounded-2xl border transition-all ${
          missingPieces.length > 0 
          ? 'bg-amber-50/50 border-amber-100 text-amber-900' 
          : 'bg-emerald-50/50 border-emerald-100 text-emerald-900'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            {missingPieces.length > 0 ? (
              <AlertCircle className="text-amber-500" size={20} />
            ) : (
              <CheckCircle2 className="text-emerald-500" size={20} />
            )}
            <h3 className="font-bold text-sm tracking-tight">
              {missingPieces.length > 0 ? 'Geometric Verification Pending' : 'Project Verified'}
            </h3>
          </div>
          
          {missingPieces.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs opacity-80 leading-relaxed">The following elements are missing from your current geometric blueprint:</p>
              <div className="flex flex-wrap gap-2">
                {missingPieces.map(item => (
                  <span key={item} className="px-2 py-1 bg-amber-100 rounded text-[10px] font-bold uppercase tracking-wider">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs opacity-80 leading-relaxed">All essential pattern pieces have been accounted for in the current projection.</p>
          )}
        </div>
      </div>
    </div>
  );
};
