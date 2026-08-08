import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, MessageSquare, PenTool } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { lessons } from '../data/lessons';
import '../styles/categories.css';

const Categories = () => {
  const navigate = useNavigate();

  // Helper to count lessons per category
  const getCount = (cat) => lessons.filter(l => l.category === cat).length;

  const categoriesData = [
    {
      id: 'vocabulary',
      title: 'Vocabulary',
      description: 'Learn common English words, objects, and everyday nouns.',
      icon: <Book size={24} />,
      iconClass: 'icon-vocab',
      count: getCount('vocabulary')
    },
    {
      id: 'phrases',
      title: 'Phrases',
      description: 'Essential conversational sentences and common greetings.',
      icon: <MessageSquare size={24} />,
      iconClass: 'icon-phrases',
      count: getCount('phrases')
    },
    {
      id: 'grammar',
      title: 'Grammar',
      description: 'Basic rules, pronouns, and sentence structuring.',
      icon: <PenTool size={24} />,
      iconClass: 'icon-grammar',
      count: getCount('grammar')
    }
  ];

  return (
    <div className="animate-fade-in">
      <h1>Study Categories</h1>
      <p className="text-muted">Choose a specific topic to focus your learning.</p>

      <div className="categories-grid">
        {categoriesData.map(cat => (
          <Card key={cat.id} hoverable onClick={() => navigate(`/flashcards?category=${cat.id}`)}>
            <div className={`category-icon-wrapper ${cat.iconClass}`}>
              {cat.icon}
            </div>
            <h3 className="category-title">{cat.title}</h3>
            <p className="category-desc">{cat.description}</p>
            
            <div className="category-footer">
              <span className="lesson-count">{cat.count} items</span>
              <Button size="sm">Start</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Categories;
