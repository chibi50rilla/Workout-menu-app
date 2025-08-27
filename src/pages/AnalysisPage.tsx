import { Line } from 'react-chartjs-2';
import './AnalysisPage.css';

function AnalysisPage() {
  return (
    <div className="analysis-page">
      <h2 className="title">Analysis</h2>
      <p style={{ color: '#ffffff' }}>筋群別の総負荷量の推移</p>

      {/* グラフ表示エリア（明日以降で中身を追加） */}
      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <div style={{ width: '800px' }}>
          <Line data={{ labels: [], datasets: [] }} options={{}} />
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;
