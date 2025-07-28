import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AiChat from './components/AiChat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AiChat />} /> 
      </Routes>
    </Router>
  );
}

export default App;
