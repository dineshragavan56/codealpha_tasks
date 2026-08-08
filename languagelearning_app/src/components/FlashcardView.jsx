import React, { useState, useEffect } from 'react';
import '../styles/flashcards.css';
import Button from './common/Button';

import { speakText } from '../utils/audio';
import { Volume2 } from 'lucide-react';

const FlashcardView = ({ cardData, isLearned, onMarkLearned }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [cardData]);

  if (!cardData) return null;

  const handleSpeak = (e) => {
    e.stopPropagation();
    speakText(cardData.english);
  };

  return (
    <div className="flashcard-container">
      <div 
        className={`flashcard ${isFlipped ? 'flipped' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of Card (English) */}
        <div className="flashcard-front">
          <span className="category-badge">{cardData.category}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 'var(--spacing-md)' }}>
            <h2 className="english-word" style={{ margin: 0 }}>{cardData.english}</h2>
            <button 
              onClick={handleSpeak}
              style={{
                background: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 0 var(--color-primary-dark)',
                cursor: 'pointer'
              }}
            >
              <Volume2 size={24} />
            </button>
          </div>
          <p className="flip-hint">TAP TO FLIP</p>
        </div>

        {/* Back of Card (Tamil & Details) */}
        <div className="flashcard-back">
          <h2 className="tamil-word">{cardData.tamil}</h2>
          <p className="pronunciation">🗣 {cardData.pronunciation}</p>
          <div className="example-box">
            <p>"{cardData.example}"</p>
          </div>
          
          <div className="action-row" onClick={(e) => e.stopPropagation()}>
            <Button 
              size="sm"
              variant={isLearned ? "outline" : "primary"}
              onClick={(e) => { e.stopPropagation(); onMarkLearned(cardData.id); }}
            >
              {isLearned ? 'LEARNED' : 'MARK LEARNED'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardView;
