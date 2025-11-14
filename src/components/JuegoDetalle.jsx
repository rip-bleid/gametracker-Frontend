import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api.js";

export default function JuegoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [juego, setJuego] = useState(null);
  const [editando, setEditando] = useState(false); // 🔥 activar modo edición
  const [formData, setFormData] = useState({}); // 🔥 datos editables

  // Cargar juego
  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get(`/juegos/${id}`);
        setJuego(res.data);
        setFormData(res.data); // prellenar formulario
      } catch (error) {
        console.error(error);
      }
    };
    cargar();
  }, [id]);

  if (!juego) return <h2 style={{ color: "white" }}>Cargando...</h2>;

  // 🔥 Guardar cambios
  const guardarCambios = async () => {
    try {
      const res = await api.put(`/juegos/${id}`, formData);
      setJuego(res.data);
      setEditando(false);
      alert("Cambios guardados correctamente");
    } catch (e) {
      console.error(e);
      alert("Error al guardar");
    }
  };

  return (
    <div style={{ padding: "30px", color: "white" }}>
      {/* Volver atrás */}
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "10px 20px",
          background: "#66fcf1",
          color: "#0b0c10",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
          fontWeight: "bold"
        }}
      >
        ⬅ Volver
      </button>

      <h1>{juego.titulo}</h1>

      <img
        src={juego.imagen}
        alt={juego.titulo}
        style={{
          width: "80%",
          maxWidth: "500px",
          borderRadius: "15px",
          marginBottom: "20px",
          boxShadow: "0 0 20px rgba(102,252,241,0.4)"
        }}
      />

      {/* Información básica */}
      <p>⭐ Rating: {juego.rating}</p>
      <p>🎭 Género: {juego.genero}</p>
      <p>📝 Reseña: {juego.resena}</p>
      <p>⏱ Horas jugadas: {juego.horasJugadas}</p>
      <p>🎯 Completado: {juego.completado ? "✔ Sí" : "❌ No"}</p>

      {/* BOTÓN EDITAR */}
      {!editando ? (
        <button
          onClick={() => setEditando(true)}
          style={{
            padding: "10px 20px",
            background: "#45a29e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "20px"
          }}
        >
          ✏ Editar Información
        </button>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {/* FORMULARIO DE EDICIÓN */}
          <h3>Editar Juego</h3>

          <input
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            placeholder="Título"
            style={{ display: "block", margin: "5px", padding: "10px", width: "100%" }}
          />

          <input
            value={formData.imagen}
            onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
            placeholder="Imagen URL"
            style={{ display: "block", margin: "5px", padding: "10px", width: "100%" }}
          />

          <input
            value={formData.genero}
            onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
            placeholder="Género"
            style={{ display: "block", margin: "5px", padding: "10px", width: "100%" }}
          />

          <textarea
            value={formData.resena}
            onChange={(e) => setFormData({ ...formData, resena: e.target.value })}
            placeholder="Reseña"
            style={{ display: "block", margin: "5px", padding: "10px", width: "100%" }}
          />

          <input
            type="number"
            value={formData.horasJugadas}
            onChange={(e) =>
              setFormData({ ...formData, horasJugadas: Number(e.target.value) })
            }
            placeholder="Horas jugadas"
            style={{ display: "block", margin: "5px", padding: "10px", width: "100%" }}
          />

          <select
            value={formData.completado}
            onChange={(e) =>
              setFormData({ ...formData, completado: e.target.value === "true" })
            }
            style={{ display: "block", margin: "5px", padding: "10px", width: "100%" }}
          >
            <option value={false}>❌ No completado</option>
            <option value={true}>✔ Completado</option>
          </select>

          {/* Guardar */}
          <button
            onClick={guardarCambios}
            style={{
              padding: "10px 20px",
              background: "#66fcf1",
              color: "#0b0c10",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "10px"
            }}
          >
            💾 Guardar
          </button>

          {/* Cancelar */}
          <button
            onClick={() => setEditando(false)}
            style={{
              padding: "10px 20px",
              background: "#ff4444",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "10px",
              marginLeft: "10px"
            }}
          >
            ✖ Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
