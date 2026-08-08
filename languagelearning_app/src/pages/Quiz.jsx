import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { generateQuiz } from '../utils/quizGenerator';
import { updateQuizScore, getProgress, updateGems, updateHearts, markCategoryCompleted } from '../utils/storage';
import QuizQuestion from '../components/QuizQuestion';
import Button from '../components/common/Button';
import '../styles/quiz.css';

const Quiz = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || null;

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [newRecord, setNewRecord] = useState(false);
  const [failed, setFailed] = useState(false);

  const startQuiz = () => {
    // Check if they have hearts before starting
    const currentProgress = getProgress();
    if (currentProgress.hearts <= 0) {
      setFailed(true);
      return;
    }

    const qList = generateQuiz(category); 
    setQuestions(qList);
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setNewRecord(false);
    setFailed(false);
  };

  useEffect(() => {
    startQuiz();
  }, [category]);

  const handleNext = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    } else {
      updateHearts(-1);
      const progress = getProgress();
      if (progress.hearts <= 0) {
        setFailed(true);
        return;
      }
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishQuiz(isCorrect ? score + 1 : score);
    }
  };

  const finishQuiz = (finalScore) => {
    const finalScorePercentage = Math.round((finalScore / questions.length) * 100);
    const currentProgress = getProgress();
    
    if (finalScorePercentage > currentProgress.bestQuizScore) {
      setNewRecord(true);
    }
    
    updateQuizScore(finalScorePercentage);
    
    // Gamification Rewards
    if (finalScorePercentage >= 70) {
      updateGems(10); // Reward for passing
      if (category) {
        markCategoryCompleted(category); // Unlock next level
      }
    }

    setIsFinished(true);
  };

  if (failed) {
    return (
      <div className="quiz-page animate-fade-in" style={{ justifyContent: 'center' }}>
        <div className="quiz-results">
          <h2 style={{ fontSize: '32px', color: 'var(--color-danger)' }}>Out of Hearts! ❤️💔</h2>
          <p className="text-muted mb-lg" style={{ fontSize: '20px', fontWeight: 'bold' }}>
            You need to wait for tomorrow for your hearts to refill, or practice to earn more! (For now, you can keep practicing on the home page).
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', margin: '0 auto' }}>
            <Button variant="outline" size="lg" onClick={() => navigate('/')}>Return Home</Button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) return null;

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;
    
    return (
      <div className="quiz-page animate-fade-in" style={{ justifyContent: 'center' }}>
        <div className="quiz-results">
          {newRecord && <h3 style={{ color: 'var(--color-accent)', marginBottom: '16px' }}>🌟 NEW RECORD 🌟</h3>}
          <h2 style={{ fontSize: '32px' }}>{passed ? 'Lesson Complete!' : 'Keep Practicing!'}</h2>
          <div className="score-display">{percentage}%</div>
          <p className="text-muted mb-lg" style={{ fontSize: '20px', fontWeight: 'bold' }}>
            You got {score} correct out of {questions.length}.
          </p>
          
          {passed && (
            <p style={{ color: 'var(--color-secondary)', fontWeight: 'bold', fontSize: '18px', marginBottom: '24px' }}>
              +10 Gems 💎
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', margin: '0 auto' }}>
            <Button size="lg" onClick={startQuiz}>Try Again</Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/')}>Continue</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <QuizQuestion 
        questionData={questions[currentIndex]} 
        questionIndex={currentIndex}
        totalQuestions={questions.length}
        onNext={handleNext}
      />
    </div>
  );
};

export default Quiz;
