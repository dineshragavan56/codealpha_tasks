// LocalStorage key for saving all progress
const STORAGE_KEY = 'wordwise_progress';

// Default state if nothing is saved yet
const defaultProgress = {
  learnedWordIds: [],          // array of lesson ids marked "Learned"
  completedLessons: 0,         // count of completed Daily Lessons
  bestQuizScore: 0,            // percentage, 0–100
  latestQuizScore: 0,          // percentage of the last quiz
  dailyGoal: 5,                // words/day target
  
  // Professional Mechanics
  lastLoginDate: null,         // YYYY-MM-DD
  streak: 0,
  gems: 100,                   // Starting gems
  hearts: 5,                   // Max 5 hearts
  
  // Progress tracking per level
  completedCategories: [],     // Array of category IDs that have been passed
};

// Helpers for date checking
const getTodayString = () => new Date().toISOString().split('T')[0];

const calculateStreak = (lastDate, currentStreak) => {
  if (!lastDate) return 1;
  const today = new Date();
  const last = new Date(lastDate);
  const diffTime = Math.abs(today - last);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  if (diffDays === 0 || diffDays === 1) return currentStreak; // same day
  if (diffDays === 2) return currentStreak + 1; // next day
  return 1; // missed a day
};

// Load saved progress from LocalStorage when the app starts
export const getProgress = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    let progress = saved ? { ...defaultProgress, ...JSON.parse(saved) } : { ...defaultProgress };
    
    // Auto-update streak and hearts on load
    const today = getTodayString();
    if (progress.lastLoginDate !== today) {
      progress.streak = calculateStreak(progress.lastLoginDate, progress.streak);
      progress.lastLoginDate = today;
      progress.hearts = 5; // Refill hearts daily
      saveProgress(progress);
    }
    return progress;
  } catch (error) {
    console.error("Failed to load progress:", error);
  }
  return { ...defaultProgress };
};

// Helper to save data back to LocalStorage
export const saveProgress = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event('wordwise_progress_updated'));
  } catch (error) {
    console.error("Failed to save progress:", error);
  }
};

// Gamification updaters
export const updateGems = (amount) => {
  const progress = getProgress();
  progress.gems = Math.max(0, progress.gems + amount);
  saveProgress(progress);
};

export const updateHearts = (amount) => {
  const progress = getProgress();
  progress.hearts = Math.max(0, Math.min(5, progress.hearts + amount));
  saveProgress(progress);
};

export const markCategoryCompleted = (categoryId) => {
  const progress = getProgress();
  if (!progress.completedCategories.includes(categoryId)) {
    progress.completedCategories.push(categoryId);
    saveProgress(progress);
  }
};

// Add a word ID to the learned array if it isn't already there
export const markWordLearned = (id) => {
  const progress = getProgress();
  if (!progress.learnedWordIds.includes(id)) {
    progress.learnedWordIds.push(id);
    saveProgress(progress);
  }
};

// Mark a daily lesson as complete and record the date
export const incrementCompletedLessons = () => {
  const progress = getProgress();
  progress.completedLessons += 1;
  saveProgress(progress);
};

// Update quiz scores after a quiz ends
export const updateQuizScore = (scorePercentage) => {
  const progress = getProgress();
  progress.latestQuizScore = scorePercentage;
  if (scorePercentage > progress.bestQuizScore) {
    progress.bestQuizScore = scorePercentage;
  }
  saveProgress(progress);
};

// Clear all LocalStorage data and reset the app
export const resetProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to reset progress:", error);
  }
};
