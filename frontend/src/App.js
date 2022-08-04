import './App.css';
import GlobalProvider from './context/context';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/Home/Home';
import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

const initialState = {
  isValidated: false,
  isDelete: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isValidated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        isValidated: false,
      };
    case 'DELETED':
      return {
        ...state,
        isDelete: !state.isDelete,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={!state.isValidated ? <Navigate to="/" /> : <Home />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default GlobalProvider(App);
