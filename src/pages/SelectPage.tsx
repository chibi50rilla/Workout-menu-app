import { useNavigate } from 'react-router-dom';
import './SelectPage.css';

function SelectPage() {
  const navigate = useNavigate();

  return (
    <div className="select-container">
      <h1 className="select-title">Date and Muscle Group</h1>

      <div style={{ marginBottom: '20px' }}>
        <label>Date:</label>
        <input type="date" className="select-input" />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Muscle Group:</label>
        <select className="select-input">
          <option value="Chest">Chest</option>
          <option value="Back">Back</option>
          <option value="Legs">Legs</option>
          <option value="Arms">Arms</option>
        </select>
      </div>

      <p style={{ fontSize: '20px', marginBottom: '40px' }}>Total 0 kg</p>

      <button className="select-button" onClick={() => navigate('/record')}>
        Next
      </button>
    </div>
  );
}

export default SelectPage;