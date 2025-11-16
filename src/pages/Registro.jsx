// src/pages/Registro.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

export default function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "", // debe llamarse 'password' para coincidir con backend
  });

  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Llamada al backend para registrar
      const res = await api.post("/auth/register", form);

      // Si el backend devuelve token o usuario, no hace falta guardarlo aquí.
      // Redirigimos al login para que el usuario ingrese sus credenciales.
      alert("Usuario registrado correctamente. Ahora inicia sesión.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.mensaje || "Error al registrar usuario");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>Registro de usuario</h2>

      <form onSubmit={handleSubmit} style={{
          display: "inline-block", textAlign: "left",
          background: "#1b2845", padding: "30px", borderRadius: "10px",
          boxShadow: "0 0 15px rgba(0,188,212,0.4)", color: "#fff"
        }}>
        <label>Nombre</label><br />
        <input name="nombre" value={form.nombre} onChange={handleChange} required /><br />

        <label>Correo</label><br />
        <input type="email" name="email" value={form.email} onChange={handleChange} required /><br />

        <label>Contraseña</label><br />
        <input type="password" name="password" value={form.password} onChange={handleChange} required autoComplete="new-password" /><br />

        <button type="submit" style={{ marginTop: 10, padding: 10, width: "100%", background: "#00bcd4", border: "none", color: "#000", fontWeight: "bold", borderRadius: 6 }}>
          Registrarse
        </button>
      </form>
    </div>
  );
}
