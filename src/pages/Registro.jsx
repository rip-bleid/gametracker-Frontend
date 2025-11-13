import { useState } from "react";
import API from "../api.js";

export default function Registro() {
  const [form, setForm] = useState({ nombre: "", email: "", contraseña: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Usuario registrado correctamente 🎉");
    }catch (err) {
      console.error("Error completo:", err);
      alert("Error: " + (err.response?.data?.error || "No se pudo registrar el usuario"));
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="contraseña"
          name="contraseña"
          placeholder="Contraseña"
          value={form.contraseña}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}
