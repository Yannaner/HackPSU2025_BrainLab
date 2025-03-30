import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadForm.css';
import { getAuthToken } from '../services/auth';
import { useAuth } from '../context/AuthContext';
import { getDatabase, ref, push } from 'firebase/database';

interface UploadFormProps {
  onClose: () => void;
}

const UploadForm = ({ onClose }: UploadFormProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    data: '',
    type: 'regression',
    name: ''
  });
  const [isValidated, setIsValidated] = useState(false);
  const [error, setError] = useState('');

  const validateData = (data: string): boolean => {
    // Remove all whitespace
    const trimmedData = data.replace(/\s/g, '');
    // Match pattern (number,number),(number,number)
    const pattern = /^(\(\d+(\.\d+)?,\d+(\.\d+)?\),)*\(\d+(\.\d+)?,\d+(\.\d+)?\)$/;
    return pattern.test(trimmedData);
  };

  const addToFirebase = async () => {
    if (!user) {
      setError('You must be logged in');
      return;
    }

    const newItem = {
      ...formData,
      status: 'trained successfully', // Always assume successful as requested
      date: new Date().toLocaleString()
    };

    try {
      const db = getDatabase();
      const trainingsRef = ref(db, `users/${user.uid}/trainings`);
      await push(trainingsRef, newItem);
      console.log('Data saved to Firebase');
    } catch (err) {
      console.error('Error saving to Firebase:', err);
      setError('Failed to save data');
      throw err;
    }
  };

  const handleSubmit = async (action: 'check' | 'add') => {
    if (action === 'check') {
      if (!formData.data || !formData.name) {
        setError('Please fill in all fields');
        return;
      }
      
      if (!validateData(formData.data)) {
        setError('Invalid data format. Please use format: (input,output),(input,output)');
        return;
      }
      
      setError('');
      setIsValidated(true);
    }

    const endpoint = action === 'check' ? '/check' : '/process';
    try {
      const token = await getAuthToken();
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      
      if (action === 'add') {
        await addToFirebase(); // Store in Firebase instead of localStorage
        onClose();
        navigate('/playground/queue'); // Navigate to queue page instead of results
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Server error occurred');
    }
  };

  return (
    <div className="upload-form">
      <div className="form-group">
        <label>Data Input</label>
        <textarea
          value={formData.data}
          onChange={(e) => {
            setFormData({...formData, data: e.target.value});
            setIsValidated(false);
          }}
          placeholder="Enter your data in format: (1,2),(3,4),(5,6)"
        />
      </div>

      <div className="form-group">
        <label>Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({...formData, type: e.target.value})}
        >
          <option value="regression">Regression</option>
          <option value="classification">Classification</option>
        </select>
      </div>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => {
            setFormData({...formData, name: e.target.value});
            setIsValidated(false);
          }}
          placeholder="Enter dataset name"
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="form-actions">
        <button onClick={() => handleSubmit('check')} className="btn-check">
          Check Data
        </button>
        <button 
          onClick={() => handleSubmit('add')} 
          className="btn-submit"
          disabled={!isValidated}
        >
          Add Data
        </button>
        <button 
          onClick={onClose} 
          className="btn-cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UploadForm;
