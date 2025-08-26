import { useState } from 'react';
import './global.css';
import './RecordPage.css';
import { useNavigate, useParams } from 'react-router-dom';

type RecordEntry = {
  date: string;
  muscleGroup: string;
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

  const exerciseOptions: { [key: string]: string[] } = {
    Chest: [
      'Barbell Bench Press', 'Incline Barbell Bench Press', 'Dumbbell Bench Press',
      'Incline Dumbbell Press', 'Dumbbell Fly', 'Incline Dumbbell Fly',
      'Chest Press Machine', 'Incline Chest Press Machine', 'Pec Deck Machine',
      'Cable Crossover', 'Low-to-High Cable Fly', 'High-to-Low Cable Fly',
      'Smith Machine Bench Press',
    ],
    Back: [
      'Deadlift', 'Pull-Up', 'Chin-Up', 'Lat Pulldown', 'Bent Over Row',
      'Dumbbell Row', 'T-Bar Row', 'Seated Cable Row', 'Face Pull',
      'Straight-Arm Pulldown', 'Machine Row',
    ],
    Legs: [
      'Squat', 'Front Squat', 'Bulgarian Split Squat', 'Leg Press',
      'Romanian Deadlift', 'Hack Squat', 'Leg Extension', 'Leg Curl',
      'Hip Thrust', 'Calf Raise',
    ],
    Arms: [
      'Barbell Curl', 'Dumbbell Curl', 'Hammer Curl', 'Concentration Curl',
      'Preacher Curl', 'Cable Curl', 'Tricep Pushdown',
      'Overhead Tricep Extension', 'Skull Crusher', 'Close-Grip Bench Press',
      'Kickback', 'Dips', 'Zottman Curl', 'Incline Dumbbell Curl',
      'Tricep Rope Extension',
    ],
    Shoulders: [
      'Overhead Press', 'Dumbbell Shoulder Press', 'Arnold Press',
      'Lateral Raise', 'Front Raise', 'Rear Delt Fly', 'Upright Row',
      'Face Pull', 'Cable Lateral Raise', 'Machine Shoulder Press',
      'Dumbbell Shrug', 'Barbell Shrug', 'Seated Dumbbell Press',
      'Reverse Pec Deck',
    ],
  };
  const [muscleGroup, setMuscleGroup] = useState('Chest');
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
      muscleGroup: muscleGroup || 'Chest',
      exercise,
      weight: Number(weight),
      reps: Number(reps),
      sets: Number(sets),
    };

    const setEntryRecords: RecordEntry[] = setEntries
      .map((entry) => ({
        date: today,
        muscleGroup: muscleGroup || 'Chest',
        exercise,
        weight: Number(entry.weight),
        reps: Number(entry.reps),
        sets: Number(entry.sets),
      }))
      .filter((e) => e.weight && e.reps && e.sets);

    const updatedHistory = [...history, topEntry, ...setEntryRecords];
    setHistory(updatedHistory);
    navigate('/history', { state: { history: updatedHistory } });

    fetch('http://localhost:3001/api/saveRecord', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: today,
        muscleGroup: muscleGroup || 'Chest',
        records: [topEntry, ...setEntryRecords],
      }),
    })
      .then(res => res.text())
      .then(data => {
        console.log('サーバーからの応答:', data);
      })
      .catch(err => {
        console.error('保存エラー:', err);
        alert('保存に失敗しました');
      });

    navigate('/history');
  };

  const totalWeight = history.reduce(
    (sum, entry) => sum + entry.weight * entry.reps * entry.sets,
    0
  );

  return (
    <div className="record-page">
      <h2 className="title">{today}</h2>

      <div className="muscle-group-section">
        <label className="input-label">Muscle Group</label><br/>
        <select
          className="select-box"
          value={muscleGroup}
          onChange={(e) => setMuscleGroup(e.target.value)}
        >
          <option value="Chest">Chest</option>
          <option value="Back">Back</option>
          <option value="Legs">Legs</option>
          <option value="Arms">Arms</option>
          <option value="Shoulders">Shoulders</option>
        </select>
      </div>

      <div className="exercise-section">
        <label className="input-label">Exercise</label><br/>
        <select
          className="select-box"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
        >
          {(exerciseOptions[muscleGroup || 'Chest'] || []).map((ex) => (
            <option key={ex} value={ex}>{ex}</option>
          ))}
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
            placeholder="Reps"
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

        <button className="back-button" onClick={() => navigate('/')}>
          Back
        </button>
      </div>
    </div>
  );
}

export default RecordPage;