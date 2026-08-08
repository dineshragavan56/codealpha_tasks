import React, { useState, useEffect } from 'react';
import { BookOpen, Flame, Award, AlertTriangle } from 'lucide-react';
import { getProgress, resetProgress } from '../utils/storage';
import { lessons } from '../data/lessons';
import CircularProgress from '../components/common/CircularProgress';
import ProgressBar from '../components/common/ProgressBar';
import ConfirmModal from '../components/common/ConfirmModal';
import Button from '../components/common/Button';
import '../styles/progress.css';

const Progress = () => {
  const [progress, setProgress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadData = () => {
    setProgress(getProgress());
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!progress) return null;

  const totalWords = lessons.length;
  const learnedCount = progress.learnedWordIds.length;
  const progressPercent = Math.round((learnedCount / totalWords) * 100) || 0;

  const handleResetConfirm = () => {
    resetProgress();
    loadData(); // reload empty state
    setIsModalOpen(false);
  };

  return (
    <div className="progress-page animate-fade-in">
      <h1 className="mb-lg">Your Progress</h1>

      <div className="progress-dashboard">
        {/* Large Circular Progress */}
        <div className="circular-stat-card" style={{ background: 'var(--color-bg-card)', borderRadius: '16px', boxShadow: 'var(--shadow-soft)' }}>
          <h3 className="mb-md">Overall Mastery</h3>
          <CircularProgress progress={progressPercent} size={150} strokeWidth={12} />
          <p className="text-muted mt-md text-center">
            You have mastered {learnedCount} out of {totalWords} words!
          </p>
        </div>

        {/* Small Stat Grid */}
        <div className="stat-grid-small">
          <div className="stat-box">
            <div className="stat-box-icon"><BookOpen size={24} /></div>
            <div className="stat-box-content">
              <h4>Words Learned</h4>
              <p>{learnedCount}</p>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-box-icon" style={{ background: 'rgba(255, 77, 77, 0.1)', color: 'var(--color-danger)' }}>
              <Flame size={24} />
            </div>
            <div className="stat-box-content">
              <h4>Lessons Completed</h4>
              <p>{progress.completedLessons}</p>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-box-icon" style={{ background: 'rgba(124, 92, 255, 0.1)', color: 'var(--color-accent)' }}>
              <Award size={24} />
            </div>
            <div className="stat-box-content">
              <h4>Best Quiz Score</h4>
              <p>{progress.bestQuizScore}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Goal Bar */}
      <div style={{ background: 'var(--color-bg-card)', padding: '24px', borderRadius: '16px', boxShadow: 'var(--shadow-soft)' }}>
        <ProgressBar 
          progress={(progress.completedLessons / 10) * 100} 
          label="Long Term Goal (10 Lessons)" 
          color="var(--color-success)"
          height="12px"
        />
      </div>

      {/* Danger Zone */}
      <div className="danger-zone">
        <h3><AlertTriangle size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }}/> Danger Zone</h3>
        <p>This will erase all your learning history, quiz scores, and saved progress. This action cannot be undone.</p>
        <Button variant="danger" onClick={() => setIsModalOpen(true)}>Reset All Progress</Button>
      </div>

      <ConfirmModal 
        isOpen={isModalOpen}
        title="Are you sure?"
        message="This will completely reset your progress. You cannot undo this action."
        onConfirm={handleResetConfirm}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Progress;
