import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import api from "../api.js";
import { AuthContext } from "../context/Authcontext";

// ⭐ Componente de estrellas
const StarRating = ({ rating, setRating }) => {
  return (
    <div style={{ margin: "10px 0", textAlign: "center", gridColumn: "1 / 3" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          style={{
            cursor: "pointer",
            fontSize: "28px",
            color: star <= rating ? "#f1c40f" : "#777",
            marginRight: "8px",
            transition: "0.2s"
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

// ---------- ESTILOS ----------
const Form = styled.form`
  background: rgba(31, 40, 51, 0.6);
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 0 25px rgba(102, 252, 241, 0.3);
  backdrop-filter: blur(12px);
  max-width: 700px;
  margin: 20px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid rgba(102, 252, 241, 0.4);
  background: rgba(0,0,0,0.3);
  color: white;
  width: 100%;
`;

const Select = styled.select`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid rgba(102, 252, 241, 0.4);
  background: rgba(0,0,0,0.3);
  color: white;
  width: 100%;
`;

const Card = styled.div`
  backdrop-filter: blur(12px) saturate(180%);
  background-color: rgba(31, 40, 51, 0.55);
  border-radius: 15px;
  padding: 15px;
  margin: 10px;
  text-align: center;
  color: white;
  transition: transform 0.2s;
  box-shadow: 0 0 20px rgba(102, 252, 241, 0.3);

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

// ---------- COMPONENTE PRINCIPAL ----------
export default function Juegos() {
  const { usuario } = useContext(AuthContext);

  const [juegos, setJuegos] = useState([]);

  const [nuevoJuego, setNuevoJuego] = useState({
    titulo: "",
    imagen: "",
    horasJugadas: 0,
    completado: false,
    genero: "",
    resena: "",
    rating: 0,
    creadoPor: usuario?.nombre || "Anon"
  });

  useEffect(() => {
    cargarJuegos();
  }, []);

  const cargarJuegos = async () => {
    const res = await api.get("/juegos");
    console.log(res.data);
    setJuegos(res.data);
  };

  const agregarJuego = async (e) => {
  e.preventDefault();

  try {
    await api.post("/juegos", {
      ...nuevoJuego,
      creadoPor: usuario.id,
      creadoPorNombre: usuario.nombre
    });

    setNuevoJuego({
      titulo: "",
      imagen: "",
      horasJugadas: 0,
      completado: false,
      genero: "",
      resena: "",
      rating: 0,
    });

    cargarJuegos();
  } catch (err) {
    console.log("ERROR AL AGREGAR JUEGO:", err);
  }
};


  const eliminarJuego = async (id) => {
    await api.delete(`/juegos/${id}`);
    cargarJuegos();
  };

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        🎮 Administrar Juegos
      </h2>

      <Form onSubmit={agregarJuego}>
        <Input
          placeholder="Título del juego"
          value={nuevoJuego.titulo}
          onChange={(e) =>
            setNuevoJuego({ ...nuevoJuego, titulo: e.target.value })
          }
        />

        <Input
          placeholder="URL de la imagen"
          value={nuevoJuego.imagen}
          onChange={(e) =>
            setNuevoJuego({ ...nuevoJuego, imagen: e.target.value })
          }
        />

        <Input
          placeholder="Género"
          value={nuevoJuego.genero}
          onChange={(e) =>
            setNuevoJuego({ ...nuevoJuego, genero: e.target.value })
          }
        />

        <Input
          placeholder="Breve reseña"
          value={nuevoJuego.resena}
          onChange={(e) =>
            setNuevoJuego({ ...nuevoJuego, resena: e.target.value })
          }
        />

        <Input
          type="number"
          placeholder="Horas jugadas"
          value={nuevoJuego.horasJugadas}
          onChange={(e) =>
            setNuevoJuego({
              ...nuevoJuego,
              horasJugadas: Number(e.target.value),
            })
          }
        />

        <Select
          value={nuevoJuego.completado}
          onChange={(e) =>
            setNuevoJuego({
              ...nuevoJuego,
              completado: e.target.value === "true",
            })
          }
        >
          <option value={false}>❌ No completado</option>
          <option value={true}>✔️ Completado</option>
        </Select>

        <StarRating
          rating={nuevoJuego.rating}
          setRating={(value) =>
            setNuevoJuego({ ...nuevoJuego, rating: value })
          }
        />

        <button
          type="submit"
          style={{
            gridColumn: "1 / 3",
            padding: "12px",
            background: "#66fcf1",
            color: "#0b0c10",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          ➕ Agregar Juego
        </button>
      </Form>

      <Grid>
        {juegos.map((j) => (
          <Card key={j._id}>
            <h3>{j.titulo}</h3>

            {j.imagen && <img src={j.imagen} alt={j.titulo} />}

            {/* Mostrar estrellas */}
            <div style={{ margin: "8px 0" }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  style={{
                    color: s <= j.rating ? "#f1c40f" : "#555",
                    fontSize: "20px",
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            <p>🎭 Género: {j.genero}</p>
            <p>📝 Reseña: {j.resena}</p>
            <p>⏱ Horas jugadas: {j.horasJugadas}</p>
            <p>🎯 Completado: {j.completado ? "✔ Sí" : "❌ No"}</p>
            <p>👤 Añadido por: {j.creadoPor}</p>

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
                fontWeight: "bold",
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
