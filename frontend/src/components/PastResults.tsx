import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import Modal from './Modal';
import './PastResults.css';
import { useAuth } from '../context/AuthContext';

interface TrainingResult {
  id: string;
  name: string;
  type: string;
  data: string;
  date: string;
  status: 'trained successfully' | 'training failed';
}

const PastResults = () => {
  const [results, setResults] = useState<TrainingResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState<TrainingResult | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) return;
    
    const db = getDatabase();
    const resultsRef = ref(db, `users/${user.uid}/trainings`);
    
    const unsubscribe = onValue(resultsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const resultsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setResults(resultsArray);
      } else {
        setResults([]);
      }
      setIsLoading(false);
    });
    
    return () => unsubscribe();
  }, [user]);
  
  const openResultDetail = (result: TrainingResult) => {
    setSelectedResult(result);
    setShowDetailModal(true);
  };
  
  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Past Training Results</h2>
        <p className="results-summary">
          {isLoading 
            ? "Loading your past results..." 
            : results.length === 0 
              ? "No past training results found" 
              : `${results.length} model${results.length > 1 ? 's' : ''} trained`
          }
        </p>
      </div>
      
      {isLoading ? (
        <div className="loading-spinner">Loading...</div>
      ) : results.length === 0 ? (
        <div className="results-empty">
          <span className="results-empty-icon">📊</span>
          <p>No training history available yet.</p>
          <p className="results-empty-sub">Use the Upload button to train your first model.</p>
        </div>
      ) : (
        <div className="results-list">
          {results.map((result) => (
            <div key={result.id} className="result-item">
              <div className="result-header">
                <div className="result-title">
                  <h3>{result.name}</h3>
                  <span className={`status-badge ${result.status === 'trained successfully' ? 'success' : 'failed'}`}>
                    {result.status}
                  </span>
                </div>
                <span className="result-date">{result.date}</span>
              </div>
              
              <div className="result-info">
                <span className="result-type">Type: {result.type}</span>
                <button 
                  className="view-details-btn"
                  onClick={() => openResultDetail(result)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <Modal isOpen={showDetailModal} onClose={() => setShowDetailModal(false)}>
        {selectedResult && (
          <div className="result-details">
            <h3>{selectedResult.name}</h3>
            <div className="detail-grid">
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{selectedResult.date}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Type:</span>
                <span className="detail-value">{selectedResult.type}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`detail-value ${selectedResult.status === 'trained successfully' ? 'success' : 'failed'}`}>
                  {selectedResult.status}
                </span>
              </div>
            </div>
            
            <div className="input-data-section">
              <h4>Input Data</h4>
              <pre className="data-display">{selectedResult.data}</pre>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PastResults;
