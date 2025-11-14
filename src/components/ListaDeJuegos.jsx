import { Link } from "react-router-dom";
import "./ListaDejuegos.css";

export default function ListaDeJuegos({ juegos }) {
  return (
    <div className="grid-juegos">
      {juegos.map((j) => (
        <Link to={`/juegos/${j._id}`}
          key={j._id}
          className="juego-card"
        >
          <img src={j.imagen} alt={j.titulo} />
          <h3>{j.titulo}</h3>
        </Link>
      ))}
    </div>
  );
}
