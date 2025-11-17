import { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/Authcontext";

export default function Reseñas() {
  const { usuario } = useContext(AuthContext);
  const [resenas, setResenas] = useState([]);

  console.log(usuario); 
  
  useEffect(() => {
    cargarResenas();
  }, []);

  const cargarResenas = async () => {
    try {
      const res = await api.get("/resenas");
      setResenas(res.data);
    } catch (error) {
      console.log("Error cargando reseñas", error);
    }
  };

  return (
    <div>
      <h2>Reseñas de Juegos 📝</h2>

      {resenas.length === 0 && <p>No hay reseñas todavía.</p>}

      {resenas.map((r) => (
        <div key={r._id} style={{ borderBottom: "1px solid #ccc", padding: "1rem 0" }}>
          <h3>Juego: {r.juegoId}</h3>
          <p>{r.texto}</p>
          <strong>Por: {r.autor}</strong>
          <br />
          ⭐ {r.puntuacion} / 5
        </div>
      ))}
    </div>
  );
}
