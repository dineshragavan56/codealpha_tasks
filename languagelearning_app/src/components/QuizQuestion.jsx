import React, { useState, useEffect } from 'react';
import { speakText } from '../utils/audio';
import { Volume2 } from 'lucide-react';
import '../styles/quiz.css';
import Button from './common/Button';

// A single multiple choice question component with a drawer
const QuizQuestion = ({ questionData, questionIndex, totalQuestions, onNext }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
  }, [questionData]);

  if (!questionData) return null;

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleCheck = () => {
    if (!selectedOption) return;
    setIsAnswered(true);
  };

  const isCorrect = selectedOption === questionData.correctAnswer;
  const progressPercent = (questionIndex / totalQuestions) * 100;

  return (
    <div className="quiz-question-container animate-fade-in">
      
      {/* Top Rounded Progress Bar */}
      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${progressPercent}%` }}></div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 'var(--spacing-xxl)' }}>
        <button 
          onClick={() => speakText(questionData.question)}
          style={{
            background: 'var(--color-secondary)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 0 var(--color-secondary-dark)',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          <Volume2 size={20} />
        </button>
        <h2 className="question-text" style={{ margin: 0 }}>{questionData.question}</h2>
      </div>

      <div className="options-grid">
        {questionData.options.map((option, idx) => {
          let btnClass = "quiz-option-btn";
          
          if (isAnswered) {
            // After checking
            if (option === questionData.correctAnswer) {
              btnClass += " correct";
            } else if (option === selectedOption) {
              btnClass += " incorrect";
            }
          } else {
            // Before checking, just highlight selection
            if (option === selectedOption) {
              btnClass += " selected";
            }
          }

          return (
            <button 
              key={idx}
              className={btnClass}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswered}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Floating Bottom Action Area */}
      {!isAnswered ? (
        <div style={{ position: 'fixed', bottom: 0, left: 'var(--navbar-width, 0)', width: '100%', padding: '24px', background: '#fff', borderTop: '2px solid var(--color-border)', zIndex: 90 }}>
          <Button 
            size="lg" 
            variant="primary"
            disabled={!selectedOption} 
            onClick={handleCheck}
            style={{ maxWidth: '800px', margin: '0 auto', display: 'block' }}
          >
            Check
          </Button>
        </div>
      ) : (
        /* Sliding Feedback Drawer */
        <div className={`feedback-drawer ${isCorrect ? 'correct-drawer' : 'incorrect-drawer'}`}>
          <div>
            <h2>{isCorrect ? 'Excellent!' : 'Correct solution:'}</h2>
            {!isCorrect && <p>{questionData.correctAnswer}</p>}
          </div>
          <Button 
            size="lg" 
            variant={isCorrect ? "primary" : "danger"} 
            onClick={() => onNext(isCorrect)}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
