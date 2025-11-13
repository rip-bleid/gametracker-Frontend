import { useState } from "react";

export default function Reseñas() {
  const [reseñas, setReseñas] = useState([
    { id: 1, juego: "Minecraft", comentario: "Muy creativo y adictivo." },
    { id: 2, juego: "GTA V", comentario: "Excelente historia y mundo abierto." },
  ]);

  return (
    <div>
      <h2>Reseñas de Juegos 📝</h2>
      {reseñas.map((r) => (
        <div key={r.id} style={{ borderBottom: "1px solid #ccc", padding: "1rem 0" }}>
          <h3>{r.juego}</h3>
          <p>{r.comentario}</p>
        </div>
      ))}
    </div>
  );
}
