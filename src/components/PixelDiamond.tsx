import React from 'react';

export const PixelDiamond: React.FC = () => {
  // Rows corresponding to diamond shape: [1, 3, 5, 7, 5, 3, 1]
  const rows = [
    [0.7],
    [0.6, 0.9, 0.6],
    [0.4, 0.8, 1.0, 0.8, 0.4],
    [0.3, 0.7, 0.95, 1.0, 0.95, 0.7, 0.3],
    [0.4, 0.8, 1.0, 0.8, 0.4],
    [0.6, 0.9, 0.6],
    [0.7],
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-1.5 p-4 select-none group">
      {rows.map((row, rIdx) => (
        <div key={rIdx} className="flex items-center gap-1.5">
          {row.map((intensity, cIdx) => (
            <div
              key={cIdx}
              className="w-2.5 h-4 sm:w-3 sm:h-5 rounded-[4px] transition-all duration-300 group-hover:scale-105"
              style={{
                backgroundColor: intensity > 0.8 ? '#f87171' : intensity > 0.5 ? '#ef4444' : '#991b1b',
                opacity: 0.25 + intensity * 0.75,
                boxShadow: intensity > 0.8 ? '0 0 12px rgba(239, 68, 68, 0.6)' : 'none',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
