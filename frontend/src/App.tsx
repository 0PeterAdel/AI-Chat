import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AiChat from './pages/AIChat'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AiChat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
