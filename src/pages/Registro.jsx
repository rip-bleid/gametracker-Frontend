import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const enviar = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", { nombre, email, password });
    navigate("/login");
    
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "none",
      }}
    >
      <form
        onSubmit={enviar}
        style={{
          width: "350px",
          padding: "30px",
          borderRadius: "15px",
          background: "#0b0c10",
          boxShadow: "0 0 25px #45a29e",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#66fcf1",
            textShadow: "0 0 10px #66fcf1",
            marginBottom: "25px",
          }}
        >
          Registro de Usuario
        </h2>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={estilosInput}
        />

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={estilosInput}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={estilosInput}
        />

        <button type="submit" style={estilosBoton}>
          Registrarse
        </button>
      </form>
    </div>
  );
}

const estilosInput = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "2px solid #45a29e",
  background: "#1f2833",
  color: "white",
  outline: "none",
  boxShadow: "0 0 10px #45a29e",
};

const estilosBoton = {
  width: "100%",
  padding: "10px",
  borderRadius: "10px",
  background: "#66fcf1",
  color: "black",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
};
