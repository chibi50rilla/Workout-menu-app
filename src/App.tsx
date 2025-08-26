import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecordPage from './pages/RecordPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/record" element={<RecordPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/record/:muscleGroup" element={<RecordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;