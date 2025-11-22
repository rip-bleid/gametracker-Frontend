import { useEffect, useState } from "react";
import api from "../api";

export default function Reseñas() {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    try {
      const res = await api.get("/juegos");
      setJuegos(res.data);
    } catch (e) {
      console.error("Error cargando reseñas", e);
    }
  };

  return (
    <div style={{ color: "white" }}>
      <h2>Reseñas de Juegos 📝</h2>

      {juegos.length === 0 && <p>No hay reseñas todavía.</p>}

      {juegos
        .filter((j) => j.resena && j.resena.trim() !== "")
        .map((j) => (
          <div
            key={j._id}
            style={{
              borderBottom: "1px solid #66fcf1",
              padding: "1rem 0",
              marginBottom: "15px",
            }}
          >
            <h3>{j.titulo}</h3>

            <p>{j.resena}</p>

            <p>
              ⭐ <b>{j.rating}</b> / 5
            </p>

            <p>
              👤 Añadido por:{" "}
              <b>{j.creadoPorNombre ? j.creadoPorNombre : "Usuario desconocido"}</b> 
              <br />
            </p>
          </div>
        ))}
    </div>
  );
}
