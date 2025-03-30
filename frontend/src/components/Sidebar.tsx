import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Modal from './Modal';
import UploadForm from './UploadForm';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [showUploadModal, setShowUploadModal] = useState(false);

  const menuItems = {
    analysis: [
      { 
        path: '/playground/results', 
        label: 'Past Results', 
        icon: '📊',
        description: 'View your training history'
      },
      { 
        path: '/playground/queue', 
        label: 'Training Queue', 
        icon: '⏱️',
        description: 'Manage training queue'
      }
    ],
    tools: [
      { 
        path: '/playground/inference', 
        label: 'Model Inference', 
        icon: '🔄',
        description: 'Run model predictions'
      }
    ]
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-content">
          <div className="menu-section">
            <span className="section-title">Analysis</span>
            {menuItems.analysis.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
                title={item.description}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="menu-section">
            <span className="section-title">Tools</span>
            {menuItems.tools.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
                title={item.description}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </Link>
            ))}
          </div>

          <button 
            onClick={() => setShowUploadModal(true)}
            className="upload-btn"
          >
            <span className="sidebar-icon">⬆️</span>
            <span className="upload-btn-text">Upload Data</span>
          </button>
        </div>
      </div>

      <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)}>
        <UploadForm onClose={() => setShowUploadModal(false)} />
      </Modal>
    </>
  );
};

export default Sidebar;
