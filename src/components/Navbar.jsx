import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";

const Nav = styled.nav`
  background: #0b0c10;
  padding: 15px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 20px #45a29e;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
`;

const NavLink = styled(Link)`
  margin: 0 20px;
  color: #66fcf1;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1.1rem;
  transition: 0.3s;
  text-decoration: none;

  &:hover {
    color: white;
    text-shadow: 0 0 10px #66fcf1;
  }
`;

export default function Navbar() {
  const { isLogged, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate("/");
  };

  return (
    <Nav>
      {!isLogged ? (
        <>
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/registro">Registro</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/juegos">Juegos</NavLink>
          <NavLink to="/biblioteca">Biblioteca</NavLink>
          <NavLink to="/reseñas">Reseñas</NavLink>

          <button
            onClick={cerrarSesion}
            style={{
              marginLeft: "20px",
              padding: "8px 15px",
              background: "#ff4444",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Cerrar sesión
          </button>
        </>
      )}
    </Nav>
  );
}
