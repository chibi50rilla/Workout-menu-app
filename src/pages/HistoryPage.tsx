import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './global.css';
import './HistoryPage.css';

type RecordEntry = {
  date: string;
  muscleGroup: string;
  exercise: string;
  weight: number;
  reps: number;
  sets: number;
};

function HistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<RecordEntry[]>([]);

  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '/');
  const todayHistory = history.filter((entry) => entry.date === today);

  const totalWeightToday = todayHistory.reduce(
    (sum, entry) => sum + entry.weight * entry.reps * entry.sets,
    0
  );
  
  useEffect(() => {
    fetch('http://localhost:3001/api/records')
      .then(res => res.json())
      .then(data => {
        const flattened = data.flatMap((entry: any) =>
          entry.records.map((r: any) => ({
            date: entry.date,
            muscleGroup: entry.muscleGroup,
            ...r,
          }))
        );
        setHistory(flattened);
      })
      .catch(err => console.error('取得エラー:', err));
  }, []);


  return (
    <div className="history-page">
      <h2 className="title">
        {today}
        {history.length > 0 && (
          <span style={{ marginLeft: '20px' }}>
            {history[0].muscleGroup}
          </span>
        )}
      </h2>

      {todayHistory.length === 0 ? (
        <p className="no-record">No records for today.</p>
      ) : (
        <>
          <table className="history-table">
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Weight</th>
                <th>Reps</th>
                <th>Sets</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {todayHistory.map((entry: RecordEntry, index: number) => (
                <tr key={index}>
                  <td>{entry.exercise}</td>
                  <td>{entry.weight} kg</td>
                  <td>{entry.reps}</td>
                  <td>{entry.sets}</td>
                  <td>{entry.weight * entry.reps * entry.sets} kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        <p className="total-weight">Total {totalWeightToday} kg</p>
        </>
      )}

      {/* 戻るボタン */}
      <button className="back-button" onClick={() => navigate('/record')}>
        Back
      </button>

      <button
        onClick={() => navigate('/analysis')}
        className="analysis-button"
      >
        Analysis
      </button>
    </div>
  );
}

export default HistoryPage;