import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
  });

  const navigate = useNavigate();

  // 👉 actualiza el formulario al escribir
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 👉 envía los datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Usuario registrado correctamente");
        navigate("/login");
      } else {
        alert(data.mensaje || "❌ Error al registrar usuario");
      }
    } catch (error) {
      alert("⚠️ Error de conexión con el servidor");
      console.error(error);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "80px",
      }}
    >
      <h2>Registro de usuario</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "inline-block",
          textAlign: "left",
          background: "#1b2845",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 15px rgba(0,188,212,0.4)",
          color: "#fff",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label>Nombre:</label>
          <br />
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Correo:</label>
          <br />
          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Contraseña:</label>
          <br />
          <input
            type="password"
            name="contraseña"
            value={form.contraseña}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#00bcd4",
            border: "none",
            color: "#fff",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
