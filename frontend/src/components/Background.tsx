import { useLocation } from 'react-router-dom';
import './Background.css';

const Background = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className={`background ${isAuthPage ? 'auth-bg' : ''}`}>
      <div className="gradient-sphere"></div>
      <div className="grid"></div>
    </div>
  );
};

export default Background;
