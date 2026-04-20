import React, { useState } from 'react';
import { MeasurementProfile } from '../types/project';


interface Props {
  initialValues: MeasurementProfile;
  onUpdate: (measurements: MeasurementProfile) => void;
}

export const MeasurementForm: React.FC<Props> = ({ initialValues, onUpdate }) => {
  const [values, setValues] = useState<MeasurementProfile>(initialValues);

  const handleChange = (field: keyof MeasurementProfile, value: number) => {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);
    onUpdate(nextValues);
  };

  return (
    <div className="space-y-8">
      {(['height', 'chest', 'waist', 'hips', 'shoulderWidth', 'armLength'] as const).map((field) => (
        <div key={field} className="relative group">
          <div className="flex justify-between items-end mb-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-atelier-gold transition-colors">
              {field.replace(/([A-Z])/g, ' $1')}
            </label>
            <span className="text-lg font-serif italic text-atelier-ink">{values[field]}<span className="text-[10px] ml-1 not-italic font-sans font-bold text-slate-300">CM</span></span>
          </div>
          
          {/* Custom Razor-Thin Slider */}
          <div className="relative h-6 flex items-center">
            <div className="absolute w-full h-[1px] bg-slate-100 group-hover:bg-atelier-gold/20 transition-colors"></div>
            <input
              type="range"
              min={field === 'height' ? 140 : 30}
              max={field === 'height' ? 220 : 180}
              step={0.5}
              value={values[field]}
              onChange={(e) => handleChange(field, parseFloat(e.target.value))}
              className="absolute w-full appearance-none bg-transparent cursor-pointer z-10 
                         [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
                         [&::-webkit-slider-thumb]:bg-atelier-ink [&::-webkit-slider-thumb]:rounded-full 
                         [&::-webkit-slider-thumb]:hover:scale-150 [&::-webkit-slider-thumb]:transition-transform
                         [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
