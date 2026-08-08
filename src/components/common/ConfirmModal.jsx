import React from 'react';
import Button from './Button';

// A simple confirmation modal overlay
const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999
    }}>
      <div className="animate-fade-in" style={{
        backgroundColor: '#fff',
        padding: '24px',
        borderRadius: '16px',
        maxWidth: '400px',
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <h3 style={{ marginTop: 0 }}>{title}</h3>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>{message}</p>
        
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm}>Yes, Reset</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
