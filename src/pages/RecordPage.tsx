import { useState } from 'react';
import './RecordPage.css';

type RecordEntry = {
  date: string;
  exercise: string;
  weight: number;
  reps: number;
  sets: number;
};

function RecordPage() {
  const [exercise, setExercise] = useState('Barbell Bench Press');
  const [weight, setWeight] = useState<number>(0);
  const [reps, setReps] = useState<number>(0);
  const [sets, setSets] = useState<number>(0);
  const [exerciseTotal, setExerciseTotal] = useState<number>(0);
  const [history, setHistory] = useState<RecordEntry[]>([]);

  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '/');

  const handleRecord = () => {
    const total = weight * reps * sets;
    setExerciseTotal(total);

    const newEntry: RecordEntry = {
      date: today,
      exercise,
      weight,
      reps,
      sets,
    };

    setHistory([...history, newEntry]);
  };

  const totalWeight = history.reduce(
    (sum, entry) => sum + entry.weight * entry.reps * entry.sets,
    0
  );

  return (
    <div className="record-page">
      <h2 className="title">Workout Menu Record</h2>

      <div className="exercise-section">
        <label>Exercise</label><br/>
        <select
          className="exercise-select"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
        >
          <option>Barbell Bench Press</option>
          <option>Incline Barbell Bench Press</option>
          <option>Decline Barbell Bench Press</option>
          <option>Dumbbell Bench Press</option>
          <option>Incline Dumbbell Press</option>
          <option>Decline Dumbbell Press</option>
          <option>Dumbbell Fly</option>
          <option>Incline Dumbbell Fly</option>
          <option>Chest Press Machine</option>
          <option>Incline Chest Press Machine</option>
          <option>Pec Deck Machine</option>
          <option>Cable Crossover</option>
          <option>Low-to-High Cable Fly</option>
          <option>High-to-Low Cable Fly</option>
          <option>Smith Machine Bench Press</option>
        </select>
      </div>

      <div className="input-group">
        <div className="input-item">
          <label className="input-label">Weight</label>
          <input
            type="number"
            placeholder="Weight"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
        </div>
        <div className="input-item">
          <label className="input-label">Reps</label>
          <input
            type="number"
            placeholder="Reps ×"
            value={reps}
            onChange={(e) => setReps(Number(e.target.value))}
          />
        </div>
        <div className="input-item">
          <label className="input-label">Sets</label>
          <input
            type="number"
            placeholder="Sets"
            value={sets}
            onChange={(e) => setSets(Number(e.target.value))}
          />
        </div>
      </div>

      <p className="exercise-total">＋ Exercise Total {exerciseTotal} kg</p>

      <button className="record-button" onClick={handleRecord}>
        Record
      </button>

      <div className="history-section">
        <p className="date-label">{today}</p>
        {history.map((entry, index) => (
          <p key={index} className="history-entry">
            {entry.date} {entry.exercise} {entry.weight} kg × {entry.reps} × {entry.sets}
          </p>
        ))}
        <p className="total-weight">Total {totalWeight} kg</p>
      </div>
    </div>
  );
}

export default RecordPage;