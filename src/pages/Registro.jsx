import { useState } from "react";
import styled, { keyframes } from "styled-components";
import api from "../api.js";

const pulse = keyframes`
  0% { box-shadow: 0 0 10px #45a29e, 0 0 20px #66fcf1; }
  100% { box-shadow: 0 0 25px #45a29e, 0 0 50px #66fcf1; }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: radial-gradient(circle at bottom, #0b0c10, #1f2833);
`;

const Card = styled.div`
  background: rgba(31, 40, 51, 0.9);
  padding: 40px;
  border-radius: 15px;
  text-align: center;
  animation: ${pulse} 2s ease-in-out infinite alternate;
  width: 400px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  margin: 12px 0;
  padding: 10px;
  border: none;
  border-radius: 10px;
  text-align: center;
  background: #0b0c10;
  color: #66fcf1;
  box-shadow: 0 0 10px #45a29e inset;
  font-family: 'Orbitron', sans-serif;
`;

const Message = styled.div`
  margin-top: 15px;
  color: ${({ error }) => (error ? "#ff5c5c" : "#45a29e")};
`;

export default function Registro() {
  const [form, setForm] = useState({ nombre: "", email: "", contraseña: "" });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);
      setMensaje(`✅ ${res.data.mensaje}`);
    } catch (err) {
      setMensaje("❌ Error al registrar usuario");
    }
  };

  return (
    <Container>
      <Card>
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <Input name="nombre" placeholder="Nombre" onChange={handleChange} />
          <Input type="email" name="email" placeholder="Correo" onChange={handleChange} />
          <Input type="password" name="contraseña" placeholder="Contraseña" onChange={handleChange} />
          <button type="submit">Registrar</button>
        </form>
        {mensaje && <Message error={mensaje.includes("❌")}>{mensaje}</Message>}
      </Card>
    </Container>
  );
}
