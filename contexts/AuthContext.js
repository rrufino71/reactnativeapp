// AuthContext.js
import React, { createContext, useEffect, useState } from "react";

// Crear el contexto
export const AuthContext = createContext();

// Crear el proveedor de contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [tipoMensaje, setTipoMensaje] = useState(null);
  const [usuarioNombre, setUsuarioNombre] = useState(null);
  const [usuario, setUsuario] = useState({});

  // Función para iniciar sesión (puedes modificarla según tus necesidades)
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  useEffect(() => {
    //console.log(mensaje);
    if (mensaje != null) {
      // Declarar el temporizador
      const timer = setTimeout(() => {
        setMensaje(null);
      }, 2000); // 2 segundos
      // Limpiar el temporizador cuando el componente se desmonte
      return () => clearTimeout(timer);
    }
  }, [mensaje]); // Se ejecuta solo una vez cuando el componente se monta

  // useEffect(() => {
  //   console.log("isAuthenticated:", isAuthenticated);
  //   console.log("usuarioNombre:", usuarioNombre);
  // }, [usuarioNombre, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        mensaje,
        setMensaje,
        usuarioNombre,
        setUsuarioNombre,
        setIsAuthenticated,
        tipoMensaje,
        setTipoMensaje,
        usuario,
        setUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
