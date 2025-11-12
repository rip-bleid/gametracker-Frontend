import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Juegos from "./pages/Juegos";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Biblioteca from "./pages/Biblioteca";
import Reseñas from "./pages/Reseñas";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/juegos" element={<Juegos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/reseñas" element={<Reseñas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
