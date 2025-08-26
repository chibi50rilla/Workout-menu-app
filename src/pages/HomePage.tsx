import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './global.css';
import './HomePage.css';
import Calendar from '../components/Calendar';

function HomePage() {
  const navigate = useNavigate();
  const [recordedDates, setRecordedDates] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0〜11

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  useEffect(() => {
    fetch('http://localhost:3001/api/records')
      .then(res => res.json())
      .then(data => {
        const dates = data.map((entry: any) => entry.date);
        setRecordedDates(dates);
      });
  }, []);

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

      <Calendar
        recordedDates={recordedDates}
        year={currentYear}
        month={currentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />

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