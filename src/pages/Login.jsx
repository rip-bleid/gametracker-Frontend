import { useState, useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const enviar = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.usuario, res.data.token);
      navigate("/juegos");
    } catch (err) {
      alert("Credenciales incorrectas");
    }
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
          Inicio de Sesión
        </h2>

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
          Entrar
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
