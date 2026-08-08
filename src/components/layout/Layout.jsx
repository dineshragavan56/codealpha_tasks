import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import '../../styles/layout.css';

const Layout = () => {
  return (
    <div className="app-layout">
      {/* Desktop Sidebar (Left) */}
      <Navbar />
      
      <div className="main-wrapper">
        <TopBar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <Sidebar />
    </div>
  );
};

export default Layout;
