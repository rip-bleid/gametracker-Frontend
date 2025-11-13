import React from 'react';
import GlobalStyle from './GlobalStyles';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Home';
import Juegos from './pages/Juegos';
import Reseñas from './pages/Reseñas';
import Biblioteca from './pages/Biblioteca';
import Login from './pages/Login';
import Registro from './pages/Registro';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/juegos" element={<Juegos />} />
        <Route path="/resenas" element={<Reseñas />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;
