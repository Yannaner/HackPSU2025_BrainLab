import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import QueueList from '../../components/QueueList';
import PastResults from '../../components/PastResults';
import './Playground.css';

const Playground = () => {
  return (
    <div className="playground-layout">
      <Sidebar />
      <div className="playground-content">
        <Routes>
          <Route path="results" element={<PastResults />} />
          <Route path="queue" element={<QueueList />} />
          <Route path="inference" element={<div>Inference Panel</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default Playground;
