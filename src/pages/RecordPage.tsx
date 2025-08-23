import { useState } from 'react';
import './RecordPage.css';
import { useNavigate } from 'react-router-dom';

type RecordEntry = {
  date: string;
  exercise: string;
  weight: number;
  reps: number;
  sets: number;
};

type SetEntry = {
  weight: string;
  reps: string;
  sets: string;
};

function RecordPage() {
  const navigate = useNavigate();
  const [exercise, setExercise] = useState('Barbell Bench Press');
  const [weight, setWeight] = useState<string>("");
  const [reps, setReps] = useState<string>("");
  const [sets, setSets] = useState<string>("");
  const [exerciseTotal, setExerciseTotal] = useState<number>(0);
  const [history, setHistory] = useState<RecordEntry[]>([]);

  const [setEntries, setSetEntries] = useState<SetEntry[]>([
    { weight: "", reps: "", sets: "" },
  ]);

  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '/');
  
  const calculateTotalWeightFromSets = () => {
  const topWeight = Number(weight);
  const topReps = Number(reps);
  const topSets = Number(sets);

  const topTotal = isNaN(topWeight) || isNaN(topReps) || isNaN(topSets)
    ? 0
    : topWeight * topReps * topSets;

  const setsTotal = setEntries.reduce((sum, entry) => {
    const w = Number(entry.weight);
    const r = Number(entry.reps);
    const s = Number(entry.sets);
    if (isNaN(w) || isNaN(r) || isNaN(s)) return sum;
    return sum + w * r * s;
  }, 0);

  return topTotal + setsTotal;
};

  const handleRecord = () => {
    const topEntry: RecordEntry = {
      date: today,
      exercise,
      weight: Number(weight),
      reps: Number(reps),
      sets: Number(sets),
    };

    const setEntryRecords: RecordEntry[] = setEntries
      .map((entry) => ({
        date: today,
        exercise,
        weight: Number(entry.weight),
        reps: Number(entry.reps),
        sets: Number(entry.sets),
      }))
      .filter((e) => e.weight && e.reps && e.sets);

    const updatedHistory = [...history, topEntry, ...setEntryRecords];
    setHistory(updatedHistory);
    navigate('/history', { state: { history: updatedHistory } });
  };


  const totalWeight = history.reduce(
    (sum, entry) => sum + entry.weight * entry.reps * entry.sets,
    0
  );

  return (
    <div className="record-page">
      <h2 className="title">{today}</h2>

      <div className="exercise-section">
        <label className="input-label">Exercise</label><br/>
        <select
          className="exercise-select"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
        >
          <option>Barbell Bench Press</option>
          <option>Incline Barbell Bench Press</option>
          <option>Dumbbell Bench Press</option>
          <option>Incline Dumbbell Press</option>
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
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="input-item">
          <label className="input-label">Reps</label>
          <input
            type="number"
            placeholder="Reps ×"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        </div>
        <div className="input-item">
          <label className="input-label">Sets</label>
          <input
            type="number"
            placeholder="Sets"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
        </div>
      </div>

      {setEntries.map((entry, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <div className="input-group">
            <input
              type="number"
              className="input-field"
              placeholder="Weight"
              value={entry.weight}
              onChange={(e) => {
                const updated = [...setEntries];
                updated[index].weight = e.target.value;
                setSetEntries(updated);
              }}
              onFocus={(e) => {
                e.target.addEventListener('wheel', (event) => event.preventDefault(), { passive: false });
              }}
            />
            <input
              type="number"
              className="input-field"
              placeholder="Reps"
              value={entry.reps}
              onChange={(e) => {
                const updated = [...setEntries];
                updated[index].reps = e.target.value;
                setSetEntries(updated);
              }}
              onFocus={(e) => {
                e.target.addEventListener('wheel', (event) => event.preventDefault(), { passive: false });
              }}
            />
            <input
              type="number"
              className="input-field"
              placeholder="Sets"
              value={entry.sets}
              onChange={(e) => {
                const updated = [...setEntries];
                updated[index].sets = e.target.value;
                setSetEntries(updated);
              }}
              onFocus={(e) => {
                e.target.addEventListener('wheel', (event) => event.preventDefault(), { passive: false });
              }}
            />
          </div>
        </div>
      ))}

      <button
        onClick={() => {
          setSetEntries([...setEntries, { weight: "", reps: "", sets: "" }]);
        }}
        style={{
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#2e3a59',
          color: '#c7f464',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        ＋
      </button>

      <p className="exercise-total">
        Exercise Total {calculateTotalWeightFromSets()} kg
      </p>

      <div className="button-group">
        <button className="record-button" onClick={handleRecord}>
          Record
        </button>

        <button className="back-button" onClick={() => navigate('/select')}>
          Back
        </button>
      </div>
    </div>
  );
}

export default RecordPage;