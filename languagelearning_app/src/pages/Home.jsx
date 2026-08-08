import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, MessageSquare, PenTool, Star } from 'lucide-react';
import { getProgress } from '../utils/storage';
import '../styles/home.css';

const Home = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    setProgress(getProgress());
    
    // Listen for storage updates
    const handleUpdate = () => setProgress(getProgress());
    window.addEventListener('wordwise_progress_updated', handleUpdate);
    return () => window.removeEventListener('wordwise_progress_updated', handleUpdate);
  }, []);

  if (!progress) return null;

  const completed = progress.completedCategories || [];

  // Determine locking based on progression
  // Basics 1 is always unlocked.
  // Greetings unlocks if Basics 1 ('vocabulary') is completed.
  // Grammar unlocks if Greetings ('phrases') is completed.
  // Review unlocks if Grammar ('grammar') is completed.
  
  const pathNodes = [
    { id: 'vocabulary', label: 'Basics 1', icon: <Book size={36} />, color: 'primary', isLocked: false },
    { id: 'phrases', label: 'Greetings', icon: <MessageSquare size={36} />, color: 'blue', isLocked: !completed.includes('vocabulary') },
    { id: 'grammar', label: 'Grammar', icon: <PenTool size={36} />, color: 'gold', isLocked: !completed.includes('phrases') },
    { id: 'checkpoint1', label: 'Review', icon: <Star size={36} />, color: 'locked', isLocked: !completed.includes('grammar') },
  ];

  // The active node is the first one that is NOT completed, OR the last node if all are completed.
  const activeIndex = pathNodes.findIndex(n => !completed.includes(n.id)) !== -1 
    ? pathNodes.findIndex(n => !completed.includes(n.id))
    : pathNodes.length - 1;

  return (
    <div className="home-page animate-fade-in">
      
      <div className="learning-path">
        <div className="path-line"></div>
        
        {pathNodes.map((node, index) => {
          const isActive = index === activeIndex;

          return (
            <div key={node.id} className="path-node-wrapper">
              {isActive && !node.isLocked && (
                <div className="start-tooltip">Start</div>
              )}
              
              <button 
                className={`path-button ${node.isLocked ? 'locked' : node.color}`}
                onClick={() => {
                  if (!node.isLocked) {
                    navigate(`/flashcards?category=${node.id}`);
                  }
                }}
              >
                {node.icon}
              </button>
              <h3 className="node-label" style={{ color: node.isLocked ? 'var(--color-text-muted)' : 'var(--color-text-main)' }}>
                {node.label}
              </h3>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Home;
