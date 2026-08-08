import React, { useState, useEffect } from 'react';
import { Flame, Diamond, Heart } from 'lucide-react';
import { getProgress } from '../../utils/storage';
import '../../styles/layout.css';

const TopBar = () => {
  const [progress, setProgress] = useState(getProgress());

  useEffect(() => {
    const handleUpdate = () => {
      setProgress(getProgress());
    };
    
    window.addEventListener('wordwise_progress_updated', handleUpdate);
    return () => window.removeEventListener('wordwise_progress_updated', handleUpdate);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-item flag-item">
        <span style={{ fontSize: '24px' }}>🇬🇧</span>
      </div>
      
      <div className="topbar-item streak-item">
        <Flame fill={progress.streak > 0 ? "var(--color-accent)" : "none"} color="var(--color-accent-dark)" size={24} />
        <span className="topbar-text streak-text">{progress.streak}</span>
      </div>
      
      <div className="topbar-item gems-item">
        <Diamond fill="var(--color-secondary)" color="var(--color-secondary-dark)" size={24} />
        <span className="topbar-text gems-text">{progress.gems}</span>
      </div>
      
      <div className="topbar-item hearts-item">
        <Heart fill={progress.hearts > 0 ? "var(--color-danger)" : "none"} color="var(--color-danger-dark)" size={24} />
        <span className="topbar-text hearts-text">{progress.hearts}</span>
      </div>
    </header>
  );
};

export default TopBar;
