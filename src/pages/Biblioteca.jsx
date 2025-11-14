import { useEffect, useState } from "react";
import api from "../api";
import ListaDeJuegos from "../components/ListaDeJuegos";

export default function Biblioteca() {
  const [juegos, setJuegos] = useState([]);

  const cargar = async () => {
    const res = await api.get("/juegos");
    setJuegos(res.data);
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div style={{ color: "white", padding: "30px", textAlign: "center" }}>
      <h2>📚 Mi Biblioteca</h2>
      <ListaDeJuegos juegos={juegos} />
    </div>
  );
}
