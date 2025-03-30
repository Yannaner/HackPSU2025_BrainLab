import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useAuth } from '../context/AuthContext';
import './QueueList.css';

interface QueueItem {
  id: string;
  name: string;
  type: string;
  data: string;
  date: string;
  status: string;
}

const QueueList = () => {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    
    const db = getDatabase();
    const trainingsRef = ref(db, `users/${user.uid}/trainings`);
    
    const unsubscribe = onValue(trainingsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Convert Firebase object to array
        const queueArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setQueueItems(queueArray);
      } else {
        setQueueItems([]);
      }
      setIsLoading(false);
    });
    
    return () => unsubscribe();
  }, [user]);

  return (
    <div className="queue-container">
      <div className="queue-header">
        <h2>Model Training Queue</h2>
        <p className="queue-summary">
          {isLoading 
            ? "Loading queue..." 
            : queueItems.length === 0 
              ? "No models in queue" 
              : `${queueItems.length} model${queueItems.length > 1 ? 's' : ''} in queue`
          }
        </p>
      </div>

      <div className="queue-list">
        {isLoading ? (
          <div className="loading-spinner">Loading...</div>
        ) : queueItems.length === 0 ? (
          <div className="queue-empty">
            <span className="queue-empty-icon">📊</span>
            <p>No models are currently in the queue.</p>
            <p className="queue-empty-sub">Use the Upload button to add a new model for training.</p>
          </div>
        ) : (
          queueItems.map((item, index) => (
            <div key={item.id} className={`queue-item ${index === 0 ? 'training' : 'queued'}`}>
              <div className="queue-item-header">
                <div className="queue-item-title">
                  <h3>{item.name}</h3>
                  <span className={`queue-status-badge ${index === 0 ? 'training' : 'queued'}`}>
                    {index === 0 ? 'Training' : `Queue Position: ${index + 1}`}
                  </span>
                </div>
                <span className="queue-date">{item.date}</span>
              </div>
              <div className="queue-item-details">
                <div className="queue-detail">
                  <span className="detail-label">Type:</span>
                  <span className="detail-value">{item.type}</span>
                </div>
                <div className="queue-detail">
                  <span className="detail-label">Status:</span>
                  <span className={`detail-value ${index === 0 ? 'status-training' : 'status-queued'}`}>
                    {index === 0 ? 'In Progress' : 'Waiting'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QueueList;
