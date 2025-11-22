// src/pages/Perfil.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../context/Authcontext";
import api from "../api.js";

const BACKEND_BASE = "https://gametracker-backend-three.vercel.app/api/"; // cambia si tu backend está en otra URL
const PLACEHOLDER = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function Perfil() {
  const { usuario, login } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // convierte ruta relativa a URL completa si es necesario
  const getFotoUrl = (foto) => {
    if (!foto) return PLACEHOLDER;
    if (foto.startsWith("http")) return foto;
    return `${BACKEND_BASE}${foto}`;
  };

  // preview local al seleccionar archivo
  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setFile(f || null);
    if (f) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const subirFoto = async () => {
    if (!file) return alert("Selecciona una imagen");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("foto", file);
      formData.append("id", usuario.id);

      const res = await api.post("/auth/subir-foto", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // backend devuelve ruta relativa (/uploads/xxx)
      const nuevaRutaRel = res.data.fotoPerfil;
      const nuevaFoto = getFotoUrl(nuevaRutaRel);

      const nuevoUsuario = { ...usuario, fotoPerfil: nuevaFoto };
      login(nuevoUsuario, localStorage.getItem("token"));

      // limpiar preview/archivo
      setFile(null);
      setPreview(null);
      alert("Foto actualizada correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al subir la foto");
    } finally {
      setLoading(false);
    }
  };

  // si usuario aún no cargó en contexto
  if (!usuario) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: 60 }}>
        <p>No estás logueado. Por favor inicia sesión.</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "40px", color: "white" }}>
      <h2>Editar foto de perfil</h2>

      <img
        src={preview || getFotoUrl(usuario.fotoPerfil)}
        alt="Foto de perfil"
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          border: "3px solid #66fcf1",
          objectFit: "cover",
        }}
      />

      <br />
      <br />

      <input type="file" accept="image/*" onChange={handleFileChange} />

      <div style={{ marginTop: 12 }}>
        <button
          onClick={subirFoto}
          disabled={loading}
          style={{
            marginTop: "10px",
            padding: "10px 15px",
            borderRadius: "8px",
            background: "#00bcd4",
            border: "none",
            color: "black",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {loading ? "Subiendo..." : "Actualizar foto"}
        </button>
      </div>
    </div>
  );
}
