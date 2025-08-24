import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './SelectPage.css';

function SelectPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('Chest');

  return (
    <div className="select-container">
      <h1 className="select-title">Date & Group</h1>

      <div style={{ marginBottom: '20px' }}>
        <label>Date</label>
        <input
          type="date"
          className="select-input"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Group</label>
        <select
          className="select-input"
          value={selectedMuscle}
          onChange={(e) => setSelectedMuscle(e.target.value)}
        >
          <option value="Chest">Chest</option>
          <option value="Back">Back</option>
          <option value="Legs">Legs</option>
          <option value="Arms">Arms</option>
          <option value="Ahoulders">Shoulders</option>
        </select>
      </div>

      <p className="total-weight">Total 0 kg</p>

      <button className="select-button" 
        onClick={() => navigate(`/record/${selectedMuscle}`)}
      >
        Next
      </button>
    </div>
  );
}

export default SelectPage;