import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("usuario");

    if (token && user) {
      setIsLogged(true);
      setUsuario(JSON.parse(user));
    }
  }, []);

  const login = (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(user));
    setUsuario(user);
    setIsLogged(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={{ isLogged, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
