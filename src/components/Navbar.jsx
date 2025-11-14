import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background: #0b0c10;
  padding: 15px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 20px #45a29e;
`;

const NavLink = styled(Link)`
  margin: 0 20px;
  color: #66fcf1;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1.1rem;
  transition: 0.3s;

  &:hover {
    color: white;
    text-shadow: 0 0 10px #66fcf1;
  }
`;

export default function Navbar() {
  return (
    <Nav>
      <NavLink to="/">Inicio</NavLink>
      <NavLink to="/juegos">Juegos</NavLink>
      <NavLink to="/reseñas">Reseñas</NavLink>
      <NavLink to="/biblioteca">Biblioteca</NavLink>
    </Nav>
  );
}
