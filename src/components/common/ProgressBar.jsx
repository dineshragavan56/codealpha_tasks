import React from 'react';

// Duolingo-style thick progress bar with shine
const ProgressBar = ({ progress = 0, label = '', height = '16px', color = 'var(--color-primary)' }) => {
  const safeProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div style={{ width: '100%' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '16px', fontWeight: '800' }}>
          <span>{label}</span>
          <span style={{ color: color }}>{Math.round(safeProgress)}%</span>
        </div>
      )}
      <div style={{ 
        width: '100%', 
        height: height, 
        backgroundColor: 'var(--color-border)', 
        borderRadius: '9999px',
        overflow: 'hidden'
      }}>
        <div style={{ 
          height: '100%', 
          width: `${safeProgress}%`, 
          backgroundColor: color,
          transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: '9999px',
          position: 'relative'
        }}>
          {/* Shine effect inside the fill */}
          <div style={{
            position: 'absolute',
            top: '4px',
            left: '10px',
            right: '10px',
            height: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '4px'
          }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
