import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecordPage from './pages/RecordPage';
import SelectPage from './pages/SelectPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/record" element={<RecordPage />} />
        <Route path="/select" element={<SelectPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/record/:muscleGroup" element={<RecordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;