import { lessons } from '../data/lessons';

// Utility to generate a 10-question MCQ quiz
export const generateQuiz = (categoryFilter = null) => {
  // Filter by category if one is provided
  const sourceLessons = categoryFilter 
    ? lessons.filter(l => l.category === categoryFilter)
    : [...lessons];
    
  if (sourceLessons.length < 4) {
    // If a category has fewer than 4 items, we can't generate 3 distractors safely.
    // Fallback to the whole list.
    return generateQuiz(null);
  }

  // Randomly select 10 unique target lessons (or less if the pool is small)
  const shuffledSource = [...sourceLessons].sort(() => 0.5 - Math.random());
  const numQuestions = Math.min(10, shuffledSource.length);
  const targetLessons = shuffledSource.slice(0, numQuestions);

  const questions = targetLessons.map(target => {
    // Determine direction randomly: English -> Tamil OR Tamil -> English
    const isEnglishToTamil = Math.random() > 0.5;
    const questionText = isEnglishToTamil
      ? `What is the Tamil meaning of "${target.english}"?`
      : `What is the English meaning of "${target.tamil}"?`;
      
    const correctAnswer = isEnglishToTamil ? target.tamil : target.english;

    // Get 3 distractors from the rest of the lessons
    const distractorsPool = sourceLessons.filter(l => l.id !== target.id);
    const shuffledDistractors = distractorsPool.sort(() => 0.5 - Math.random());
    
    const distractorAnswers = shuffledDistractors.slice(0, 3).map(d => 
      isEnglishToTamil ? d.tamil : d.english
    );

    // Combine correct answer and distractors, then shuffle them
    const options = [correctAnswer, ...distractorAnswers].sort(() => 0.5 - Math.random());

    return {
      id: target.id,
      question: questionText,
      options: options,
      correctAnswer: correctAnswer,
      originalLesson: target
    };
  });

  return questions;
};
