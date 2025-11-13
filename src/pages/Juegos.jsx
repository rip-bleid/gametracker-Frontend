import { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../api.js";

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
`;

const Card = styled.div`
  background: #1f2833;
  border-radius: 10px;
  padding: 15px;
  margin: 10px;
  box-shadow: 0 0 15px #45a29e;
  text-align: center;
`;

export default function Juegos() {
  const [juegos, setJuegos] = useState([]);
  const [nuevoJuego, setNuevoJuego] = useState({ nombre: "", genero: "", plataforma: "", año: "" });

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
    setNuevoJuego({ nombre: "", genero: "", plataforma: "", año: "" });
    cargarJuegos();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>🎮 Administrar Juegos</h2>

      <Form onSubmit={agregarJuego}>
        <Input placeholder="Nombre" value={nuevoJuego.nombre} onChange={(e) => setNuevoJuego({ ...nuevoJuego, nombre: e.target.value })} />
        <Input placeholder="Género" value={nuevoJuego.genero} onChange={(e) => setNuevoJuego({ ...nuevoJuego, genero: e.target.value })} />
        <Input placeholder="Plataforma" value={nuevoJuego.plataforma} onChange={(e) => setNuevoJuego({ ...nuevoJuego, plataforma: e.target.value })} />
        <Input type="number" placeholder="Año" value={nuevoJuego.año} onChange={(e) => setNuevoJuego({ ...nuevoJuego, año: e.target.value })} />
        <button type="submit">Agregar</button>
      </Form>

      <div>
        {juegos.map((juego) => (
          <Card key={juego._id}>
            <h3>{juego.nombre}</h3>
            <p>{juego.genero}</p>
            <p>{juego.plataforma} - {juego.año}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
