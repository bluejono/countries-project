import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Intro from './pages/Intro';
import Home from './pages/Home';
import Details from './pages/Details';
import { CountriesProvider } from './context/CountriesContext';

function App() {
  return (
    <CountriesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />

          <Route path="/home" element={<Home />} />

          <Route path="/details/:id" element={<Details />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CountriesProvider>
  )
}

export default App
