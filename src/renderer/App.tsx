import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import WelcomeScreen from './pages/splashScreen';
import HomeScreen from './pages/home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/home" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
}
