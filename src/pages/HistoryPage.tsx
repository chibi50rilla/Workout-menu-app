import { useLocation, useNavigate } from 'react-router-dom';
import './HistoryPage.css';

type RecordEntry = {
  date: string;
  exercise: string;
  weight: number;
  reps: number;
  sets: number;
};

function HistoryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const history = (location.state?.history as RecordEntry[]) || [];

  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '/');
  const todayHistory = history.filter((entry) => entry.date === today);
  const totalWeightToday = todayHistory.reduce(
    (sum, entry) => sum + entry.weight * entry.reps * entry.sets,
    0
  );

  return (
    <div className="history-page">
      <h2 className="title">{today}</h2>

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

      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}

export default HistoryPage;