import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Intro from './pages/Intro';
import Home from './pages/Home';
import Details from './pages/Details';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />

        <Route path="/home" element={<Home />} />

        <Route path="/details/:id" element={<Details />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
