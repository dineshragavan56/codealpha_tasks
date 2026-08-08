import React from 'react';

// Pure SVG circular progress indicator
const CircularProgress = ({ progress = 0, size = 120, strokeWidth = 10, color = "var(--color-primary)" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const safeProgress = Math.min(100, Math.max(0, progress));
  const offset = circumference - (safeProgress / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg width={size} height={size}>
        {/* Background Circle */}
        <circle
          stroke="var(--color-border)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Foreground Progress Circle */}
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 0.8s ease-out' }}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`} // Start from top
        />
      </svg>
      {/* Center Text */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column'
      }}>
        <span style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-text-main)' }}>
          {Math.round(safeProgress)}%
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;
