import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ backgroundColor: "#333", padding: "1rem" }}>
      <Link to="/" style={{ color: "white", marginRight: "1rem" }}>Inicio</Link>
      <Link to="/juegos" style={{ color: "white", marginRight: "1rem" }}>Juegos</Link>
      <Link to="/reseñas" style={{ color: "white", marginRight: "1rem" }}>Reseñas</Link>
      <Link to="/biblioteca" style={{ color: "white", marginRight: "1rem" }}>Biblioteca</Link>
      <Link to="/login" style={{ color: "white", marginRight: "1rem" }}>Login</Link>
      <Link to="/register" style={{ color: "white" }}>Registro</Link>
    </nav>
  );
}
