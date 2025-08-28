import { useNavigate } from 'react-router-dom';
import { generateMockHistory } from '../utils/mockData';  //仮のデータ
import { Line } from 'react-chartjs-2';
import './AnalysisPage.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type RecordEntry = {
  date: string;
  muscleGroup: string;
  exercise: string;
  weight: number;
  reps: number;
  sets: number;
};

const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: '',//何を入れるかDaily Lord Trendはなんか嫌
        color: '#ffffff',
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        ticks: { color: '#ffffff' },
        grid: { color: '#2e3a59' },
      },
      y: {
        ticks: { color: '#ffffff' },
        grid: { color: '#2e3a59' },
      },
    },
  };

const history = generateMockHistory();
const convertToChartData = (history: RecordEntry[], muscleGroup: string) => {
  const grouped: { [date: string]: number } = {};

 history.forEach((entry) => {
    if (entry.muscleGroup === muscleGroup) {
      grouped[entry.date] =
        (grouped[entry.date] || 0) +
        entry.weight * entry.reps * entry.sets;
    }
  });

  const labels = Object.keys(grouped).sort();
  const dataPoints = labels.map((date) => grouped[date]);

  return {
    labels,
    datasets: [
      {
        label: `${muscleGroup} Load`,
        data: dataPoints,
        borderColor: '#b5ff00',
        backgroundColor: 'rgba(181, 255, 0, 0.2)',
        pointBackgroundColor: labels.map((date) =>
          date === new Date().toISOString().slice(0, 10).replace(/-/g, '/')
            ? '#b5ff00'
            : '#ffffff'
        ),
      },
    ],
  };
};


function AnalysisPage() {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('Chest');
  const navigate = useNavigate();

  return (
    <div className="analysis-page">
      <h2 className="title">Analysis</h2>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <label
          htmlFor="muscle-group"
          style={{
            color: '#ffffff',
            marginRight: '12px',
          }}
        >
          Muscle Group
        </label>

        <select
          id="muscle-group"
          value={selectedMuscleGroup}
          onChange={(e) => setSelectedMuscleGroup(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '6px',
            backgroundColor: '#2e3a59',
            color: '#ffffff'
          }}
        >
          <option value="Chest">Chest</option>
          <option value="Back">Back</option>
          <option value="Legs">Legs</option>
          <option value="Arms">Arms</option>
          <option value="Shoulders">Shoulders</option>
        </select>
      </div>

      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <div style={{ width: '800px' }}>
          <Line
            data={convertToChartData(history, selectedMuscleGroup)}
            options={options}
          />
        </div>
      </div>

      <button className="back-button" onClick={() => navigate('/')}>
        Back
      </button>
    </div>
  );
}


export default AnalysisPage;
