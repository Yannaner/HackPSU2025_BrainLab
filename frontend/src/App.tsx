import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Background from './components/Background';
import Playground from './pages/Playground/Playground';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import TypewriterText from './components/TypewriterText';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

function App() {
  const words = [
    "First Physical Learning Cloud Platform",
    "Nature-Inspired Computing Platform",
    "Sustainable AI Infrastructure",
    "Bio-Inspired Computing Solution"
  ];

  const featureCards = [
    {
      icon: "🧠",
      title: "Local ML Training",
      description: "Train your machine learning models using our physical neuromorphic computing infrastructure, reducing energy consumption by up to 90%"
    },
    {
      icon: "⚡",
      title: "Energy Efficient",
      description: "Our bio-inspired architecture combines processing and memory in physical circuits, eliminating the traditional von Neumann bottleneck"
    },
    {
      icon: "🌱",
      title: "Sustainable AI",
      description: "Make AI development environmentally friendly with our energy-efficient physical computing platform"
    },
    {
      icon: "🔒",
      title: "Data Privacy",
      description: "Keep your data secure with local processing - your information never leaves your designated physical infrastructure"
    }
  ];

  return (
    <AuthProvider>
      <Router>
        <Background />
        <Navbar />
        <Routes>
          <Route path="/" element={
            <main>
              <section id="home" className="section">
                <h2>
                  <TypewriterText words={words} />
                </h2>
                <p>Pioneering the future of sustainable technology through physical solution</p>
              </section>
              
              <section id="about" className="section about-section">
                <h2>Our Technology</h2>
                
                <div className="feature-grid">
                  {featureCards.map((card, index) => (
                    <div key={index} className="feature-card">
                      <div className="feature-icon">{card.icon}</div>
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                    </div>
                  ))}
                </div>

                <div className="info-blocks">
                  <div className="info-block">
                    <h3>How It Works</h3>
                    <div className="step-list">
                      <div className="step">
                        <div className="step-number">1</div>
                        <p>Upload your training data through our intuitive interface</p>
                      </div>
                      <div className="step">
                        <div className="step-number">2</div>
                        <p>Our system automatically configures the physical neural network</p>
                      </div>
                      <div className="step">
                        <div className="step-number">3</div>
                        <p>Training occurs on energy-efficient neuromorphic hardware</p>
                      </div>
                      <div className="step">
                        <div className="step-number">4</div>
                        <p>Access your trained models through our API or web interface</p>
                      </div>
                    </div>
                  </div>

                  <div className="info-block">
                    <h3>Why Choose Us</h3>
                    <ul className="benefit-list">
                      <li>
                        <span className="benefit-icon">📊</span>
                        <span>Up to 90% reduction in energy consumption</span>
                      </li>
                      <li>
                        <span className="benefit-icon">🚀</span>
                        <span>Faster training with parallel physical computing</span>
                      </li>
                      <li>
                        <span className="benefit-icon">💡</span>
                        <span>Bio-inspired architecture for efficient learning</span>
                      </li>
                      <li>
                        <span className="benefit-icon">🌍</span>
                        <span>Environmentally conscious AI development</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </main>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/playground/*" element={<Playground />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
