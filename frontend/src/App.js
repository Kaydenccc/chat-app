import './App.css';
import GlobalProvider from './context/context';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default GlobalProvider(App);
