import { useState } from "react";
import styled, { keyframes } from "styled-components";
import api from "../api.js";

const glow = keyframes`
  0% { box-shadow: 0 0 5px #45a29e, 0 0 20px #66fcf1; }
  100% { box-shadow: 0 0 20px #45a29e, 0 0 40px #66fcf1; }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: radial-gradient(circle at top, #0b0c10, #1f2833);
`;

const Card = styled.div`
  background: rgba(31, 40, 51, 0.9);
  padding: 40px;
  border-radius: 15px;
  text-align: center;
  animation: ${glow} 2s ease-in-out infinite alternate;
  width: 350px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  margin: 15px 0;
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

export default function Login() {
  const [form, setForm] = useState({ email: "", contraseña: "" });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      setMensaje(`✅ ${res.data.mensaje}`);
    } catch (err) {
      setMensaje("❌ Credenciales incorrectas o servidor no responde");
    }
  };

  return (
    <Container>
      <Card>
        <h2>Inicio de Sesión</h2>
        <form onSubmit={handleSubmit}>
          <Input type="email" name="email" placeholder="Correo" onChange={handleChange} />
          <Input type="password" name="contraseña" placeholder="Contraseña" onChange={handleChange} />
          <button type="submit">Entrar</button>
        </form>
        {mensaje && <Message error={mensaje.includes("❌")}>{mensaje}</Message>}
      </Card>
    </Container>
  );
}
