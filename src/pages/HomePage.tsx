import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div 
      style={{ 
        textAlign: 'center',
        backgroundColor: '#1a2a3a', // ネイビー背景
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '100px' 
        }}
    >
      <h1
        style={{
          color: '#b5ff00', // ライムグリーン
          fontWeight: 300,   // 細め
          fontSize: '48px',
          marginBottom: '40px'
          }}
      >
        FitLog
      </h1>
      <button
        onClick={() => navigate('/record')}
        className="button"
      >
        Log start
      </button>
    </div>
  );
}

export default HomePage;