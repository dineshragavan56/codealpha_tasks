import React from 'react';

const Card = ({ children, className = '', hoverable = false, onClick }) => {
  const style = {
    background: 'var(--color-bg-card)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-soft)',
    padding: 'var(--spacing-lg)',
    transition: 'all 0.3s ease',
    cursor: hoverable || onClick ? 'pointer' : 'default',
  };

  return (
    <div 
      style={style} 
      className={`card ${hoverable ? 'hoverable-card' : ''} ${className}`}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (hoverable || onClick) {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable || onClick) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
        }
      }}
    >
      {children}
    </div>
  );
};

export default Card;
