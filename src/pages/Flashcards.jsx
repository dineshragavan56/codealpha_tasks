import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { lessons } from '../data/lessons';
import { getProgress, markWordLearned } from '../utils/storage';
import FlashcardView from '../components/FlashcardView';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';

const Flashcards = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse category from URL query parameters (e.g. ?category=vocabulary)
  const queryParams = new URLSearchParams(location.search);
  const categoryFilter = queryParams.get('category');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnedIds, setLearnedIds] = useState([]);

  // Load learned IDs on mount
  useEffect(() => {
    setLearnedIds(getProgress().learnedWordIds);
  }, []);

  // Filter lessons based on category
  const filteredLessons = useMemo(() => {
    if (categoryFilter) {
      return lessons.filter(l => l.category === categoryFilter);
    }
    return lessons;
  }, [categoryFilter]);

  if (filteredLessons.length === 0) {
    return (
      <div className="text-center mt-xl">
        <h2>No cards found in this category.</h2>
        <Button className="mt-md" onClick={() => navigate('/categories')}>Go Back</Button>
      </div>
    );
  }

  const currentCard = filteredLessons[currentIndex];
  const isLearned = learnedIds.includes(currentCard.id);

  const handleMarkLearned = (id) => {
    markWordLearned(id);
    if (!learnedIds.includes(id)) {
      setLearnedIds([...learnedIds, id]);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredLessons.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const progressPercent = ((currentIndex + 1) / filteredLessons.length) * 100;

  return (
    <div className="flashcards-page animate-fade-in">
      <div className="deck-header">
        <h2 style={{ textTransform: 'capitalize' }}>
          {categoryFilter ? categoryFilter : 'All Cards'}
        </h2>
        <span className="text-muted">Card {currentIndex + 1} of {filteredLessons.length}</span>
      </div>

      <div style={{ width: '100%', maxWidth: '500px', marginBottom: '24px' }}>
         <ProgressBar progress={progressPercent} height="6px" />
      </div>

      <FlashcardView 
        cardData={currentCard} 
        isLearned={isLearned} 
        onMarkLearned={handleMarkLearned} 
      />

      <div className="deck-controls">
        <Button 
          variant="secondary" 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
        >
          <ArrowLeft size={20} /> Previous
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={currentIndex === filteredLessons.length - 1}
        >
          Next <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Flashcards;
