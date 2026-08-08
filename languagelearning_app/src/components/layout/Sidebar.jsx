import { NavLink } from 'react-router-dom';
import { Home, Layers, Book, CalendarCheck, HelpCircle, BarChart2 } from 'lucide-react';
import '../../styles/layout.css';

// Bottom Navigation on Mobile devices
const Sidebar = () => {
  return (
    <nav className="mobile-bottom-nav">
      <NavLink to="/" className={({isActive}) => isActive ? "mobile-nav-item active" : "mobile-nav-item"}>
        <Home size={28} />
      </NavLink>
      <NavLink to="/categories" className={({isActive}) => isActive ? "mobile-nav-item active" : "mobile-nav-item"}>
        <Layers size={28} />
      </NavLink>
      <NavLink to="/flashcards" className={({isActive}) => isActive ? "mobile-nav-item active" : "mobile-nav-item"}>
        <Book size={28} />
      </NavLink>
      <NavLink to="/daily-lesson" className={({isActive}) => isActive ? "mobile-nav-item active" : "mobile-nav-item"}>
        <CalendarCheck size={28} />
      </NavLink>
      <NavLink to="/quiz" className={({isActive}) => isActive ? "mobile-nav-item active" : "mobile-nav-item"}>
        <HelpCircle size={28} />
      </NavLink>
      <NavLink to="/progress" className={({isActive}) => isActive ? "mobile-nav-item active" : "mobile-nav-item"}>
        <BarChart2 size={28} />
      </NavLink>
    </nav>
  );
};

export default Sidebar;
