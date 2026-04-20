import React from 'react';
import { PatternPiece, Vector2D } from '../../../types/project';

interface Props {
  pieces: PatternPiece[];
}

export const PatternCanvas: React.FC<Props> = ({ pieces }) => {
  const pointsToPath = (points: Vector2D[]) => {
    if (points.length === 0) return '';
    const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x * 4} ${p.y * 4}`).join(' ');
    return d + ' Z';
  };

  return (
    <div className="relative w-full h-[400px] bg-[#fdfdfd] overflow-hidden cursor-crosshair group">
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, 
          backgroundSize: '20px 20px' 
        }}>
      </div>
      
      <svg viewBox="0 0 1000 1000" className="w-full h-full relative z-10 p-10">
        <defs>
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
          </filter>
        </defs>
        
        {pieces.map((piece) => (
          <g key={piece.id} className="hover:opacity-80 transition-opacity">
            {/* Main Pattern Shape */}
            <path
              d={pointsToPath(piece.points)}
              fill="rgba(197, 160, 89, 0.05)"
              stroke="#c5a059"
              strokeWidth="1.5"
              strokeLinejoin="round"
              filter="url(#shadow)"
            />
            {/* Technical Detail Lines */}
            <path
              d={pointsToPath(piece.points)}
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="0.5"
              strokeDasharray="4,4"
              opacity="0.3"
            />
            
            {/* Label */}
            <g transform={`translate(${piece.points[0]?.x * 4 || 0}, ${piece.points[0]?.y * 4 - 15 || 0})`}>
              <text 
                className="text-[10px] fill-atelier-ink font-bold uppercase tracking-widest"
              >
                {piece.name}
              </text>
              <text 
                y="12"
                className="text-[8px] fill-slate-400 font-medium"
              >
                Parametric Piece ID: {piece.id}
              </text>
            </g>
          </g>
        ))}
      </svg>
      
      {/* Corner Accents */}
      <div className="absolute top-4 left-4 border-l border-t border-slate-200 w-8 h-8"></div>
      <div className="absolute bottom-4 right-4 border-r border-b border-slate-200 w-8 h-8"></div>
    </div>
  );
};
