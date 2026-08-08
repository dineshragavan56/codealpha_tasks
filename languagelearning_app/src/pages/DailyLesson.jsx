import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { lessons } from '../data/lessons';
import { getProgress, incrementCompletedLessons, markWordLearned } from '../utils/storage';
import FlashcardView from '../components/FlashcardView';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';

const DailyLesson = () => {
  const navigate = useNavigate();
  const [dailyCards, setDailyCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnedIds, setLearnedIds] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const progress = getProgress();
    setLearnedIds(progress.learnedWordIds);
    
    // Pick 5 cards that haven't been learned yet (or just the first 5 if all learned)
    const unlearned = lessons.filter(l => !progress.learnedWordIds.includes(l.id));
    
    let selected = [];
    if (unlearned.length >= 5) {
      selected = unlearned.slice(0, 5);
    } else {
      // Not enough unlearned words, mix in some learned ones
      selected = [...unlearned, ...lessons].slice(0, 5);
    }
    
    setDailyCards(selected);
  }, []);

  if (dailyCards.length === 0) return null;

  const currentCard = dailyCards[currentIndex];
  const isLearned = learnedIds.includes(currentCard.id);

  const handleMarkLearned = (id) => {
    markWordLearned(id);
    if (!learnedIds.includes(id)) {
      setLearnedIds([...learnedIds, id]);
    }
  };

  const handleNext = () => {
    if (currentIndex < dailyCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Finished the daily lesson!
      incrementCompletedLessons();
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="flashcards-page animate-fade-in">
        <div className="lesson-complete-card">
          <div className="confetti-icon">🎉</div>
          <h2>Great job!</h2>
          <p className="text-muted mb-lg">You've completed today's lesson.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Button size="lg" onClick={() => navigate('/quiz')}>Take a Quiz</Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  const progressPercent = (currentIndex / dailyCards.length) * 100;

  return (
    <div className="flashcards-page animate-fade-in">
      <div className="deck-header">
        <h2>Daily Lesson</h2>
        <span className="text-muted">Card {currentIndex + 1} of 5</span>
      </div>

      <div style={{ width: '100%', maxWidth: '500px', marginBottom: '24px' }}>
         <ProgressBar progress={progressPercent} height="6px" />
      </div>

      <FlashcardView 
        cardData={currentCard} 
        isLearned={isLearned} 
        onMarkLearned={handleMarkLearned} 
      />

      <div className="deck-controls mt-lg">
        <Button onClick={handleNext} size="lg">
          {currentIndex === dailyCards.length - 1 ? 'Finish Lesson' : 'Next Card'}
        </Button>
      </div>
    </div>
  );
};

export default DailyLesson;
