import './Documentation.css';

const Documentation = () => {
  const resources = [
    {
      title: 'Demo Video',
      icon: '🎬',
      description: 'Watch a comprehensive demonstration of the BrainLabs platform and its physical computing capabilities.',
      link: 'https://youtu.be/sG_KVpkztmY',
      linkText: 'Watch Demo',
      color: 'blue'
    },
    {
      title: 'GitHub Repository',
      icon: '💻',
      description: 'Access our open-source code, contribute to the project, or implement your own instance of our physical computing platform.',
      link: 'https://github.com/Yannaner/HackPSU2025_SPR',
      linkText: 'View on GitHub',
      color: 'purple'
    },
    {
      title: 'Research Paper',
      icon: '📑',
      description: 'Read this academic publication detailing the architecture, methodologies, and experimental results.',
      link: 'https://journals.aps.org/prapplied/abstract/10.1103/PhysRevApplied.18.014040',
      linkText: 'View on APS Journal',
      color: 'green'
    }
  ];

  return (
    <div className="documentation-container">
      <div className="documentation-header">
        <h2>Documentation & Resources</h2>
        <p className="documentation-intro">
          Explore these resources to learn more about BrainLabs' physical computing platform technology, 
          implementation details, and research foundations.
        </p>
      </div>

      <div className="resource-grid">
        {resources.map((resource, index) => (
          <div key={index} className={`resource-card ${resource.color}`}>
            <div className="resource-icon">{resource.icon}</div>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <a href={resource.link} target="_blank" rel="noopener noreferrer" className="resource-link">
              {resource.linkText}
              <span className="arrow">→</span>
            </a>
          </div>
        ))}
      </div>
      
      <div className="additional-info">
        <h3>About Our Technology</h3>
        <p>
          BrainLabs uses a novel neuromorphic computing approach that combines physical electronics with 
          machine learning principles. Our technology reduces energy consumption by up to 90% compared to 
          traditional computing methods by leveraging physical property dynamics for computation.
        </p>
        <p>
          The platform implements physical neural networks through analog electronic components that 
          naturally perform the mathematical operations required for machine learning, without the need 
          for power-hungry digital processors.
        </p>
      </div>
    </div>
  );
};

export default Documentation;
