import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Juegos from "./pages/Juegos";
import Biblioteca from "./pages/Biblioteca";
import Reseñas from "./pages/Reseñas";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import GlobalStyle from "./GlobalStyles";

export default function App() {
  return (
    <>
      {/* 🌈 Fondo animado global */}
      <GlobalStyle />

      <Router>
        {/* 🧭 Barra de navegación visible en TODAS las páginas */}
        <Navbar />

        <div style={{ padding: "2rem" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/juegos" element={<Juegos />} />
            <Route path="/biblioteca" element={<Biblioteca />} />
            <Route path="/reseñas" element={<Reseñas />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}
