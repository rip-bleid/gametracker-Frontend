import { useContext, useState } from "react";
import { AuthContext } from "../context/Authcontext";
import api from "../api.js";

export default function Perfil() {
  const { usuario, login } = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const subirFoto = async () => {
    if (!file) return alert("Selecciona una imagen");

    const formData = new FormData();
    formData.append("foto", file);
    formData.append("id", usuario.id);

    const res = await api.post("/auth/subir-foto", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Actualizar usuario en contexto
    const nuevoUsuario = { ...usuario, fotoPerfil: res.data.fotoPerfil };
    login(nuevoUsuario, localStorage.getItem("token"));

    alert("Foto actualizada");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Editar foto de perfil</h2>

      <img
        src={`http://localhost:5000${usuario.fotoPerfil || "/uploads/default.png"}`}
        alt="Foto de perfil"
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          border: "3px solid #66fcf1",
        }}
      />

      <br /><br />

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button
        onClick={subirFoto}
        style={{
          marginTop: "15px",
          padding: "10px 15px",
          borderRadius: "8px",
          background: "#00bcd4",
          border: "none",
          color: "black",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Actualizar foto
      </button>
    </div>
  );
}
