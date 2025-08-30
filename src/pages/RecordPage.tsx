// === 必要なモジュール・スタイルの読み込み ===
import { useState } from 'react';
import './global.css';
import './RecordPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { calculate1RM } from '../utils/calculate';
import { exerciseOptions } from '../constants/exerciseOptions';

// === 型定義 ===
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

// === メインコンポーネント ===
function RecordPage() {
  const navigate = useNavigate();

  // === 合計負荷量の計算 ===
  const calculate1RM = (weight: number, reps: number): number => {
    if (weight <= 0 || reps <= 0) return 0;
    return Math.round(weight * (1 + reps / 30));
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

  // === 記録保存処理（履歴とAPI送信） ===
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

  const renderInputRow = (
        weightValue: string,
        repsValue: string,
        setsValue: string,
        index: number,
        onChange: (field: keyof SetEntry, value: string) => void
      ) => (
        <div className="input-group">
          {['Weight', 'Reps', 'Sets'].map((label, i) => {
            const field = label.toLowerCase() as keyof SetEntry;
            const value = field === 'weight' ? weightValue
                        : field === 'reps' ? repsValue
                        : setsValue;

            return (
              <div key={label} className="input-item">
                {index === 0 && <label className="input-label">{label}</label>}
                <input
                  type="number"
                  className="input-field"
                  placeholder={label}
                  value={value}
                  onChange={(e) => onChange(field, e.target.value)}
                  onFocus={(e) => {
                    e.target.addEventListener('wheel', (event) => event.preventDefault(), { passive: false });
                  }}
                />
              </div>
            );
          })}

          <div className="input-item">
            {index === 0 && <label className="input-label">1RM</label>}
            <span className="rm-display">
              {Number(weightValue) > 0 && Number(repsValue) > 0
                ? `${calculate1RM(Number(weightValue), Number(repsValue))} kg`
                : <span style={{ visibility: 'hidden' }}>000kg</span>}
            </span>
          </div>
        </div>
      );

  // === JSXの描画 ===
  return (
    <div className="record-page">
      <h2 className="title">{today}</h2>

      {/* 筋群セレクト */}
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

      {/* 種目セレクト */}
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

      {/* セット入力欄（1行目） */}
      {renderInputRow(weight, reps, sets, 0, (field, value) => {
        if (field === 'weight') setWeight(value);
        if (field === 'reps') setReps(value);
        if (field === 'sets') setSets(value);
      })}

      {/* 追加セット入力欄 */}
      {setEntries.map((entry, index) =>
        renderInputRow(entry.weight, entry.reps, entry.sets, index + 1, (field, value) => {
          const updated = [...setEntries];
          updated[index][field] = value;
          setSetEntries(updated);
        })
      )}

      {/* セット追加ボタン */}
      <button className="add-set-button"
        onClick={() => {
          setSetEntries([...setEntries, { weight: "", reps: "", sets: "" }]);
        }}
      >
        ＋
      </button>

      {/* 合計負荷量表示 */}
      <p className="exercise-total">
        Exercise Total {calculateTotalWeightFromSets()} kg
      </p>
      
      {/* 記録・戻るボタン */}
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