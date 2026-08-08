import { NavLink } from 'react-router-dom';
import { Book, Layers, CalendarCheck, HelpCircle, BarChart2, Home } from 'lucide-react';
import '../../styles/layout.css';

// Navbar is now the Desktop Left Sidebar
const Navbar = () => {
  return (
    <aside className="desktop-sidebar">
      <div className="logo flex items-center gap-sm">
        <Book size={32} color="var(--color-primary)" />
        <h2 style={{ margin: 0, color: 'var(--color-primary)', letterSpacing: '1px' }}>Language Learning App</h2>
      </div>
      
      <nav className="nav-links-vertical">
        <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
          <Home size={28} /> <span>LEARN</span>
        </NavLink>
        <NavLink to="/categories" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
          <Layers size={28} /> <span>TOPICS</span>
        </NavLink>
        <NavLink to="/flashcards" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
          <Book size={28} /> <span>CARDS</span>
        </NavLink>
        <NavLink to="/daily-lesson" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
          <CalendarCheck size={28} /> <span>DAILY</span>
        </NavLink>
        <NavLink to="/quiz" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
          <HelpCircle size={28} /> <span>QUIZ</span>
        </NavLink>
        <NavLink to="/progress" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
          <BarChart2 size={28} /> <span>PROFILE</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Navbar;
