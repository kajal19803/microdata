import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    const storedRole = localStorage.getItem("role");
    if (storedUser) {
      setUser(storedUser);
      setRole(storedRole);
    }
  }, []);

  const login = (name, role) => {
    setUser(name);
    setRole(role);
    localStorage.setItem("userName", name);
    localStorage.setItem("role", role);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


