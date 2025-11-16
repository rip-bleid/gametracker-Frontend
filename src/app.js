import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Juegos from "./pages/Juegos";
import Biblioteca from "./pages/Biblioteca";
import Reseñas from "./pages/Reseñas";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import GlobalStyle from "./GlobalStyles";
import JuegoDetalle from "./components/JuegoDetalle";
import RutaPrivada from "./components/RutaPrivada";
import AuthProvider from "./context/Authcontext";

export default function App() {
  return (
    <AuthProvider>
      <GlobalStyle />

      <Router>
        <Navbar />

        <div style={{ padding: "2rem" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />

            <Route
              path="/juegos"
              element={
                <RutaPrivada>
                  <Juegos />
                </RutaPrivada>
              }
            />

            <Route
              path="/biblioteca"
              element={
                <RutaPrivada>
                  <Biblioteca />
                </RutaPrivada>
              }
            />

            <Route
              path="/reseñas"
              element={
                <RutaPrivada>
                  <Reseñas />
                </RutaPrivada>
              }
            />

            <Route
              path="/juegos/:id"
              element={
                <RutaPrivada>
                  <JuegoDetalle />
                </RutaPrivada>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
