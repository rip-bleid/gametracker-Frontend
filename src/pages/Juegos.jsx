import { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../api.js";

// ---------- ESTILOS ----------
const Form = styled.form`
  background: #1f2833;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 0 20px #45a29e;
  text-align: center;
`;

const Input = styled.input`
  margin: 5px;
  padding: 10px;
  border-radius: 8px;
  border: none;
  width: 250px;
`;

const Select = styled.select`
  margin: 5px;
  padding: 10px;
  border-radius: 8px;
  border: none;
  width: 250px;
`;

const Card = styled.div`
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background-color: rgba(31, 40, 51, 0.55);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  padding: 15px;
  margin: 10px;
  box-shadow: 0 0 20px rgba(102, 252, 241, 0.3);
  text-align: center;
  color: white;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(102, 252, 241, 0.6);
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 10px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

// ---------- COMPONENTE PRINCIPAL ----------
export default function Juegos() {
  const [juegos, setJuegos] = useState([]);

  const [nuevoJuego, setNuevoJuego] = useState({
    titulo: "",
    imagen: "",
    horasJugadas: 0,
    completado: false,
    genero: "",
    resena: ""
  });

  useEffect(() => {
    cargarJuegos();
  }, []);

  const cargarJuegos = async () => {
    const res = await api.get("/juegos");
    setJuegos(res.data);
  };

  const agregarJuego = async (e) => {
    e.preventDefault();
    await api.post("/juegos", nuevoJuego);

    setNuevoJuego({
      titulo: "",
      imagen: "",
      horasJugadas: 0,
      completado: false,
      genero: "",
      resena: ""
    });

    cargarJuegos();
  };

  const eliminarJuego = async (id) => {
    try {
      await api.delete(`/juegos/${id}`);
      cargarJuegos();
    } catch (err) {
      alert("No se pudo eliminar el juego");
    }
  };

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h2>🎮 Administrar Juegos</h2>

      <Form onSubmit={agregarJuego}>
        <Input
          placeholder="Título del juego"
          value={nuevoJuego.titulo}
          onChange={(e) => setNuevoJuego({ ...nuevoJuego, titulo: e.target.value })}
        />

        <Input
          placeholder="URL de imagen"
          value={nuevoJuego.imagen}
          onChange={(e) => setNuevoJuego({ ...nuevoJuego, imagen: e.target.value })}
        />

        <Input
          placeholder="Género del juego"
          value={nuevoJuego.genero}
          onChange={(e) => setNuevoJuego({ ...nuevoJuego, genero: e.target.value })}
        />

        <Input
          placeholder="Breve reseña"
          value={nuevoJuego.resena}
          onChange={(e) => setNuevoJuego({ ...nuevoJuego, resena: e.target.value })}
        />

        <Input
          type="number"
          placeholder="Horas jugadas"
          value={nuevoJuego.horasJugadas}
          onChange={(e) => setNuevoJuego({ ...nuevoJuego, horasJugadas: Number(e.target.value) })}
        />

        <Select
          value={nuevoJuego.completado}
          onChange={(e) =>
            setNuevoJuego({ ...nuevoJuego, completado: e.target.value === "true" })
          }
        >
          <option value={false}>❌ No completado</option>
          <option value={true}>✔️ Completado</option>
        </Select>

        <button type="submit">Agregar</button>
      </Form>

      <Grid>
        {juegos.map((j) => (
          <Card key={j._id}>
            <h3>{j.titulo}</h3>

            {j.imagen && <img src={j.imagen} alt={j.titulo} />}

            <p>🎭 Género: {j.genero}</p>
            <p>📝 Reseña: {j.resena}</p>
            <p>⏱ Horas jugadas: {j.horasJugadas}</p>
            <p>🎯 Completado: {j.completado ? "✔️ Sí" : "❌ No"}</p>

            <button
              onClick={() => eliminarJuego(j._id)}
              style={{
                marginTop: "10px",
                padding: "8px 15px",
                background: "#ff4444",
                border: "none",
                borderRadius: "8px",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              🗑 Eliminar
            </button>
          </Card>
        ))}
      </Grid>
    </div>
  );
}
