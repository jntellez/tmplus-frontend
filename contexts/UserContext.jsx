import React, { createContext, useState, useContext } from "react";

// Crear el contexto
const UserContext = createContext();

// Componente que provee el contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para acceder al contexto
export const useUser = () => {
  return useContext(UserContext);
};
