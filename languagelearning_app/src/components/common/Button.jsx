import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger'
  size = 'md',         // 'sm' | 'md' | 'lg'
  onClick, 
  disabled = false,
  className = '',
  ...props 
}) => {
  // Duolingo 3D Button Style
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: '16px', // Chunky rounded rect
    fontWeight: '800',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
    transition: 'transform 0.1s, box-shadow 0.1s, background-color 0.2s',
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    position: 'relative',
    border: 'none',
  };

  const sizes = {
    sm: { padding: '10px 16px', fontSize: '14px' },
    md: { padding: '12px 24px', fontSize: '15px' },
    lg: { padding: '16px 32px', fontSize: '16px', width: '100%' },
  };

  const variants = {
    primary: {
      background: 'var(--color-primary)',
      color: '#fff',
      boxShadow: disabled ? 'none' : '0 4px 0 var(--color-primary-dark)',
    },
    secondary: {
      background: 'var(--color-secondary)',
      color: '#fff',
      boxShadow: disabled ? 'none' : '0 4px 0 var(--color-secondary-dark)',
    },
    outline: {
      background: '#fff',
      color: 'var(--color-secondary)',
      border: '2px solid var(--color-border)',
      boxShadow: disabled ? 'none' : '0 4px 0 var(--color-border)',
    },
    danger: {
      background: 'var(--color-danger)',
      color: '#fff',
      boxShadow: disabled ? 'none' : '0 4px 0 var(--color-danger-dark)',
    }
  };

  const handleMouseDown = (e) => {
    if (!disabled) {
      e.currentTarget.style.transform = 'translateY(4px)';
      e.currentTarget.style.boxShadow = '0 0 0 transparent';
    }
  };

  const handleMouseUp = (e) => {
    if (!disabled) {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = variants[variant].boxShadow;
    }
  };

  return (
    <button
      style={{ ...baseStyle, ...sizes[size], ...variants[variant] }}
      className={`btn-component ${className}`}
      onClick={onClick}
      disabled={disabled}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
