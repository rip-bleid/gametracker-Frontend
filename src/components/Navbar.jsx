import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useContext, useState } from "react";
import { AuthContext } from "../context/Authcontext";

const glow = keyframes`
  0% { text-shadow: 0 0 3px #66fcf1, 0 0 6px #45a29e; }
  100% { text-shadow: 0 0 8px #66fcf1, 0 0 15px #45a29e; }
`;

/* CONTENEDOR */
const Nav = styled.nav`
  background: #0b0c10;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between; /* 💥 enlaces izquierda, perfil derecha */
  align-items: center;
  box-shadow: 0 0 20px #45a29e;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  position: relative;
`;

/* BOTÓN HAMBURGUESA */
const Hamburguesa = styled.div`
  font-size: 28px;
  color: #66fcf1;
  cursor: pointer;
  display: none;
  animation: ${glow} 2s infinite alternate;

  @media (max-width: 850px) {
    display: block;
  }
`;

/* CONTENEDOR DEL MENU */
const Menu = styled.div`
  display: flex;
  gap: 25px;

  @media (max-width: 850px) {
    position: absolute;
    top: 80px;
    left: 0;
    width: 250px;  /* ancho tipo sidebar */
    background: rgba(11, 12, 16, 0.95);
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;   /* 🔥 PEGA LAS LETRAS A LA IZQUIERDA */
    box-shadow: 3px 0 20px #45a29e;
    border-bottom-right-radius: 30px;
    border-top-right-radius: 30px;
    transform: translateX(${({ abierto }) => (abierto ? "0" : "-100%")});
    transition: 0.3s ease-in-out;
  }
`;




const NavLink = styled(Link)`
  color: #66fcf1;
  font-weight: bold;
  font-size: 1.1rem;
  text-decoration: none;
  animation: ${glow} 2s ease-in-out infinite alternate;

  &:hover {
    color: white;
    transform: scale(1.1);
    text-shadow: 0 0 12px #66fcf1;
  }
`;

/* PERFIL */
const PerfilRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const PerfilMiniatura = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #66fcf1;
  box-shadow: 0 0 10px #45a29e;
  cursor: pointer;

  &:hover {
    transform: scale(1.15);
    box-shadow: 0 0 18px #66fcf1;
  }
`;

/* BOTÓN CERRAR SESION */
const BotonLogout = styled.button`
  padding: 8px 15px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 0 10px #ff4444;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 18px #ff4444;
  }
`;

export default function Navbar() {
  const { isLogged, usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [abierto, setAbierto] = useState(false);

  const cerrarSesion = () => {
    logout();
    navigate("/");
  };

  return (
    <Nav>
      {/* HAMBURGUESA */}
      <Hamburguesa onClick={() => setAbierto(!abierto)}>
        ☰
      </Hamburguesa>

      {/* MENU IZQUIERDO */}
      <Menu abierto={abierto}>
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
          </>
        )}
      </Menu>

      {/* DERECHA: PERFIL + LOGOUT */}
      {isLogged && (
        <PerfilRight>
          <PerfilMiniatura
            src={usuario.fotoPerfil}
            onClick={() => navigate("/perfil")}
          />

          <BotonLogout onClick={cerrarSesion}>
            Cerrar sesión
          </BotonLogout>
        </PerfilRight>
      )}
    </Nav>
  );
}
