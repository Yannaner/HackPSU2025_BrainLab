import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../services/auth';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-brand">
        <img src="/images/blablogo.png" alt="BrainLabs Logo" className="navbar-logo" />
        BrainLabs
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <a href="#about">About</a>
        <Link to="/playground">Playground</Link>
        {user ? (
          <button onClick={() => logoutUser()} className="login-btn">Logout</button>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
